import * as THREE from 'three';
import { AstronomyCalculator } from './Astronomy';
import { AdvancedCloudMaterial } from './CloudShader';

export interface CloudLayer {
    mesh: THREE.Mesh;
    material: AdvancedCloudMaterial;
    altitude: number;
    name: string;
    rotationSpeed: number;
}

export default class Planet {
    object: THREE.Mesh;
    cloudObject: THREE.Mesh; // Legacy single cloud for backward compatibility
    cloudLayers: CloudLayer[] = []; // New multi-layer cloud system
    currentPlanetType = 'earth';
    rotationSpeed = 0;
    realTimeRotation = false;
    timeScale = 1;
    private cloudTime = 0;

    constructor(json?: THREE.Mesh) {
        if (json) {
            this.object = json;
            this.cloudObject = json.children[0] as THREE.Mesh;
            return;
        }
        
        // Use simple MeshPhongMaterial instead of day/night shader
        const surfaceMaterial = new THREE.MeshPhongMaterial({
            shininess: 60
        });
        
        const materialArray = [
            surfaceMaterial,
            new THREE.ShaderMaterial({ visible: false }) // material for atmosphere
        ];

        const sphereGeometry = new THREE.SphereBufferGeometry(2, 100, 100);

        // See https://stackoverflow.com/a/56674615/1078475 as to why this second geometry is needed
        const geometry = new THREE.BufferGeometry();
        geometry.attributes = sphereGeometry.attributes;
        geometry.index = sphereGeometry.index as THREE.BufferAttribute;
        geometry.addGroup(0, geometry.index.count, 0);
        geometry.addGroup(0, geometry.index.count, 1);

        const object = new THREE.Mesh(geometry, materialArray);
        object.name = "planet";
        object.castShadow = true;
        object.receiveShadow = true;

        this.object = object;

        this.cloudObject = this.CreateNewCloudMesh();
        
        // Initialize rotation speed
        this.updateRotationSpeed();
    }

    SetSurfaceImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (res) => {
            const material = (this.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial;
            material.map = res;
            material.needsUpdate = true;
        });
    }

    SetHeightmapImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (res) => {
            const material = (this.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial;
            material.bumpMap = res;
            material.bumpScale = 0.05;
            material.needsUpdate = true;
        });
    }

    SetSpecularImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (res) => {
            const material = (this.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial;
            material.specularMap = res;
            material.needsUpdate = true;
        });
    }

    ToggleAxis() {
        if (!this.object.getObjectByName("lineAxis")) {
            const LineAxisMaterial = new THREE.LineBasicMaterial({ color: 0xFFEA00 });
            const LineAxisGeometry = new THREE.BufferGeometry();
            LineAxisGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 0, 0, -3, 0, 0, 3, 0]), 3));
            const LineAxis = new THREE.Line(LineAxisGeometry, LineAxisMaterial);
            LineAxis.name = "lineAxis";
            this.object.add(LineAxis);
        } else {
            const axis = this.object.getObjectByName("lineAxis") as THREE.Object3D;
            this.object.remove(axis);
        }
    }

    CreateNewCloudMesh() {
        // Legacy method - creates a simple cloud mesh for backward compatibility
        const cloudsGeometry = new THREE.SphereBufferGeometry(2.02, 100, 100);
        const cloudMaterial = new AdvancedCloudMaterial();

        const mesh = new THREE.Mesh(cloudsGeometry, cloudMaterial);
        mesh.name = "clouds";

        mesh.customDepthMaterial = new THREE.MeshDepthMaterial({
            depthPacking: THREE.RGBADepthPacking,
            alphaTest: 0.4
        });

        mesh.castShadow = true;

        return mesh;
    }

    /**
     * ADVANCED CLOUD SYSTEM
     */

    CreateAdvancedCloudLayer(name: string, altitude: number, rotationSpeed: number = 0.001): CloudLayer {
        const radius = 2.0 + altitude; // Planet base radius is 2.0
        const geometry = new THREE.SphereBufferGeometry(radius, 100, 100);
        const material = new AdvancedCloudMaterial();
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = `cloud-layer-${name}`;
        mesh.castShadow = true;

        const layer: CloudLayer = {
            mesh,
            material,
            altitude,
            name,
            rotationSpeed
        };

        return layer;
    }

    AddCloudLayer(name: string, altitude: number = 0.02, rotationSpeed: number = 0.001): CloudLayer {
        const layer = this.CreateAdvancedCloudLayer(name, altitude, rotationSpeed);
        this.cloudLayers.push(layer);
        this.object.add(layer.mesh);
        return layer;
    }

    RemoveCloudLayer(name: string): boolean {
        const index = this.cloudLayers.findIndex(layer => layer.name === name);
        if (index === -1) return false;

        const layer = this.cloudLayers[index];
        this.object.remove(layer.mesh);
        layer.material.dispose();
        layer.mesh.geometry.dispose();
        
        this.cloudLayers.splice(index, 1);
        return true;
    }

    GetCloudLayer(name: string): CloudLayer | undefined {
        return this.cloudLayers.find(layer => layer.name === name);
    }

    ClearAllCloudLayers(): void {
        this.cloudLayers.forEach(layer => {
            this.object.remove(layer.mesh);
            layer.material.dispose();
            layer.mesh.geometry.dispose();
        });
        this.cloudLayers = [];
    }

    SetCloudLayerTexture(layerName: string, file: File, densityMap?: File): void {
        const layer = this.GetCloudLayer(layerName);
        if (!layer) return;

        const loader = new THREE.TextureLoader();
        const textureURL = URL.createObjectURL(file);
        
        loader.load(textureURL, (texture) => {
            layer.material.setCloudTexture(texture);
            
            if (densityMap) {
                const densityURL = URL.createObjectURL(densityMap);
                loader.load(densityURL, (densityTexture) => {
                    layer.material.setCloudDensityMap(densityTexture);
                });
            }
        });
    }

    SetCloudLayerOpacity(layerName: string, opacity: number): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.setCloudOpacity(opacity);
        }
    }

    SetCloudLayerDensity(layerName: string, density: number): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.setCloudDensity(density);
        }
    }

    SetCloudLayerAtmosphericScattering(layerName: string, intensity: number): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.setAtmosphericScattering(intensity);
        }
    }

    SetCloudLayerRimLighting(layerName: string, intensity: number, color?: THREE.Vector3): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.setRimLighting(intensity, color);
        }
    }

    SetCloudLayerSpeed(layerName: string, speed: number): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.setCloudSpeed(speed);
            layer.rotationSpeed = speed * 0.001; // Convert to rotation speed
        }
    }

    EnableCloudLayerAtmosphericScattering(layerName: string, enable: boolean): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.enableAtmosphericScattering(enable);
        }
    }

    EnableCloudLayerRimLighting(layerName: string, enable: boolean): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.enableRimLighting(enable);
        }
    }

    EnableCloudLayerAltitudeFading(layerName: string, enable: boolean): void {
        const layer = this.GetCloudLayer(layerName);
        if (layer) {
            layer.material.enableAltitudeFading(enable);
        }
    }

    // Preset cloud configurations
    SetupEarthCloudLayers(): void {
        this.ClearAllCloudLayers();
        
        // Low altitude dense clouds
        const lowClouds = this.AddCloudLayer('low', 0.015, 0.0008);
        lowClouds.material.setCloudOpacity(0.9);
        lowClouds.material.setCloudDensity(1.2);
        lowClouds.material.setAtmosphericScattering(0.4);
        
        // High altitude wispy clouds
        const highClouds = this.AddCloudLayer('high', 0.025, 0.0012);
        highClouds.material.setCloudOpacity(0.6);
        highClouds.material.setCloudDensity(0.8);
        highClouds.material.setAtmosphericScattering(0.6);
        highClouds.material.setRimLighting(0.8, new THREE.Vector3(0.3, 0.6, 1.0));
    }

    SetupVenusCloudLayers(): void {
        this.ClearAllCloudLayers();
        
        // Dense sulfuric acid clouds
        const venusCloud = this.AddCloudLayer('venus-atmosphere', 0.03, 0.002);
        venusCloud.material.setCloudOpacity(0.95);
        venusCloud.material.setCloudDensity(1.5);
        venusCloud.material.setAtmosphericScattering(0.8);
        venusCloud.material.setRimLighting(1.2, new THREE.Vector3(1.0, 0.8, 0.4));
    }

    SetupJupiterCloudLayers(): void {
        this.ClearAllCloudLayers();
        
        // Multiple atmospheric bands
        const band1 = this.AddCloudLayer('band-1', 0.01, 0.003);
        band1.material.setCloudOpacity(0.8);
        band1.material.setCloudDensity(1.0);
        
        const band2 = this.AddCloudLayer('band-2', 0.02, 0.002);
        band2.material.setCloudOpacity(0.7);
        band2.material.setCloudDensity(0.9);
        
        const band3 = this.AddCloudLayer('band-3', 0.03, 0.0015);
        band3.material.setCloudOpacity(0.6);
        band3.material.setCloudDensity(0.8);
        
        // All layers have strong atmospheric scattering
        [band1, band2, band3].forEach(layer => {
            layer.material.setAtmosphericScattering(0.7);
            layer.material.setRimLighting(0.9, new THREE.Vector3(0.8, 0.6, 0.4));
        });
    }

    SetCloudsImage(file: File) {
        const image = new THREE.TextureLoader().load(URL.createObjectURL(file));

        if (this.cloudObject === undefined)
            this.cloudObject = this.CreateNewCloudMesh();

        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setCloudTexture(image);
        
        const depthMaterial = (this.cloudObject.customDepthMaterial as THREE.MeshDepthMaterial);
        depthMaterial.map = image;
        depthMaterial.alphaMap = image;
        depthMaterial.needsUpdate = true;

        this.object.add(this.cloudObject);
    }

    SetCloudDensityMap(file: File) {
        if (this.cloudObject === undefined) return;
        
        const image = new THREE.TextureLoader().load(URL.createObjectURL(file));
        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setCloudDensityMap(image);
    }

    SetCloudOpacity(opacity: number) {
        if (this.cloudObject === undefined) return;
        
        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setCloudOpacity(opacity);
    }

    SetCloudDensity(density: number) {
        if (this.cloudObject === undefined) return;
        
        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setCloudDensity(density);
    }

    SetCloudAtmosphericScattering(intensity: number) {
        if (this.cloudObject === undefined) return;
        
        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setAtmosphericScattering(intensity);
    }

    SetCloudRimLighting(intensity: number, color?: THREE.Vector3) {
        if (this.cloudObject === undefined) return;
        
        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setRimLighting(intensity, color);
    }

    SetCloudSpeed(speed: number) {
        if (this.cloudObject === undefined) return;
        
        const material = (this.cloudObject.material as AdvancedCloudMaterial);
        material.setCloudSpeed(speed);
    }

    /* Three.js currently does not save/load the customDepthMaterial property, so it has to be done manually */
    CloudLoader(data: any) {
        const material = data.materials.find((x: THREE.Material) => x.type === "MeshDepthMaterial");
        
        if (material === undefined)
            return;

        const texture = data.textures.find((x: THREE.Texture) => x.uuid === material.map);
        const image = data.images.find((x: any) => x.uuid === texture.image);
        const object = data.object.children.find((x: any) => (x.children !== undefined) && x.children.find((y: any) => y.name === "planet")).children[0].children[0];
        const matrix = object.matrix;

        if (matrix)
            this.cloudObject.applyMatrix4(new THREE.Matrix4().fromArray(matrix));
        
        if (image.url.length > 0) {
            new THREE.TextureLoader().load(image.url, (texture) => {
                const material = (this.cloudObject.material as THREE.MeshPhongMaterial);
                material.map = texture;
                material.alphaMap = texture;
                material.needsUpdate = true;

                this.cloudObject.customDepthMaterial = new THREE.MeshDepthMaterial({
                    depthPacking: THREE.RGBADepthPacking,
                    alphaTest: 0.4,
                    map: texture,
                    alphaMap: texture
                });
            });
        }
    }

    /**
     * SCIENCE FEATURE: Planetary Rotation
     */
    
    SetPlanetType(planetType: string) {
        this.currentPlanetType = planetType;
        this.updateRotationSpeed();
    }

    EnableRealTimeRotation(enable: boolean) {
        this.realTimeRotation = enable;
    }

    SetTimeScale(scale: number) {
        this.timeScale = scale;
    }

    UpdateRotation() {
        if (this.realTimeRotation && this.rotationSpeed > 0) {
            this.object.rotation.y += this.rotationSpeed * this.timeScale;
        }
        
        // Update cloud animations
        this.UpdateCloudAnimations();
    }

    UpdateCloudAnimations() {
        this.cloudTime += 0.016; // Approximately 60fps

        // Update legacy cloud object
        if (this.cloudObject && this.cloudObject.material instanceof AdvancedCloudMaterial) {
            this.cloudObject.material.updateTime(this.cloudTime);
            this.cloudObject.rotation.y += 0.0005; // Slow cloud rotation
        }

        // Update advanced cloud layers
        this.cloudLayers.forEach(layer => {
            layer.material.updateTime(this.cloudTime);
            layer.mesh.rotation.y += layer.rotationSpeed * this.timeScale;
        });
    }

    UpdateSunDirection(sunDirection: THREE.Vector3) {
        // Update legacy cloud object
        if (this.cloudObject && this.cloudObject.material instanceof AdvancedCloudMaterial) {
            this.cloudObject.material.setSunDirection(sunDirection);
        }

        // Update advanced cloud layers
        this.cloudLayers.forEach(layer => {
            layer.material.setSunDirection(sunDirection);
        });
    }

    private updateRotationSpeed() {
        // Rotation speeds for different planets (radians per frame at 60fps)
        const planetSpeeds = {
            earth: 0.001,
            mars: 0.00097,
            jupiter: 0.0041,
            venus: -0.000004, // Retrograde
            mercury: 0.000017,
            saturn: 0.0038
        };
        
        this.rotationSpeed = planetSpeeds[this.currentPlanetType as keyof typeof planetSpeeds] || planetSpeeds.earth;
    }

    GetPlanetInfo() {
        return {
            type: this.currentPlanetType,
            rotationSpeed: this.rotationSpeed,
            realTimeRotation: this.realTimeRotation,
            timeScale: this.timeScale
        };
    }
}