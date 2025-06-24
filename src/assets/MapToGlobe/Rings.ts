import * as THREE from 'three';

export type RingSystemType = 'saturn' | 'uranus' | 'jupiter' | 'custom';

export interface RingConfig {
    innerRadius: number;
    outerRadius: number;
    segments: number;
    opacity: number;
    rotationSpeed: number; // Rotation speed multiplier
    color?: number; // Default color (hex)
}

export default class Rings {
    private planet: THREE.Mesh;
    object: THREE.Mesh;
    private currentConfig: RingConfig;
    private rotationSpeed: number = 0;

    constructor(planet: THREE.Mesh, json?: THREE.Mesh) {
        this.planet = planet;
        
        if (json) {
            this.object = json;
            // Try to extract config from existing ring system
            this.currentConfig = this.extractConfigFromMesh(json);
            return;
        }

        // Default Saturn-like ring configuration
        this.currentConfig = {
            innerRadius: 3,
            outerRadius: 5,
            segments: 96,
            opacity: 1.0,
            rotationSpeed: 0.5,
            color: 0xffffff
        };

        this.createRingMesh();
    }

    private extractConfigFromMesh(mesh: THREE.Mesh): RingConfig {
        // Extract configuration from existing mesh if possible
        const geometry = mesh.geometry as THREE.RingGeometry;
        return {
            innerRadius: geometry.parameters?.innerRadius || 3,
            outerRadius: geometry.parameters?.outerRadius || 5,
            segments: geometry.parameters?.thetaSegments || 96,
            opacity: (mesh.material as THREE.MeshLambertMaterial).opacity || 1.0,
            rotationSpeed: 0.5,
            color: 0xffffff
        };
    }

    private createRingMesh() {
        // Remove any existing ring from the planet first
        const existingRing = this.planet.children.find(child => child.name === "rings");
        if (existingRing && existingRing !== this.object) {
            this.planet.remove(existingRing);
        }
        
        // Dispose of existing ring if it exists
        if (this.object) {
            try {
                // More careful geometry disposal
                if (this.object.geometry && typeof this.object.geometry.dispose === 'function') {
                    try {
                        this.object.geometry.dispose();
                    } catch (geometryError) {
                        console.warn('Error disposing geometry:', geometryError);
                        // Try manual cleanup of geometry attributes
                        if (this.object.geometry.attributes) {
                            Object.keys(this.object.geometry.attributes).forEach(key => {
                                try {
                                    const attribute = this.object.geometry.attributes[key];
                                    if (attribute && attribute.array) {
                                        delete this.object.geometry.attributes[key];
                                    }
                                } catch (attrError) {
                                    // Ignore individual attribute cleanup errors
                                }
                            });
                        }
                        if (this.object.geometry.index) {
                            try {
                                delete this.object.geometry.index;
                            } catch (indexError) {
                                // Ignore index cleanup error
                            }
                        }
                    }
                }
                
                // Material disposal
                if (this.object.material) {
                    if (Array.isArray(this.object.material)) {
                        this.object.material.forEach(material => {
                            if (material && typeof material.dispose === 'function') {
                                try {
                                    material.dispose();
                                } catch (matError) {
                                    console.warn('Error disposing material:', matError);
                                }
                            }
                        });
                    } else {
                        if (typeof this.object.material.dispose === 'function') {
                            try {
                                this.object.material.dispose();
                            } catch (matError) {
                                console.warn('Error disposing material:', matError);
                            }
                        }
                    }
                }
                
                // Clear the object reference
                this.object = null as any;
                
            } catch (error) {
                console.warn('Error disposing ring resources:', error);
                // Force clear the object even if disposal failed
                this.object = null as any;
            }
        }

        const geometry = new THREE.RingGeometry(
            this.currentConfig.innerRadius, 
            this.currentConfig.outerRadius, 
            this.currentConfig.segments, 
            1
        );
        
        const material = new THREE.MeshLambertMaterial({ 
            transparent: true, 
            side: THREE.DoubleSide,
            opacity: this.currentConfig.opacity,
            color: this.currentConfig.color || 0xffffff
        });
        
        const rings = new THREE.Mesh(geometry, material);
        rings.name = "rings";
        rings.receiveShadow = true;

        // Configure UV mapping for textures
        // https://discourse.threejs.org/t/applying-a-texture-to-a-ringgeometry/9990
        try {
            const pos = geometry.attributes.position;
            if (pos && geometry.attributes.uv) {
                const v3 = new THREE.Vector3();
                const minRadius = this.currentConfig.innerRadius;
                const maxRadius = this.currentConfig.outerRadius;
                
                for (let i = 0; i < pos.count; i++){
                    v3.fromBufferAttribute(pos, i);
                    const distance = v3.length();
                    // Map distance to UV coordinates (0 = inner edge, 1 = outer edge)
                    const u = (distance - minRadius) / (maxRadius - minRadius);
                    geometry.attributes.uv.setXY(i, u, 1);
                }
            }
        } catch (error) {
            console.warn('Error configuring ring UV mapping:', error);
        }

        this.object = rings;
        this.rotationSpeed = this.currentConfig.rotationSpeed;
    }

    Toggle() {
        console.log('Toggle rings called'); // Debug log
        const existingRing = this.planet.children.find(child => child.name === "rings");
        if (!existingRing) {
            this.planet.add(this.object);
            console.log('Added rings to planet'); // Debug log
        } else {
            this.planet.remove(existingRing);
            console.log('Removed rings from planet'); // Debug log
        }
    }

    SetSurfaceImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (res) => {
            const material = this.object.material as THREE.MeshLambertMaterial;
            material.map = res;
            material.needsUpdate = true;
        });
    }

    SetTransparencyImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (res) => {
            const material = this.object.material as THREE.MeshLambertMaterial;
            material.alphaMap = res;
            material.needsUpdate = true;
        });
    }

    // NEW METHODS FOR RING CUSTOMIZATION

    /**
     * Set the inner radius of the ring system
     */
    SetInnerRadius(radius: number) {
        this.currentConfig.innerRadius = Math.max(0.1, radius);
        this.updateGeometry();
    }

    /**
     * Set the outer radius of the ring system
     */
    SetOuterRadius(radius: number) {
        this.currentConfig.outerRadius = Math.max(this.currentConfig.innerRadius + 0.1, radius);
        this.updateGeometry();
    }

    /**
     * Set both inner and outer radius simultaneously
     */
    SetRadii(innerRadius: number, outerRadius: number) {
        this.currentConfig.innerRadius = Math.max(0.1, innerRadius);
        this.currentConfig.outerRadius = Math.max(this.currentConfig.innerRadius + 0.1, outerRadius);
        this.updateGeometry();
    }

    /**
     * Set the thickness of the rings (distance between inner and outer radius)
     */
    SetThickness(thickness: number) {
        try {
            const center = (this.currentConfig.innerRadius + this.currentConfig.outerRadius) / 2;
            const halfThickness = Math.max(0.1, thickness) / 2;
            const newInnerRadius = Math.max(0.1, center - halfThickness);
            const newOuterRadius = center + halfThickness;
            
            // Only update if the values actually changed significantly
            const threshold = 0.01;
            if (Math.abs(this.currentConfig.innerRadius - newInnerRadius) > threshold || 
                Math.abs(this.currentConfig.outerRadius - newOuterRadius) > threshold) {
                
                this.currentConfig.innerRadius = newInnerRadius;
                this.currentConfig.outerRadius = newOuterRadius;
                this.updateGeometry();
            }
        } catch (error) {
            console.error('Error setting ring thickness:', error);
        }
    }

    /**
     * Set the opacity of the rings
     */
    SetOpacity(opacity: number) {
        this.currentConfig.opacity = Math.max(0, Math.min(1, opacity));
        const material = this.object.material as THREE.MeshLambertMaterial;
        material.opacity = this.currentConfig.opacity;
        material.needsUpdate = true;
    }

    /**
     * Set the color of the rings
     */
    SetColor(color: number) {
        this.currentConfig.color = color;
        const material = this.object.material as THREE.MeshLambertMaterial;
        material.color.setHex(color);
        material.needsUpdate = true;
    }

    /**
     * Set the rotation speed of the rings
     */
    SetRotationSpeed(speed: number) {
        this.currentConfig.rotationSpeed = speed;
        this.rotationSpeed = speed;
    }

    /**
     * Update the ring system animation (call this in animation loop)
     */
    Update() {
        if (this.object && this.rotationSpeed !== 0) {
            this.object.rotation.z += this.rotationSpeed * 0.001; // Convert to reasonable rotation speed
        }
    }

    /**
     * Load a predefined ring system type
     */
    LoadRingSystemType(type: RingSystemType) {
        console.log('Loading ring system type:', type); // Debug log
        
        switch (type) {
            case 'saturn':
                this.currentConfig = {
                    innerRadius: 2.8,
                    outerRadius: 6.2,
                    segments: 128,
                    opacity: 0.8,
                    rotationSpeed: 0.3,
                    color: 0xd4af37
                };
                break;
            case 'uranus':
                this.currentConfig = {
                    innerRadius: 3.5,
                    outerRadius: 4.5,
                    segments: 64,
                    opacity: 0.6,
                    rotationSpeed: 0.1,
                    color: 0x4169e1
                };
                break;
            case 'jupiter':
                this.currentConfig = {
                    innerRadius: 2.2,
                    outerRadius: 3.8,
                    segments: 96,
                    opacity: 0.4,
                    rotationSpeed: 0.8,
                    color: 0x8b4513
                };
                break;
            case 'custom':
            default:
                // Keep current configuration for custom type
                console.log('Custom ring type selected, keeping current config');
                return;
        }
        
        console.log('New ring config:', this.currentConfig); // Debug log
        
        // Store visibility state before creating new mesh
        const wasVisible = this.planet.children.some(child => child.name === "rings");
        console.log('Ring was visible:', wasVisible); // Debug log
        
        // Remove existing ring if it exists
        const existingRing = this.planet.children.find(child => child.name === "rings");
        if (existingRing) {
            this.planet.remove(existingRing);
            console.log('Removed existing ring'); // Debug log
        }
        
        // Always recreate the ring mesh with new configuration
        this.createRingMesh();
        
        // If ring was visible, make sure the new ring is also visible
        if (wasVisible) {
            this.planet.add(this.object);
            console.log('Ring visibility restored'); // Debug log
        }
    }

    /**
     * Get current ring configuration
     */
    GetConfig(): RingConfig {
        return { ...this.currentConfig };
    }

    /**
     * Set segments/detail level of the rings
     */
    SetDetail(segments: number) {
        this.currentConfig.segments = Math.max(8, Math.min(256, segments));
        this.updateGeometry();
    }

    private updateGeometry() {
        try {
            const wasVisible = this.planet.children.some(child => child.name === "rings");
            
            // Remove existing ring if visible
            if (wasVisible) {
                const existingRing = this.planet.children.find(child => child.name === "rings");
                if (existingRing) {
                    this.planet.remove(existingRing);
                    
                    // If the existing ring is the same as our current object, clear the reference
                    if (existingRing === this.object) {
                        this.object = null as any;
                    }
                }
            }
            
            this.createRingMesh();
            
            // Restore visibility if it was visible before
            if (wasVisible && this.object) {
                this.planet.add(this.object);
            }
        } catch (error) {
            console.error('Error updating ring geometry:', error);
            // Try to create a fresh ring mesh if update failed
            try {
                this.object = null as any;
                this.createRingMesh();
            } catch (recoveryError) {
                console.error('Failed to recover ring geometry:', recoveryError);
            }
        }
    }

    /**
     * Get available ring system presets
     */
    static GetAvailableRingTypes(): Array<{name: string, key: RingSystemType}> {
        return [
            { name: 'Saturn-like', key: 'saturn' },
            { name: 'Uranus-like', key: 'uranus' },
            { name: 'Jupiter-like', key: 'jupiter' },
            { name: 'Custom', key: 'custom' }
        ];
    }
}