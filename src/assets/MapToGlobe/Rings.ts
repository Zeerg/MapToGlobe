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
    private parentObject: THREE.Object3D;
    object!: THREE.Mesh; // Definite assignment assertion - initialized in constructor
    private currentConfig: RingConfig;
    private rotationSpeed = 0;

    constructor(parentObject: THREE.Object3D, json?: THREE.Mesh) {
        this.parentObject = parentObject;
        
        if (json) {
            this.object = json;
            // Try to extract config from existing ring system
            this.currentConfig = this.extractConfigFromMesh(json);
            return;
        }

        // Default Saturn-like ring configuration
        this.currentConfig = {
            innerRadius: 2.0,  // Valid range for sliders
            outerRadius: 4.0,  // Valid range for sliders
            segments: 96,
            opacity: 0.8,      // Valid range for sliders
            rotationSpeed: 0.5,
            color: 0xffffff,
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
            color: 0xffffff,
        };
    }

    private createRingMesh() {
        // Clean up existing ring if it exists
        if (this.object) {
            try {
                // More careful geometry disposal
                if (this.object.geometry && typeof this.object.geometry.dispose === 'function') {
                    try {
                        this.object.geometry.dispose();
                    } catch (geometryError) {
                        // Try manual cleanup of geometry attributes for BufferGeometry
                        const bufferGeometry = this.object.geometry as THREE.BufferGeometry;
                        if (bufferGeometry.attributes) {
                            Object.keys(bufferGeometry.attributes).forEach(key => {
                                try {
                                    const attribute = bufferGeometry.attributes[key];
                                    if (attribute && attribute.array) {
                                        delete bufferGeometry.attributes[key];
                                    }
                                } catch (attrError) {
                                    // Ignore individual attribute cleanup errors
                                }
                            });
                        }
                        if (bufferGeometry.index) {
                            try {
                                bufferGeometry.index = null;
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
                                    // Ignore material disposal errors
                                }
                            }
                        });
                    } else {
                        if (typeof this.object.material.dispose === 'function') {
                            try {
                                this.object.material.dispose();
                            } catch (matError) {
                                // Ignore material disposal errors
                            }
                        }
                    }
                }
                
                // Clear the object reference
                this.object = null as unknown as THREE.Mesh;
                
            } catch (error) {
                // Force clear the object even if disposal failed
                this.object = null as unknown as THREE.Mesh;
            }
        }

        const geometry = new THREE.RingGeometry(
            this.currentConfig.innerRadius, 
            this.currentConfig.outerRadius, 
            Math.max(8, this.currentConfig.segments), // Ensure minimum segments
            1, // phi segments (keep at 1)
            0, // theta start
            Math.PI * 2 // theta length (full circle)
        );
        
        // Force geometry computation to ensure attributes are available
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        
        // Create shader material for proper radial texture mapping
        const material = new THREE.ShaderMaterial({
            uniforms: {
                innerRadius: { value: this.currentConfig.innerRadius },
                outerRadius: { value: this.currentConfig.outerRadius },
                opacity: { value: this.currentConfig.opacity },
                color: { value: new THREE.Color(this.currentConfig.color || 0xffffff) },
                surfaceTexture: { value: null },
                alphaTexture: { value: null },
                hasTexture: { value: false },
                hasAlphaTexture: { value: false }
            },
            vertexShader: `
                varying vec3 vPos;
                
                void main() {
                    vPos = position;
                    vec3 viewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
                    gl_Position = projectionMatrix * vec4(viewPosition, 1.0);
                }
            `,
            fragmentShader: `
                uniform float innerRadius;
                uniform float outerRadius;
                uniform float opacity;
                uniform vec3 color;
                uniform sampler2D surfaceTexture;
                uniform sampler2D alphaTexture;
                uniform bool hasTexture;
                uniform bool hasAlphaTexture;

                varying vec3 vPos;

                void main() {
                    // Calculate radial distance
                    float distance = length(vPos);
                    
                    // Calculate UV coordinate for radial mapping
                    float u = (distance - innerRadius) / (outerRadius - innerRadius);
                    
                    // Discard fragments outside ring bounds
                    if (u < 0.0 || u > 1.0) {
                        discard;
                    }
                    
                    vec2 uv = vec2(u, 0.5); // Use middle of texture vertically
                    
                    // Start with base color
                    vec4 finalColor = vec4(color, opacity);
                    
                    // Apply surface texture if available
                    if (hasTexture) {
                        vec4 textureColor = texture2D(surfaceTexture, uv);
                        finalColor.rgb = textureColor.rgb * color;
                        finalColor.a *= textureColor.a;
                    }
                    
                    // Apply alpha texture if available
                    if (hasAlphaTexture) {
                        vec4 alphaColor = texture2D(alphaTexture, uv);
                        finalColor.a *= alphaColor.r; // Use red channel for alpha
                    }
                    
                    gl_FragColor = finalColor;
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        const rings = new THREE.Mesh(geometry, material);
        rings.name = "rings";
        rings.receiveShadow = true;

        this.object = rings;
        this.rotationSpeed = this.currentConfig.rotationSpeed;
    }

    Toggle() {
        const existingRing = this.parentObject.children.find(child => child.name === "rings");
        if (!existingRing) {
            this.parentObject.add(this.object);
        } else {
            this.parentObject.remove(existingRing);
        }
    }

    SetSurfaceImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (texture) => {
            // Configure texture settings
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            
            // Update shader uniforms
            const material = this.object.material as THREE.ShaderMaterial;
            material.uniforms.surfaceTexture.value = texture;
            material.uniforms.hasTexture.value = true;
            material.needsUpdate = true;
        });
    }

    SetTransparencyImage(file: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(file);
        loader.load(fileURL, (texture) => {
            // Configure texture settings
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            
            // Update shader uniforms
            const material = this.object.material as THREE.ShaderMaterial;
            material.uniforms.alphaTexture.value = texture;
            material.uniforms.hasAlphaTexture.value = true;
            material.needsUpdate = true;
        });
    }

    // NEW METHODS FOR RING CUSTOMIZATION

    /**
     * Set the inner radius of the ring system
     */
    SetInnerRadius(radius: number) {
        this.currentConfig.innerRadius = Math.max(0.5, Math.min(8, radius));
        // Ensure outer radius is always larger than inner radius
        if (this.currentConfig.outerRadius <= this.currentConfig.innerRadius) {
            this.currentConfig.outerRadius = this.currentConfig.innerRadius + 0.5;
        }
        this.updateGeometry();
    }

    /**
     * Set the outer radius of the ring system
     */
    SetOuterRadius(radius: number) {
        this.currentConfig.outerRadius = Math.max(1, Math.min(12, radius));
        // Ensure outer radius is always larger than inner radius
        if (this.currentConfig.outerRadius <= this.currentConfig.innerRadius) {
            this.currentConfig.innerRadius = Math.max(0.5, this.currentConfig.outerRadius - 0.5);
        }
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
            // Ignore error setting ring thickness
        }
    }

    /**
     * Set the opacity of the rings
     */
    SetOpacity(opacity: number) {
        this.currentConfig.opacity = Math.max(0, Math.min(1, opacity));
        const material = this.object.material as THREE.ShaderMaterial;
        material.uniforms.opacity.value = this.currentConfig.opacity;
        material.needsUpdate = true;
    }

    /**
     * Set the color of the rings
     */
    SetColor(color: number) {
        this.currentConfig.color = color;
        const material = this.object.material as THREE.ShaderMaterial;
        material.uniforms.color.value.setHex(color);
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
        const presets: Record<RingSystemType, RingConfig> = {
            saturn: { innerRadius: 2.8, outerRadius: 6.2, segments: 128, opacity: 0.8, rotationSpeed: 0.3, color: 0xffffff },
            uranus: { innerRadius: 3.5, outerRadius: 4.5, segments: 64, opacity: 0.6, rotationSpeed: 0.1, color: 0xffffff },
            jupiter: { innerRadius: 2.2, outerRadius: 3.8, segments: 96, opacity: 0.4, rotationSpeed: 0.8, color: 0xffffff },
            custom: { innerRadius: 1.2, outerRadius: 2.0, segments: 128, opacity: 0.8, rotationSpeed: 1.0, color: 0xffffff }
        };

        // Define texture presets for each ring system
        const texturePresets: Record<RingSystemType, { surface?: string; alpha?: string }> = {
            saturn: { 
                surface: require('@/assets/images/saturn-rings.png'),
                alpha: require('@/assets/images/saturn-rings-alpha.png')
            },
            uranus: {}, // No textures yet
            jupiter: {}, // No textures yet
            custom: {} // No default textures for custom rings
        };

        // Update current configuration with the preset
        this.currentConfig = { ...presets[type] };
        this.rotationSpeed = this.currentConfig.rotationSpeed;
        
        // Store visibility state before creating new mesh
        const wasVisible = this.parentObject.children.some(child => child.name === "rings");
        
        // Remove existing ring if it exists
        const existingRing = this.parentObject.children.find(child => child.name === "rings");
        if (existingRing) {
            this.parentObject.remove(existingRing);
        }
        
        // Always recreate the ring mesh with new configuration
        this.createRingMesh();
        
        // Load preset textures if available
        const texturePreset = texturePresets[type];
        if (texturePreset.surface) {
            this.loadPresetTexture(texturePreset.surface, 'surface');
        }
        if (texturePreset.alpha) {
            this.loadPresetTexture(texturePreset.alpha, 'alpha');
        }
        
        // If ring was visible, make sure the new ring is also visible
        if (wasVisible) {
            this.parentObject.add(this.object);
        }
    }

    /**
     * Load a preset texture from the assets directory
     */
    private loadPresetTexture(texturePath: string, type: 'surface' | 'alpha') {
        const loader = new THREE.TextureLoader();
        loader.load(texturePath, (texture) => {
            const material = this.object.material as THREE.ShaderMaterial;
            
            if (type === 'surface') {
                material.uniforms.surfaceTexture.value = texture;
                material.uniforms.hasTexture.value = true;
            } else if (type === 'alpha') {
                material.uniforms.alphaTexture.value = texture;
                material.uniforms.hasAlphaTexture.value = true;
            }
            
            material.needsUpdate = true;
        }, undefined, (error) => {
            console.warn(`Failed to load ring texture: ${texturePath}`, error);
        });
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
            const wasVisible = this.parentObject.children.some(child => child.name === "rings");
            
            // Store current textures before recreating geometry
            let surfaceTexture: THREE.Texture | null = null;
            let alphaTexture: THREE.Texture | null = null;
            
            if (this.object && this.object.material) {
                const material = this.object.material as THREE.ShaderMaterial;
                surfaceTexture = material.uniforms.surfaceTexture.value as THREE.Texture;
                alphaTexture = material.uniforms.alphaTexture.value as THREE.Texture;
            }
            
            // Remove existing ring if visible
            if (wasVisible) {
                const existingRing = this.parentObject.children.find(child => child.name === "rings");
                if (existingRing) {
                    this.parentObject.remove(existingRing);
                    
                    // If the existing ring is the same as our current object, clear the reference
                    if (existingRing === this.object) {
                        this.object = null as unknown as THREE.Mesh;
                    }
                }
            }
            
            this.createRingMesh();
            
            // Reapply textures with updated settings
            if (surfaceTexture) {
                const material = this.object.material as THREE.ShaderMaterial;
                material.uniforms.surfaceTexture.value = surfaceTexture;
                material.uniforms.hasTexture.value = true;
                material.needsUpdate = true;
            }
            if (alphaTexture) {
                const material = this.object.material as THREE.ShaderMaterial;
                material.uniforms.alphaTexture.value = alphaTexture;
                material.uniforms.hasAlphaTexture.value = true;
                material.needsUpdate = true;
            }
            
            // Restore visibility if it was visible before
            if (wasVisible && this.object) {
                this.parentObject.add(this.object);
            }
        } catch (error) {
            // Try to create a fresh ring mesh if update failed
            try {
                this.object = null as unknown as THREE.Mesh;
                this.createRingMesh();
            } catch (recoveryError) {
                // Failed to recover ring geometry - skip
            }
        }
    }

    /**
     * Get available ring system presets
     */
    static GetAvailableRingTypes(): Array<{name: string; key: RingSystemType}> {
        return [
            { name: 'Saturn-like', key: 'saturn' },
            { name: 'Uranus-like', key: 'uranus' },
            { name: 'Jupiter-like', key: 'jupiter' },
            { name: 'Custom', key: 'custom' }
        ];
    }
}