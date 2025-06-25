import * as THREE from 'three';
import { AstronomyCalculator } from './Astronomy';

export default class Planet {
    object: THREE.Mesh;
    cloudObject: THREE.Mesh;
    currentPlanetType = 'earth';
    rotationSpeed = 0;
    cloudRotationSpeed = 0;
    realTimeRotation = false;
    timeScale = 1;

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
        // Clouds - separate mesh to allow for independent rotation
        const cloudsGeometry = new THREE.SphereBufferGeometry(2.02, 100, 100);
        const cloudMaterial = new THREE.MeshPhongMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.8 // This needs to match the light intensity value in the scene
        });

        const mesh = new THREE.Mesh(cloudsGeometry, cloudMaterial);
        mesh.name = "clouds";

        mesh.customDepthMaterial = new THREE.MeshDepthMaterial({
            depthPacking: THREE.RGBADepthPacking,
            alphaTest: 0.4
        });

        mesh.castShadow = true;

        return mesh;
    }

    SetCloudsImage(file: File) {
        const image = new THREE.TextureLoader().load(URL.createObjectURL(file));

        if (this.cloudObject === undefined)
            this.cloudObject = this.CreateNewCloudMesh();

        const material = (this.cloudObject.material as THREE.MeshPhongMaterial);
        material.map = image;
        material.alphaMap = image;
        material.needsUpdate = true;
        
        const depthMaterial = (this.cloudObject.customDepthMaterial as THREE.MeshDepthMaterial);
        depthMaterial.map = image;
        depthMaterial.alphaMap = image;
        depthMaterial.needsUpdate = true;

        this.object.add(this.cloudObject);
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
        
        // Update cloud rotation independently (clouds typically move faster)
        if (this.realTimeRotation && this.cloudObject && this.cloudRotationSpeed > 0) {
            this.cloudObject.rotation.y += this.cloudRotationSpeed * this.timeScale;
        }
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
        
        // Cloud rotation speeds (typically 1.2-2x faster than surface)
        const cloudSpeeds = {
            earth: 0.0012,     // Earth's clouds move slightly faster
            mars: 0.0015,      // Mars has fast-moving dust storms
            jupiter: 0.0055,   // Jupiter's bands move at different speeds
            venus: -0.000008,  // Venus retrograde, clouds much faster
            mercury: 0.000025, // Mercury has very thin atmosphere
            saturn: 0.0050     // Saturn's atmospheric bands
        };
        
        this.rotationSpeed = planetSpeeds[this.currentPlanetType as keyof typeof planetSpeeds] || planetSpeeds.earth;
        this.cloudRotationSpeed = cloudSpeeds[this.currentPlanetType as keyof typeof cloudSpeeds] || cloudSpeeds.earth;
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