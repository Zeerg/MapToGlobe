import * as THREE from 'three';
import { Tween, update } from '@tweenjs/tween.js';
import CanvasVideo from './CanvasVideo';

import Scene from './Scene';
import Planet from './Planet';
import Moon from './Moon';
import Rings from './Rings';
import SolarSystem, { PlanetConfig, SolarSystemPlanet } from './SolarSystem';

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

export default class MapToGlobe {
    private animationId: number;
    instance: Scene;
    planet: Planet;
    moon: Moon;
    rings: Rings;
    solarSystem: SolarSystem;
    sunFar = false;
    private lastSunUpdate = 0;
    mode: 'single' | 'solar-system' = 'single';

    constructor(element: HTMLCanvasElement) {
        this.instance = new Scene(element);
        this.planet = new Planet();
        this.instance.pivotObject.add(this.planet.object);

        this.moon = new Moon(this.planet.object);
        this.rings = new Rings(this.planet.object);

        // Initialize Solar System
        this.solarSystem = new SolarSystem(this.instance.scene);

        let oldDistance = this.instance.camera.getWorldPosition(new THREE.Vector3(0,0,0)).distanceTo(this.planet.object.getWorldPosition(new THREE.Vector3(0,0,0)));

        this.instance.orbitControls.addEventListener("change", (event: THREE.Event) => {
            const targetObject = this.mode === 'single' ? this.planet.object : this.solarSystem.sun;
            const newDistance = this.instance.camera.getWorldPosition(new THREE.Vector3(0,0,0)).distanceTo(targetObject.getWorldPosition(new THREE.Vector3(0,0,0)));
            
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

        if (this.mode === 'single') {
            // SCIENCE FEATURE: Update planetary rotation for single planet mode
            this.planet.UpdateRotation();
        } else {
            // Update solar system
            this.solarSystem.update();
        }

        this.instance.renderer.render(this.instance.scene, this.instance.camera);
    }

    StopAnimation() {
        cancelAnimationFrame(this.animationId);
    }

    // === SINGLE PLANET MODE METHODS ===
    
    AddMoon() {
        if (this.mode === 'single') {
            this.moon.Show();
        }
    }

    RemoveMoon() {
        if (this.mode === 'single') {
            this.moon.Remove();
        }
    }

    ToggleRings() {
        if (this.mode === 'single') {
            this.rings.Toggle();
        }
    }

    // === SOLAR SYSTEM MODE METHODS ===

    EnableSolarSystemMode() {
        this.mode = 'solar-system';
        // Hide single planet
        this.instance.pivotObject.remove(this.planet.object);
        
        // Adjust camera for solar system view
        this.instance.camera.position.set(0, 20, 50);
        this.instance.orbitControls.target.set(0, 0, 0);
        this.instance.orbitControls.update();
    }

    EnableSinglePlanetMode() {
        this.mode = 'single';
        // Clear solar system
        this.solarSystem.clear();
        
        // Show single planet
        this.instance.pivotObject.add(this.planet.object);
        
        // Reset camera
        this.instance.camera.position.set(0, 0, 12);
        this.instance.orbitControls.target.set(0, 0, 0);
        this.instance.orbitControls.update();
    }

    CreateSolarSystem(type: 'mini' | 'earth-moon' | 'jupiter' | 'saturn' | 'custom' = 'mini') {
        this.EnableSolarSystemMode();
        
        switch (type) {
            case 'mini':
                this.solarSystem.createMiniSolarSystem();
                break;
            case 'earth-moon':
                this.solarSystem.createEarthMoonSystem();
                break;
            case 'jupiter':
                this.solarSystem.createJupiterSystem();
                break;
            case 'saturn':
                this.solarSystem.createSaturnSystem();
                break;
        }
    }

    AddPlanetToSolarSystem(config: PlanetConfig): SolarSystemPlanet {
        if (this.mode !== 'solar-system') {
            this.EnableSolarSystemMode();
        }
        return this.solarSystem.addPlanet(config);
    }

    RemovePlanetFromSolarSystem(planet: SolarSystemPlanet) {
        this.solarSystem.removePlanet(planet);
    }

    GetSolarSystemPlanets(): SolarSystemPlanet[] {
        return this.solarSystem.planets;
    }

    GetPlanetByName(name: string): SolarSystemPlanet | undefined {
        return this.solarSystem.getPlanetByName(name);
    }

    ClearSolarSystem() {
        this.solarSystem.clear();
    }

    // === SHARED METHODS ===

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

        let object;
        if (this.mode === 'single') {
            object = this.sunFar ? this.instance.pivotObject.rotation : this.planet.object.rotation;
        } else {
            object = this.instance.pivotObject.rotation;
        }

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
     * SCIENCE FEATURES: Planetary Rotation Controls (Single Planet Mode)
     */

    SetPlanetType(planetType: string) {
        if (this.mode === 'single') {
            this.planet.SetPlanetType(planetType);
        }
    }

    EnableRealTimeRotation(enable: boolean) {
        if (this.mode === 'single') {
            this.planet.EnableRealTimeRotation(enable);
        } else {
            // Enable real-time rotation for all planets in solar system
            this.solarSystem.planets.forEach(planet => {
                planet.planet.EnableRealTimeRotation(enable);
            });
        }
    }

    SetTimeScale(scale: number) {
        if (this.mode === 'single') {
            this.planet.SetTimeScale(scale);
        } else {
            // Set time scale for all planets in solar system
            this.solarSystem.planets.forEach(planet => {
                planet.planet.SetTimeScale(scale);
            });
        }
    }

    GetPlanetInfo() {
        if (this.mode === 'single') {
            return this.planet.GetPlanetInfo();
        } else {
            return {
                mode: 'solar-system',
                planetCount: this.solarSystem.planets.length,
                planets: this.solarSystem.planets.map(p => ({
                    name: p.config.name,
                    moonCount: p.moons.length,
                    hasRings: !!p.rings
                }))
            };
        }
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

    GetCurrentMode(): 'single' | 'solar-system' {
        return this.mode;
    }

    // === PRESET CONFIGURATIONS ===

    GetPresetConfigurations() {
        return {
            'realistic-earth': {
                name: 'Earth',
                texture: 'earth',
                size: 1,
                orbitRadius: 15,
                orbitSpeed: 0.01,
                rotationSpeed: 0.001,
                moons: [{
                    name: 'Moon',
                    size: 0.27,
                    orbitRadius: 3.84,
                    orbitSpeed: 0.036
                }]
            },
            'gas-giant': {
                name: 'Jupiter',
                texture: 'jupiter',
                size: 2.2,
                orbitRadius: 25,
                orbitSpeed: 0.005,
                rotationSpeed: 0.004,
                moons: [
                    { name: 'Io', size: 0.15, orbitRadius: 4.2, orbitSpeed: 0.085 },
                    { name: 'Europa', size: 0.14, orbitRadius: 5.3, orbitSpeed: 0.067 },
                    { name: 'Ganymede', size: 0.18, orbitRadius: 6.7, orbitSpeed: 0.045 },
                    { name: 'Callisto', size: 0.16, orbitRadius: 8.9, orbitSpeed: 0.033 }
                ]
            },
            'ringed-planet': {
                name: 'Saturn',
                texture: 'jupiter',
                size: 1.9,
                orbitRadius: 35,
                orbitSpeed: 0.003,
                rotationSpeed: 0.0038,
                hasRings: true,
                ringConfig: {
                    innerRadius: 2.3,
                    outerRadius: 4.8,
                    opacity: 0.7
                },
                moons: [
                    { name: 'Mimas', size: 0.08, orbitRadius: 4.6, orbitSpeed: 0.073 },
                    { name: 'Enceladus', size: 0.09, orbitRadius: 5.9, orbitSpeed: 0.056 },
                    { name: 'Titan', size: 0.22, orbitRadius: 9.8, orbitSpeed: 0.025 }
                ]
            }
        };
    }
}