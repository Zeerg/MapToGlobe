import * as THREE from 'three';
import { Tween, update } from '@tweenjs/tween.js';
import CanvasVideo from './CanvasVideo';

import Scene from './Scene';
import Planet from './Planet';
import Moon from './Moon';
import MoonSystem, { MoonConfig } from './MoonSystem';
import Rings, { RingSystemType } from './Rings';

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

        this.moon = new Moon(this.instance.pivotObject); // Keep for backward compatibility - attach to pivot, not planet
        this.moonSystem = new MoonSystem(this.instance.pivotObject, this.planet.object); // New multi-moon system - attach to pivot, not planet
        this.rings = new Rings(this.planet.object); // Rings should rotate with planet

        let oldDistance = this.instance.camera.getWorldPosition(new THREE.Vector3(0,0,0)).distanceTo(this.planet.object.getWorldPosition(new THREE.Vector3(0,0,0)));

        this.instance.orbitControls.addEventListener("change", () => {
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

        // Update ring system rotation
        this.rings.Update();

        this.instance.renderer.render(this.instance.scene, this.instance.camera);
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

    /**
     * RING SYSTEM METHODS
     */

    // Set ring inner radius
    SetRingInnerRadius(radius: number) {
        this.rings.SetInnerRadius(radius);
    }

    // Set ring outer radius
    SetRingOuterRadius(radius: number) {
        this.rings.SetOuterRadius(radius);
    }

    // Set ring thickness
    SetRingThickness(thickness: number) {
        this.rings.SetThickness(thickness);
    }

    // Set ring opacity
    SetRingOpacity(opacity: number) {
        this.rings.SetOpacity(opacity);
    }

    // Set ring color
    SetRingColor(color: number) {
        this.rings.SetColor(color);
    }

    // Set ring rotation speed
    SetRingRotationSpeed(speed: number) {
        this.rings.SetRotationSpeed(speed);
    }

    // Load predefined ring system
    LoadRingSystemType(type: RingSystemType) {
        this.rings.LoadRingSystemType(type);
    }

    // Get current ring configuration
    GetRingConfig() {
        return this.rings.GetConfig();
    }

    // Get available ring types
    GetAvailableRingTypes() {
        return Rings.GetAvailableRingTypes();
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

    UpdateMoonRetrograde(moonId: string, retrograde: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setRetrograde(retrograde);
        }
    }

    /**
     * Rename a moon in the system
     */
    RenameMoon(moonId: string, newName: string): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.config.name = newName;
            moon.mesh.name = newName;
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
                rotationSpeed: moon.config.rotationSpeed,
                retrograde: moon.config.retrograde
            }))
        };
    }

    // Clear all moons
    ClearMoonSystem(): void {
        this.moonSystem.clearAllMoons();
    }
}