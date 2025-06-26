import * as THREE from 'three';

export interface MoonConfig {
    id: string;
    name: string;
    size: number;          // Scale factor (0.1 - 4.0)
    distance: number;      // Distance from planet (3 - 50)
    orbitSpeed: number;    // Orbital speed multiplier (0.0 - 5.0, 0.0 = paused)
    rotationSpeed: number; // Rotation speed multiplier (0.0 - 5.0, 0.0 = paused)
    retrograde: number;    // Orbit direction (0 = clockwise, 180 = counter-clockwise)
    texture?: string;      // Path to texture or null for default
    visible: boolean;      // Whether moon is currently visible
    color?: number;        // Default color if no texture (hex)
    // 3D Transform properties
    transform?: {
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
        scale: { x: number; y: number; z: number };
    };
}

export class Moon {
    private parentObject: THREE.Object3D;
    private planetReference: THREE.Mesh;
    public mesh: THREE.Mesh;
    public object: THREE.Object3D; // Pivot for orbital motion
    public config: MoonConfig;
    private orbitAngle = 0;

    constructor(parentObject: THREE.Object3D, config: MoonConfig, planetReference?: THREE.Mesh) {
        this.parentObject = parentObject;
        this.planetReference = planetReference || (parentObject as THREE.Mesh);
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

        // Apply 3D transform if provided
        if (config.transform) {
            this.mesh.position.add(new THREE.Vector3(
                config.transform.position.x,
                config.transform.position.y,
                config.transform.position.z
            ));
            this.mesh.rotation.set(
                config.transform.rotation.x,
                config.transform.rotation.y,
                config.transform.rotation.z
            );
            this.mesh.scale.set(
                config.transform.scale.x,
                config.transform.scale.y,
                config.transform.scale.z
            );
        }

        // Create pivot point for orbital motion
        this.object = new THREE.Object3D();
        this.object.name = `${config.name}_orbit`;
        this.object.add(this.mesh);

        // Set random initial orbit position for variety
        this.orbitAngle = Math.random() * Math.PI * 2;
        this.object.rotation.y = this.orbitAngle;
    }

    public show(): void {
        if (!this.parentObject.getObjectById(this.object.id)) {
            this.parentObject.add(this.object);
        }
        this.config.visible = true;
    }

    public hide(): void {
        this.parentObject.remove(this.object);
        this.config.visible = false;
    }

    public updateOrbit(deltaTime: number): void {
        if (this.config.visible) {
            // Update orbital position (only if orbit speed > 0)
            if (this.config.orbitSpeed > 0) {
                // Calculate orbit direction based on retrograde value
                // 0 = clockwise (positive), 180 = counter-clockwise (negative)
                const retrogradeMultiplier = 1 - (this.config.retrograde / 90); // Convert 0-180 to 1 to -1
                
                this.orbitAngle += deltaTime * this.config.orbitSpeed * 0.001 * retrogradeMultiplier;
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

    public setRetrograde(retrograde: number): void {
        this.config.retrograde = retrograde;
    }

    public setColor(color: number): void {
        this.config.color = color;
        const material = this.mesh.material as THREE.MeshPhongMaterial;
        material.color.setHex(color);
        material.needsUpdate = true;
    }

    // 3D Transform methods
    public setPosition(x: number, y: number, z: number): void {
        if (!this.config.transform) {
            this.config.transform = {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            };
        }
        this.config.transform.position = { x, y, z };
        // Apply position relative to base orbital position
        this.mesh.position.set(this.config.distance + x, y, z);
    }

    public setMeshRotation(x: number, y: number, z: number): void {
        if (!this.config.transform) {
            this.config.transform = {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            };
        }
        this.config.transform.rotation = { x, y, z };
        // Note: We preserve the spinning rotation and add the manual rotation
        this.mesh.rotation.set(x, this.mesh.rotation.y + z, z);
    }

    public setMeshScale(x: number, y: number, z: number): void {
        if (!this.config.transform) {
            this.config.transform = {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            };
        }
        this.config.transform.scale = { x, y, z };
        this.mesh.scale.set(x, y, z);
    }

    public getTransform(): { position: { x: number; y: number; z: number }; rotation: { x: number; y: number; z: number }; scale: { x: number; y: number; z: number } } {
        return this.config.transform || {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 }
        };
    }
}

export default class MoonSystem {
    private parentObject: THREE.Object3D;
    private planetReference: THREE.Mesh;
    private moons: Map<string, Moon> = new Map();
    private lastUpdateTime = 0;

    constructor(parentObject: THREE.Object3D, planetReference?: THREE.Mesh) {
        this.parentObject = parentObject;
        this.planetReference = planetReference || (parentObject as THREE.Mesh);
        this.lastUpdateTime = performance.now();
    }

    public addMoon(config: MoonConfig): Moon {
        const moon = new Moon(this.parentObject, config, this.planetReference);
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
                retrograde: 0,
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
                retrograde: 0,
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
                retrograde: 0,
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
                retrograde: 0,
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
                retrograde: 0,
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
                retrograde: 0,
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
                retrograde: 0,
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
                retrograde: 180, // Counter-clockwise orbit as an example
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
                retrograde: 0,
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
                retrograde: 90, // Mixed orbit direction
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
                retrograde: 180, // Counter-clockwise orbit
                visible: true,
                color: 0xccccff
            }
        ];
    }
} 