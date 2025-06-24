import * as THREE from 'three';
import Planet from './Planet';
import Moon from './Moon';
import Rings from './Rings';

export interface PlanetConfig {
    name: string;
    texture: string;
    size: number;
    orbitRadius: number;
    orbitSpeed: number;
    rotationSpeed: number;
    position?: THREE.Vector3;
    moons?: MoonConfig[];
    hasRings?: boolean;
    ringConfig?: RingConfig;
}

export interface MoonConfig {
    name: string;
    size: number;
    orbitRadius: number;
    orbitSpeed: number;
    texture?: string;
}

export interface RingConfig {
    innerRadius: number;
    outerRadius: number;
    texture?: string;
    opacity: number;
}

export class SolarSystemPlanet {
    planet: Planet;
    moons: Moon[];
    rings?: Rings;
    config: PlanetConfig;
    orbitPivot: THREE.Object3D;
    moonPivots: THREE.Object3D[];
    orbitAngle: number = 0;
    moonOrbitAngles: number[];

    constructor(config: PlanetConfig) {
        this.config = config;
        this.planet = new Planet();
        this.moons = [];
        this.moonPivots = [];
        this.moonOrbitAngles = [];

        // Create orbit pivot for planetary motion
        this.orbitPivot = new THREE.Object3D();
        this.orbitPivot.position.set(config.orbitRadius, 0, 0);
        this.orbitPivot.add(this.planet.object);

        // Scale the planet
        this.planet.object.scale.setScalar(config.size);

        // Set planet type for rotation
        this.planet.SetPlanetType(config.name.toLowerCase());

        // Load planet texture if specified
        if (config.texture) {
            this.loadPlanetTexture(config.texture);
        }

        // Create moons
        if (config.moons) {
            config.moons.forEach((moonConfig, index) => {
                const moon = new Moon(this.planet.object);
                moon.Scale(moonConfig.size);
                moon.Distance(moonConfig.orbitRadius);
                
                // Load moon texture if specified
                if (moonConfig.texture) {
                    this.loadMoonTexture(moon, moonConfig.texture);
                }

                const moonPivot = new THREE.Object3D();
                moonPivot.add(moon.object);
                this.planet.object.add(moonPivot);

                this.moons.push(moon);
                this.moonPivots.push(moonPivot);
                this.moonOrbitAngles.push(0);
            });
        }

        // Create rings if specified
        if (config.hasRings && config.ringConfig) {
            this.rings = new Rings(this.planet.object);
            // Scale rings based on config
            const scaleX = config.ringConfig.outerRadius / 5; // Default outer radius is 5
            const scaleY = scaleX;
            this.rings.object.scale.set(scaleX, scaleY, 1);
            this.rings.object.material.opacity = config.ringConfig.opacity;
            this.planet.object.add(this.rings.object);
        }
    }

    private async loadPlanetTexture(textureName: string) {
        try {
            const loader = new THREE.TextureLoader();
            // Import the texture dynamically from assets
            const textureModule = await import(`../../images/${textureName}.png`);
            const texture = await loader.loadAsync(textureModule.default);
            const material = (this.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial;
            material.map = texture;
            material.needsUpdate = true;
        } catch (error) {
            console.warn(`Could not load planet texture: ${textureName}`);
            // Fallback to a basic material
            const material = (this.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial;
            material.color.setHex(0x888888);
            material.needsUpdate = true;
        }
    }

    private async loadMoonTexture(moon: Moon, textureName: string) {
        try {
            const loader = new THREE.TextureLoader();
            // Import the texture dynamically from assets
            const textureModule = await import(`../../images/${textureName}.png`);
            const texture = await loader.loadAsync(textureModule.default);
            const material = moon.moon.material as THREE.MeshPhongMaterial;
            material.map = texture;
            material.needsUpdate = true;
        } catch (error) {
            console.warn(`Could not load moon texture: ${textureName}`);
            // Fallback to a basic gray material
            const material = moon.moon.material as THREE.MeshPhongMaterial;
            material.color.setHex(0x666666);
            material.needsUpdate = true;
        }
    }

    update(deltaTime: number) {
        // Update planetary orbit
        this.orbitAngle += this.config.orbitSpeed * deltaTime;
        const orbitX = Math.cos(this.orbitAngle) * this.config.orbitRadius;
        const orbitZ = Math.sin(this.orbitAngle) * this.config.orbitRadius;
        this.orbitPivot.position.set(orbitX, 0, orbitZ);

        // Update planet rotation
        this.planet.UpdateRotation();

        // Update moon orbits
        this.moons.forEach((moon, index) => {
            if (this.config.moons && this.config.moons[index]) {
                this.moonOrbitAngles[index] += this.config.moons[index].orbitSpeed * deltaTime;
                this.moonPivots[index].rotation.y = this.moonOrbitAngles[index];
            }
        });
    }

    setPosition(position: THREE.Vector3) {
        this.orbitPivot.position.copy(position);
    }

    getWorldPosition(): THREE.Vector3 {
        return this.planet.object.getWorldPosition(new THREE.Vector3());
    }
}

export default class SolarSystem {
    planets: SolarSystemPlanet[];
    scene: THREE.Scene;
    sun: THREE.Mesh;
    asteroidBelt?: THREE.Object3D;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.planets = [];
        this.createSun();
    }

    private createSun() {
        const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            emissive: 0xffaa00,
            emissiveIntensity: 0.3
        });
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.name = "sun";
        this.scene.add(this.sun);
    }

    addPlanet(config: PlanetConfig): SolarSystemPlanet {
        const solarSystemPlanet = new SolarSystemPlanet(config);
        this.planets.push(solarSystemPlanet);
        this.scene.add(solarSystemPlanet.orbitPivot);
        return solarSystemPlanet;
    }

    removePlanet(planet: SolarSystemPlanet) {
        const index = this.planets.indexOf(planet);
        if (index > -1) {
            this.scene.remove(planet.orbitPivot);
            this.planets.splice(index, 1);
        }
    }

    update(deltaTime: number = 0.016) {
        this.planets.forEach(planet => planet.update(deltaTime));
        
        // Rotate the sun
        this.sun.rotation.y += 0.01;
    }

    // Preset solar system configurations
    createEarthMoonSystem(): SolarSystemPlanet {
        return this.addPlanet({
            name: 'Earth',
            texture: 'earth',
            size: 1,
            orbitRadius: 10,
            orbitSpeed: 0.01,
            rotationSpeed: 0.001,
            moons: [{
                name: 'Moon',
                size: 0.25,
                orbitRadius: 3,
                orbitSpeed: 0.05
            }]
        });
    }

    createJupiterSystem(): SolarSystemPlanet {
        return this.addPlanet({
            name: 'Jupiter',
            texture: 'jupiter',
            size: 2,
            orbitRadius: 20,
            orbitSpeed: 0.005,
            rotationSpeed: 0.002,
            moons: [
                { name: 'Io', size: 0.15, orbitRadius: 4, orbitSpeed: 0.08 },
                { name: 'Europa', size: 0.14, orbitRadius: 5, orbitSpeed: 0.06 },
                { name: 'Ganymede', size: 0.18, orbitRadius: 6.5, orbitSpeed: 0.04 },
                { name: 'Callisto', size: 0.16, orbitRadius: 8, orbitSpeed: 0.03 }
            ]
        });
    }

    createSaturnSystem(): SolarSystemPlanet {
        return this.addPlanet({
            name: 'Saturn',
            texture: 'jupiter', // Using Jupiter texture as placeholder
            size: 1.8,
            orbitRadius: 30,
            orbitSpeed: 0.003,
            rotationSpeed: 0.0018,
            hasRings: true,
            ringConfig: {
                innerRadius: 2.5,
                outerRadius: 4.5,
                opacity: 0.8
            },
            moons: [
                { name: 'Mimas', size: 0.08, orbitRadius: 5, orbitSpeed: 0.07 },
                { name: 'Titan', size: 0.2, orbitRadius: 7, orbitSpeed: 0.04 }
            ]
        });
    }

    createMiniSolarSystem() {
        this.createEarthMoonSystem();
        
        // Mars
        this.addPlanet({
            name: 'Mars',
            texture: 'mars',
            size: 0.8,
            orbitRadius: 15,
            orbitSpeed: 0.008,
            rotationSpeed: 0.001,
            moons: [{
                name: 'Phobos',
                size: 0.05,
                orbitRadius: 2.5,
                orbitSpeed: 0.12
            }]
        });

        this.createJupiterSystem();
        this.createSaturnSystem();
    }

    getPlanetByName(name: string): SolarSystemPlanet | undefined {
        return this.planets.find(p => p.config.name.toLowerCase() === name.toLowerCase());
    }

    clear() {
        this.planets.forEach(planet => {
            this.scene.remove(planet.orbitPivot);
        });
        this.planets = [];
    }
}