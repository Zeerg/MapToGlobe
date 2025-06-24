import * as THREE from 'three';
import { Tween, update } from '@tweenjs/tween.js';
import CanvasVideo from './CanvasVideo';

import Scene from './Scene';
import Planet from './Planet';
import Moon from './Moon';
import MoonSystem, { MoonConfig } from './MoonSystem';
import Rings from './Rings';

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}



export default class MapToGlobe {
    private animationId: number;
    instance: Scene;
    planet: Planet;
    moon: Moon; // Legacy single moon for backward compatibility
    moonSystem: MoonSystem; // New multi-moon system
    rings: Rings;
    sunFar = false;
    private lastSunUpdate = 0;

    constructor(element: HTMLCanvasElement) {
        this.instance = new Scene(element);
        this.planet = new Planet();
        this.instance.pivotObject.add(this.planet.object);

        this.moon = new Moon(this.planet.object); // Keep for backward compatibility
        this.moonSystem = new MoonSystem(this.planet.object); // New multi-moon system
        this.rings = new Rings(this.planet.object);

        let oldDistance = this.instance.camera.getWorldPosition(new THREE.Vector3(0,0,0)).distanceTo(this.planet.object.getWorldPosition(new THREE.Vector3(0,0,0)));

        this.instance.orbitControls.addEventListener("change", (event: THREE.Event) => {
            const newDistance = this.instance.camera.getWorldPosition(new THREE.Vector3(0,0,0)).distanceTo(this.planet.object.getWorldPosition(new THREE.Vector3(0,0,0)));
            
            if (oldDistance < 15 && newDistance > 15) {
                this.instance.SetSunFar();
                this.sunFar = true;
            }
            else if (oldDistance > 15 && newDistance < 15) {
                this.instance.SetSunClose();
                this.sunFar = false;
            }

            oldDistance = newDistance;
        });

        this.animationId = 0;

        this.Animate();
    }

    Animate() {
        this.animationId = requestAnimationFrame(this.Animate.bind(this));

        this.instance.orbitControls.update();

        update(); // Update tween

        // SCIENCE FEATURE: Update planetary rotation
        this.planet.UpdateRotation();
        
        // Update multi-moon system
        this.moonSystem.update();

        // Update cloud lighting based on sun position
        this.updateCloudLighting();

        this.instance.renderer.render(this.instance.scene, this.instance.camera);
    }

    private updateCloudLighting() {
        // Get sun direction from the directional light
        const sunLight = this.instance.light.children[0] as THREE.DirectionalLight;
        if (sunLight) {
            const sunDirection = sunLight.position.clone().normalize();
            this.planet.UpdateSunDirection(sunDirection);
        }
    }

    StopAnimation() {
        cancelAnimationFrame(this.animationId);
    }

    AddMoon() {
        this.moon.Show();
    }

    RemoveMoon() {
        this.moon.Remove();
    }

    ToggleRings() {
        this.rings.Toggle();
    }

    SetBGBlack() {
        this.instance.SetBGBlack();
    }

    SetBGImage(file: File) {
        this.instance.SetBGImage(file);
    }

    SetBGTransparent() {
        this.instance.SetBGTransparent();
    }

    ToggleControls(object: THREE.Mesh) {
        if (object === this.instance.controls.object) {
            this.instance.controls.detach();
        } else if (object !== this.instance.controls.object && this.instance.controls.visible) {
            this.instance.controls.detach();
            this.instance.controls.attach(object);
        } else {
            this.instance.controls.attach(object);
        }
    }

    Gif(canvas: CanvasElement) {
        const video = new CanvasVideo(canvas, 4000000);

        const object = this.sunFar ? this.instance.pivotObject.rotation : this.planet.object.rotation;
        const tween = new Tween(object).to({ y: `+${(360 * (Math.PI / 180))}` }, 5000);

        video.Start();
        tween.onComplete(() => {
            video.Stop();
        }).start();
    }
    
    Screenshot(canvas: CanvasElement) {
        const canvasData = canvas.toDataURL();

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.id = "tempScreenshotElement";
        a.style.display = "none";
        a.href = canvasData;
        a.download = "maptoglobe.jpg";
        a.click();
        setTimeout(() => {
            (document.getElementById("tempScreenshotElement") as HTMLLinkElement).remove();
        }, 100);
    }





    /**
     * SCIENCE FEATURES: Planetary Rotation Controls
     */

    SetPlanetType(planetType: string) {
        this.planet.SetPlanetType(planetType);
    }

    EnableRealTimeRotation(enable: boolean) {
        this.planet.EnableRealTimeRotation(enable);
    }

    SetTimeScale(scale: number) {
        this.planet.SetTimeScale(scale);
    }

    GetPlanetInfo() {
        return this.planet.GetPlanetInfo();
    }

    GetAvailablePlanets() {
        return [
            { name: 'Earth', key: 'earth' },
            { name: 'Mars', key: 'mars' },
            { name: 'Jupiter', key: 'jupiter' },
            { name: 'Venus', key: 'venus' },
            { name: 'Mercury', key: 'mercury' },
            { name: 'Saturn', key: 'saturn' }
        ];
    }

    /**
     * MULTI-MOON SYSTEM METHODS
     */

    // Add a single moon with custom configuration
    AddMoonToSystem(config: MoonConfig): void {
        this.moonSystem.addMoon(config);
    }

    // Remove a specific moon by ID
    RemoveMoonFromSystem(moonId: string): boolean {
        return this.moonSystem.removeMoon(moonId);
    }

    // Load a preset moon system
    LoadMoonPreset(presetName: 'earth' | 'jupiter' | 'saturn' | 'custom'): void {
        this.moonSystem.clearAllMoons();
        
        let preset: MoonConfig[] = [];
        switch (presetName) {
            case 'earth':
                preset = MoonSystem.getEarthMoonPreset();
                break;
            case 'jupiter':
                preset = MoonSystem.getJupiterMoonPreset();
                break;
            case 'saturn':
                preset = MoonSystem.getSaturnMoonPreset();
                break;
            case 'custom':
                preset = MoonSystem.getCustomMoonPreset();
                break;
        }
        
        preset.forEach(config => this.moonSystem.addMoon(config));
    }

    // Get all moons in the system
    GetAllMoons() {
        return this.moonSystem.getAllMoons();
    }

    // Show/hide specific moon
    ShowMoon(moonId: string): void {
        this.moonSystem.showMoon(moonId);
    }

    HideMoon(moonId: string): void {
        this.moonSystem.hideMoon(moonId);
    }

    // Show/hide all moons
    ShowAllMoons(): void {
        this.moonSystem.showAllMoons();
    }

    HideAllMoons(): void {
        this.moonSystem.hideAllMoons();
    }

    // Update moon properties
    UpdateMoonSize(moonId: string, size: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setSize(size);
        }
    }

    UpdateMoonDistance(moonId: string, distance: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setDistance(distance);
        }
    }

    UpdateMoonOrbitSpeed(moonId: string, speed: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setOrbitSpeed(speed);
        }
    }

    UpdateMoonRotationSpeed(moonId: string, speed: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setRotationSpeed(speed);
        }
    }

    // Set moon texture
    SetMoonTexture(moonId: string, file: File): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setTexture(file);
        }
    }

    // Get moon system statistics
    GetMoonSystemInfo() {
        return {
            totalMoons: this.moonSystem.getAllMoons().length,
            visibleMoons: this.moonSystem.getVisibleMoonCount(),
            moons: this.moonSystem.getAllMoons().map(moon => ({
                id: moon.config.id,
                name: moon.config.name,
                visible: moon.config.visible,
                size: moon.config.size,
                distance: moon.config.distance,
                orbitSpeed: moon.config.orbitSpeed,
                rotationSpeed: moon.config.rotationSpeed
            }))
        };
    }

    // Clear all moons
    ClearMoonSystem(): void {
        this.moonSystem.clearAllMoons();
    }

    /**
     * ADVANCED CLOUD SYSTEM METHODS
     */

    // Add a new cloud layer
    AddCloudLayer(name: string, altitude: number = 0.02, rotationSpeed: number = 0.001) {
        return this.planet.AddCloudLayer(name, altitude, rotationSpeed);
    }

    // Remove a cloud layer
    RemoveCloudLayer(name: string): boolean {
        return this.planet.RemoveCloudLayer(name);
    }

    // Get a specific cloud layer
    GetCloudLayer(name: string) {
        return this.planet.GetCloudLayer(name);
    }

    // Clear all cloud layers
    ClearAllCloudLayers(): void {
        this.planet.ClearAllCloudLayers();
    }

    // Set cloud layer texture
    SetCloudLayerTexture(layerName: string, file: File, densityMap?: File): void {
        this.planet.SetCloudLayerTexture(layerName, file, densityMap);
    }

    // Cloud layer property setters
    SetCloudLayerOpacity(layerName: string, opacity: number): void {
        this.planet.SetCloudLayerOpacity(layerName, opacity);
    }

    SetCloudLayerDensity(layerName: string, density: number): void {
        this.planet.SetCloudLayerDensity(layerName, density);
    }

    SetCloudLayerAtmosphericScattering(layerName: string, intensity: number): void {
        this.planet.SetCloudLayerAtmosphericScattering(layerName, intensity);
    }

    SetCloudLayerRimLighting(layerName: string, intensity: number, color?: THREE.Vector3): void {
        this.planet.SetCloudLayerRimLighting(layerName, intensity, color);
    }

    SetCloudLayerSpeed(layerName: string, speed: number): void {
        this.planet.SetCloudLayerSpeed(layerName, speed);
    }

    // Cloud layer feature toggles
    EnableCloudLayerAtmosphericScattering(layerName: string, enable: boolean): void {
        this.planet.EnableCloudLayerAtmosphericScattering(layerName, enable);
    }

    EnableCloudLayerRimLighting(layerName: string, enable: boolean): void {
        this.planet.EnableCloudLayerRimLighting(layerName, enable);
    }

    EnableCloudLayerAltitudeFading(layerName: string, enable: boolean): void {
        this.planet.EnableCloudLayerAltitudeFading(layerName, enable);
    }

    // Preset cloud configurations
    SetupEarthCloudLayers(): void {
        this.planet.SetupEarthCloudLayers();
    }

    SetupVenusCloudLayers(): void {
        this.planet.SetupVenusCloudLayers();
    }

    SetupJupiterCloudLayers(): void {
        this.planet.SetupJupiterCloudLayers();
    }

    // Legacy cloud system methods (enhanced)
    SetCloudOpacity(opacity: number): void {
        this.planet.SetCloudOpacity(opacity);
    }

    SetCloudDensity(density: number): void {
        this.planet.SetCloudDensity(density);
    }

    SetCloudAtmosphericScattering(intensity: number): void {
        this.planet.SetCloudAtmosphericScattering(intensity);
    }

    SetCloudRimLighting(intensity: number, color?: THREE.Vector3): void {
        this.planet.SetCloudRimLighting(intensity, color);
    }

    SetCloudSpeed(speed: number): void {
        this.planet.SetCloudSpeed(speed);
    }

    SetCloudDensityMap(file: File): void {
        this.planet.SetCloudDensityMap(file);
    }

    // Get cloud system information
    GetCloudSystemInfo() {
        return {
            hasLegacyCloud: !!this.planet.cloudObject,
            cloudLayers: this.planet.cloudLayers.map(layer => ({
                name: layer.name,
                altitude: layer.altitude,
                rotationSpeed: layer.rotationSpeed,
                opacity: layer.material.uniforms.cloudOpacity.value,
                density: layer.material.uniforms.cloudDensity.value,
                atmosphericScattering: layer.material.uniforms.atmosphericScattering.value,
                rimLightIntensity: layer.material.uniforms.rimLightIntensity.value
            }))
        };
    }
}