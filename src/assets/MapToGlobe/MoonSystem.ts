import * as THREE from 'three';

export interface MoonConfig {
    id: string;
    name: string;
    size: number;          // Scale factor (0.1 - 4.0)
    distance: number;      // Distance from planet (3 - 50)
    orbitSpeed: number;    // Orbital speed multiplier (0.0 - 5.0, 0.0 = paused)
    rotationSpeed: number; // Rotation speed multiplier (0.0 - 5.0, 0.0 = paused)
    texture?: string;      // Path to texture or null for default
    visible: boolean;      // Whether moon is currently visible
    color?: number;        // Default color if no texture (hex)
}

export class Moon {
    private planet: THREE.Mesh;
    public mesh: THREE.Mesh;
    public object: THREE.Object3D; // Pivot for orbital motion
    public config: MoonConfig;
    private orbitAngle = 0;

    constructor(planet: THREE.Mesh, config: MoonConfig) {
        this.planet = planet;
        this.config = config;

        // Create moon geometry and material
        const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            color: config.color || 0xcccccc
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = config.name;
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        
        // Apply initial transformations
        this.mesh.scale.set(config.size, config.size, config.size);
        this.mesh.position.set(config.distance, 0, 0);

        // Create pivot point for orbital motion
        this.object = new THREE.Object3D();
        this.object.name = `${config.name}_orbit`;
        this.object.add(this.mesh);

        // Set random initial orbit position for variety
        this.orbitAngle = Math.random() * Math.PI * 2;
        this.object.rotation.y = this.orbitAngle;
    }

    public show(): void {
        if (!this.planet.getObjectById(this.object.id)) {
            this.planet.add(this.object);
        }
        this.config.visible = true;
    }

    public hide(): void {
        this.planet.remove(this.object);
        this.config.visible = false;
    }

    public updateOrbit(deltaTime: number): void {
        if (this.config.visible) {
            // Update orbital position (only if orbit speed > 0)
            if (this.config.orbitSpeed > 0) {
                this.orbitAngle += deltaTime * this.config.orbitSpeed * 0.001;
                this.object.rotation.y = this.orbitAngle;
            }
            
            // Update moon rotation (only if rotation speed > 0)
            if (this.config.rotationSpeed > 0) {
                this.mesh.rotation.y += deltaTime * this.config.rotationSpeed * 0.002;
            }
        }
    }

    public setTexture(file: File): void {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (texture) => {
            const material = this.mesh.material as THREE.MeshPhongMaterial;
            material.map = texture;
            material.needsUpdate = true;
        });
    }

    public setSize(size: number): void {
        this.config.size = size;
        this.mesh.scale.set(size, size, size);
    }

    public setDistance(distance: number): void {
        this.config.distance = distance;
        this.mesh.position.set(distance, 0, 0);
    }

    public setOrbitSpeed(speed: number): void {
        this.config.orbitSpeed = speed;
    }

    public setRotationSpeed(speed: number): void {
        this.config.rotationSpeed = speed;
    }
}

export default class MoonSystem {
    private planet: THREE.Mesh;
    private moons: Map<string, Moon> = new Map();
    private lastUpdateTime = 0;

    constructor(planet: THREE.Mesh) {
        this.planet = planet;
        this.lastUpdateTime = performance.now();
    }

    public addMoon(config: MoonConfig): Moon {
        const moon = new Moon(this.planet, config);
        this.moons.set(config.id, moon);
        
        if (config.visible) {
            moon.show();
        }
        
        return moon;
    }

    public removeMoon(moonId: string): boolean {
        const moon = this.moons.get(moonId);
        if (moon) {
            moon.hide();
            this.moons.delete(moonId);
            return true;
        }
        return false;
    }

    public getMoon(moonId: string): Moon | undefined {
        return this.moons.get(moonId);
    }

    public getAllMoons(): Moon[] {
        return Array.from(this.moons.values());
    }

    public showMoon(moonId: string): void {
        const moon = this.moons.get(moonId);
        if (moon) {
            moon.show();
        }
    }

    public hideMoon(moonId: string): void {
        const moon = this.moons.get(moonId);
        if (moon) {
            moon.hide();
        }
    }

    public hideAllMoons(): void {
        this.moons.forEach(moon => moon.hide());
    }

    public showAllMoons(): void {
        this.moons.forEach(moon => moon.show());
    }

    public update(): void {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;

        // Update all moon orbits and rotations
        this.moons.forEach(moon => {
            moon.updateOrbit(deltaTime);
        });
    }

    public getVisibleMoonCount(): number {
        return Array.from(this.moons.values()).filter(moon => moon.config.visible).length;
    }

    public clearAllMoons(): void {
        this.moons.forEach(moon => moon.hide());
        this.moons.clear();
    }

    // Preset moon systems
    public static getEarthMoonPreset(): MoonConfig[] {
        return [
            {
                id: 'luna',
                name: 'Luna',
                size: 0.27,
                distance: 8,
                orbitSpeed: 1.0,
                rotationSpeed: 1.0,
                visible: true,
                color: 0xcccccc
            }
        ];
    }

    public static getJupiterMoonPreset(): MoonConfig[] {
        return [
            {
                id: 'io',
                name: 'Io',
                size: 0.29,
                distance: 6,
                orbitSpeed: 2.5,
                rotationSpeed: 2.5,
                visible: true,
                color: 0xffff99
            },
            {
                id: 'europa',
                name: 'Europa',
                size: 0.25,
                distance: 8,
                orbitSpeed: 1.8,
                rotationSpeed: 1.8,
                visible: true,
                color: 0xaaccff
            },
            {
                id: 'ganymede',
                name: 'Ganymede',
                size: 0.41,
                distance: 12,
                orbitSpeed: 1.2,
                rotationSpeed: 1.2,
                visible: true,
                color: 0x888888
            },
            {
                id: 'callisto',
                name: 'Callisto',
                size: 0.38,
                distance: 18,
                orbitSpeed: 0.8,
                rotationSpeed: 0.8,
                visible: true,
                color: 0x444444
            }
        ];
    }

    public static getSaturnMoonPreset(): MoonConfig[] {
        return [
            {
                id: 'mimas',
                name: 'Mimas',
                size: 0.12,
                distance: 5,
                orbitSpeed: 3.0,
                rotationSpeed: 3.0,
                visible: true,
                color: 0xcccccc
            },
            {
                id: 'titan',
                name: 'Titan',
                size: 0.40,
                distance: 25,
                orbitSpeed: 0.6,
                rotationSpeed: 0.6,
                visible: true,
                color: 0xffaa66
            },
            {
                id: 'iapetus',
                name: 'Iapetus',
                size: 0.11,
                distance: 35,
                orbitSpeed: 0.3,
                rotationSpeed: 0.3,
                visible: true,
                color: 0x666666
            }
        ];
    }

    public static getCustomMoonPreset(): MoonConfig[] {
        return [
            {
                id: 'custom1',
                name: 'Moon Alpha',
                size: 0.3,
                distance: 7,
                orbitSpeed: 1.5,
                rotationSpeed: 1.5,
                visible: true,
                color: 0xffcccc
            },
            {
                id: 'custom2',
                name: 'Moon Beta',
                size: 0.2,
                distance: 12,
                orbitSpeed: 1.0,
                rotationSpeed: 0.0, // Paused rotation example
                visible: true,
                color: 0xccffcc
            },
            {
                id: 'custom3',
                name: 'Moon Gamma',
                size: 0.15,
                distance: 20,
                orbitSpeed: 0.0, // Paused orbit example
                rotationSpeed: 2.0,
                visible: true,
                color: 0xccccff
            }
        ];
    }
} 