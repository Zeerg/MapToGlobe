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
        this.rings = new Rings(this.instance.pivotObject); // Rings should rotate independently like moons

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

        // Validate transform controls object before rendering
        if (this.instance.controls.object && !this.isObjectInScene(this.instance.controls.object)) {
            // Detach controls if the object is no longer in the scene
            this.instance.controls.detach();
        }

        // SCIENCE FEATURE: Update planetary rotation
        this.planet.UpdateRotation();
        
        // Update legacy moon rotation
        this.moon.UpdateRotation();
        
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

    /**
     * LEGACY MOON ROTATION METHODS
     */
    SetMoonRotationSpeed(speed: number) {
        this.moon.SetRotationSpeed(speed);
    }

    GetMoonRotationSpeed(): number {
        return this.moon.GetRotationSpeed();
    }

    SetLegacyMoonColor(color: number) {
        const material = this.moon.moon.material as THREE.MeshPhongMaterial;
        material.color.setHex(color);
        material.needsUpdate = true;
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

    SetBGColor(hexColor: string) {
        this.instance.SetBGColor(hexColor);
    }

    SetBGStarfield() {
        this.instance.SetBGStarfield();
    }

    ToggleControls(object: THREE.Mesh) {
        // Validate that the object exists
        if (!object) {
            // If object is invalid, just detach any existing controls
            if (this.instance.controls.object) {
                this.instance.controls.detach();
            }
            return;
        }

        // Additional validation for scene graph membership (with debug logging)
        const isInScene = this.isObjectInScene(object);
        if (!isInScene) {
            // eslint-disable-next-line no-console
            console.warn('Object not in scene graph, attempting to attach anyway:', object.name || 'unnamed');
        }

        if (object === this.instance.controls.object) {
            this.instance.controls.detach();
            // eslint-disable-next-line no-console
            console.log('Detached transform controls from:', object.name || 'unnamed');
        } else if (object !== this.instance.controls.object && this.instance.controls.visible) {
            this.instance.controls.detach();
            this.instance.controls.attach(object);
            // eslint-disable-next-line no-console
            console.log('Switched transform controls to:', object.name || 'unnamed');
        } else {
            this.instance.controls.attach(object);
            // eslint-disable-next-line no-console
            console.log('Attached transform controls to:', object.name || 'unnamed');
        }
    }

    // Helper method to check if an object is part of the scene graph
    private isObjectInScene(object: THREE.Object3D): boolean {
        let current = object;
        while (current.parent) {
            if (current.parent === this.instance.scene) {
                return true;
            }
            current = current.parent;
        }
        
        // Also check if the object can be found by traversing from the scene
        let found = false;
        this.instance.scene.traverse((child) => {
            if (child === object) {
                found = true;
            }
        });
        
        return found;
    }

    // Set up event listener for ring transform changes
    SetRingTransformListener(callback: () => void) {
        // Remove any existing listeners first
        if (this.ringTransformCallback) {
            this.instance.controls.removeEventListener('objectChange', this.ringTransformCallback);
        }
        
        // Create the event handler that we can reference for removal
        const eventHandler = (event: any) => {
            // Only trigger callback if the ring object is being controlled
            if (this.instance.controls.object === this.rings.object) {
                callback();
            }
        };
        
        // Store the callback for removal later
        this.ringTransformCallback = eventHandler;
        
        // Add new listener
        this.instance.controls.addEventListener('objectChange', eventHandler);
    }

    private ringTransformCallback: ((event: any) => void) | null = null;

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
     * PLANET ROTATION CONTROL
     */

    SetPlanetRotationSpeed(speed: number) {
        this.planet.SetRotationSpeed(speed);
    }

    GetPlanetRotationSpeed(): number {
        return this.planet.GetRotationSpeed();
    }

    /**
     * PLANET SHAPE CONTROL
     */

    SetPlanetShape(scaleX: number, scaleY: number, scaleZ: number) {
        this.planet.SetShape(scaleX, scaleY, scaleZ);
    }

    GetPlanetShape(): { x: number; y: number; z: number } {
        return this.planet.GetShape();
    }

    /**
     * CLOUD CONTROL
     */
    SetCloudOpacity(opacity: number) {
        if (this.planet.cloudObject) {
            const material = this.planet.cloudObject.material as THREE.MeshPhongMaterial;
            material.opacity = Math.max(0, Math.min(1, opacity));
            material.needsUpdate = true;
        }
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

    UpdateMoonColor(moonId: string, color: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setColor(color);
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

    // Moon 3D Transform methods
    UpdateMoonPosition(moonId: string, x: number, y: number, z: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setPosition(x, y, z);
        }
    }

    UpdateMoonRotation(moonId: string, x: number, y: number, z: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setMeshRotation(x, y, z);
        }
    }

    UpdateMoonScale(moonId: string, x: number, y: number, z: number): void {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            moon.setMeshScale(x, y, z);
        }
    }

    GetMoonTransform(moonId: string): { position: { x: number; y: number; z: number }; rotation: { x: number; y: number; z: number }; scale: { x: number; y: number; z: number } } | null {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon) {
            return moon.getTransform();
        }
        return null;
    }

    // Get moon object by ID for visual transform controls
    GetMoonById(moonId: string): { object: THREE.Mesh } | null {
        const moon = this.moonSystem.getMoon(moonId);
        if (moon && moon.mesh) {
            return { object: moon.mesh };
        }
        return null;
    }

    // Set transform control mode
    SetTransformMode(mode: 'position' | 'rotation' | 'scale'): void {
        switch (mode) {
            case 'position':
                this.instance.controls.setMode('translate');
                break;
            case 'rotation':
                this.instance.controls.setMode('rotate');
                break;
            case 'scale':
                this.instance.controls.setMode('scale');
                break;
        }
    }

    // Set up event listener for moon transform changes  
    SetMoonTransformListener(callback: () => void) {
        // Remove any existing listeners first
        if (this.moonTransformCallback) {
            this.instance.controls.removeEventListener('objectChange', this.moonTransformCallback);
        }
        
        // Create the event handler that we can reference for removal
        const eventHandler = (event: any) => {
            // Only trigger callback if a moon object is being controlled
            const allMoons = this.moonSystem.getAllMoons();
            const isControllingMoon = allMoons.some(moon => 
                moon.config.visible && this.instance.controls.object === moon.mesh
            );
            
            if (isControllingMoon) {
                callback();
            }
        };
        
        // Store the callback for removal later
        this.moonTransformCallback = eventHandler;
        
        // Add new listener
        this.instance.controls.addEventListener('objectChange', eventHandler);
    }

    private moonTransformCallback: ((event: any) => void) | null = null;

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
                retrograde: moon.config.retrograde,
                color: moon.config.color ? '#' + moon.config.color.toString(16).padStart(6, '0') : '#cccccc'
            }))
        };
    }

    // Clear all moons
    ClearMoonSystem(): void {
        this.moonSystem.clearAllMoons();
    }
}