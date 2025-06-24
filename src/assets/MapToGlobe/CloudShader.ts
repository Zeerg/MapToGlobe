import * as THREE from 'three';

export const CloudVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying float vDistanceToCamera;
    
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        // Calculate distance to camera for atmospheric effects
        vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
        vDistanceToCamera = length(worldPosition.xyz);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const CloudFragmentShader = `
    uniform sampler2D cloudTexture;
    uniform sampler2D cloudDensityMap;
    uniform vec3 sunDirection;
    uniform float sunIntensity;
    uniform float cloudOpacity;
    uniform float cloudDensity;
    uniform float atmosphericScattering;
    uniform float rimLightIntensity;
    uniform vec3 rimLightColor;
    uniform float altitudeOpacityFactor;
    uniform float edgeFadeDistance;
    uniform bool enableAtmosphericScattering;
    uniform bool enableRimLighting;
    uniform bool enableAltitudeFading;
    uniform float time;
    uniform float cloudSpeed;
    uniform vec2 cloudOffset;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying float vDistanceToCamera;
    
    // Atmospheric scattering approximation
    vec3 calculateAtmosphericScattering(vec3 rayDirection, vec3 sunDirection, float intensity) {
        float cosTheta = dot(rayDirection, sunDirection);
        float scattering = pow(1.0 - cosTheta * cosTheta, 1.5);
        return vec3(0.4, 0.7, 1.0) * scattering * intensity;
    }
    
    // Edge fade calculation for soft cloud boundaries
    float calculateEdgeFade(vec3 normal, vec3 viewDirection) {
        float edge = 1.0 - abs(dot(normal, viewDirection));
        return smoothstep(0.0, edgeFadeDistance, edge);
    }
    
    // Altitude-based opacity for realistic atmospheric density
    float calculateAltitudeOpacity(vec3 position) {
        float altitude = length(position) - 2.0; // Planet radius is 2.0
        return 1.0 - (altitude * altitudeOpacityFactor);
    }
    
    void main() {
        // Animate cloud texture coordinates
        vec2 animatedUv = vUv + cloudOffset + vec2(time * cloudSpeed * 0.1, time * cloudSpeed * 0.05);
        
        // Sample cloud textures
        vec4 cloudColor = texture2D(cloudTexture, animatedUv);
        vec4 densityMap = texture2D(cloudDensityMap, animatedUv);
        
        // Use density map if available, otherwise use cloud texture alpha
        float density = densityMap.r > 0.0 ? densityMap.r : cloudColor.a;
        density *= cloudDensity;
        
        // Calculate base cloud color
        vec3 baseColor = cloudColor.rgb;
        
        // Sun lighting calculation
        float sunDot = dot(vNormal, sunDirection);
        float sunLighting = max(0.0, sunDot) * sunIntensity;
        
        // Atmospheric scattering
        vec3 scatteringColor = vec3(0.0);
        if (enableAtmosphericScattering) {
            vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
            scatteringColor = calculateAtmosphericScattering(viewDirection, sunDirection, atmosphericScattering);
        }
        
        // Rim lighting for atmospheric glow
        float rimLight = 0.0;
        vec3 rimColor = vec3(0.0);
        if (enableRimLighting) {
            vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
            rimLight = calculateEdgeFade(vNormal, viewDirection) * rimLightIntensity;
            rimColor = rimLightColor * rimLight;
        }
        
        // Altitude-based opacity
        float altitudeOpacity = 1.0;
        if (enableAltitudeFading) {
            altitudeOpacity = calculateAltitudeOpacity(vPosition);
        }
        
        // Distance-based opacity for performance and realism
        float distanceOpacity = 1.0 - smoothstep(10.0, 50.0, vDistanceToCamera);
        
        // Combine all lighting effects
        vec3 finalColor = baseColor;
        finalColor = mix(finalColor, finalColor * (1.0 + sunLighting), 0.7);
        finalColor += scatteringColor;
        finalColor += rimColor;
        
        // Calculate final opacity
        float finalOpacity = cloudOpacity * density * altitudeOpacity * distanceOpacity;
        
        // Soft alpha testing to avoid hard edges
        if (finalOpacity < 0.01) {
            discard;
        }
        
        gl_FragColor = vec4(finalColor, finalOpacity);
    }
`;

export class AdvancedCloudMaterial extends THREE.ShaderMaterial {
    constructor(cloudTexture?: THREE.Texture, cloudDensityMap?: THREE.Texture) {
        const uniforms = {
            cloudTexture: { value: cloudTexture || null },
            cloudDensityMap: { value: cloudDensityMap || null },
            sunDirection: { value: new THREE.Vector3(1, 0, 0) },
            sunIntensity: { value: 1.0 },
            cloudOpacity: { value: 0.8 },
            cloudDensity: { value: 1.0 },
            atmosphericScattering: { value: 0.3 },
            rimLightIntensity: { value: 0.5 },
            rimLightColor: { value: new THREE.Vector3(0.4, 0.7, 1.0) },
            altitudeOpacityFactor: { value: 2.0 },
            edgeFadeDistance: { value: 0.3 },
            enableAtmosphericScattering: { value: true },
            enableRimLighting: { value: true },
            enableAltitudeFading: { value: true },
            time: { value: 0.0 },
            cloudSpeed: { value: 1.0 },
            cloudOffset: { value: new THREE.Vector2(0, 0) }
        };

        super({
            uniforms,
            vertexShader: CloudVertexShader,
            fragmentShader: CloudFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
    }

    // Setter methods for easy control
    setSunDirection(direction: THREE.Vector3): void {
        this.uniforms.sunDirection.value.copy(direction);
    }

    setCloudOpacity(opacity: number): void {
        this.uniforms.cloudOpacity.value = Math.max(0, Math.min(1, opacity));
    }

    setCloudDensity(density: number): void {
        this.uniforms.cloudDensity.value = Math.max(0, Math.min(2, density));
    }

    setAtmosphericScattering(intensity: number): void {
        this.uniforms.atmosphericScattering.value = Math.max(0, Math.min(1, intensity));
    }

    setRimLighting(intensity: number, color?: THREE.Vector3): void {
        this.uniforms.rimLightIntensity.value = Math.max(0, Math.min(2, intensity));
        if (color) {
            this.uniforms.rimLightColor.value.copy(color);
        }
    }

    setAltitudeOpacityFactor(factor: number): void {
        this.uniforms.altitudeOpacityFactor.value = Math.max(0, Math.min(5, factor));
    }

    setCloudSpeed(speed: number): void {
        this.uniforms.cloudSpeed.value = speed;
    }

    setCloudOffset(x: number, y: number): void {
        this.uniforms.cloudOffset.value.set(x, y);
    }

    enableAtmosphericScattering(enable: boolean): void {
        this.uniforms.enableAtmosphericScattering.value = enable;
    }

    enableRimLighting(enable: boolean): void {
        this.uniforms.enableRimLighting.value = enable;
    }

    enableAltitudeFading(enable: boolean): void {
        this.uniforms.enableAltitudeFading.value = enable;
    }

    updateTime(time: number): void {
        this.uniforms.time.value = time;
    }

    setCloudTexture(texture: THREE.Texture): void {
        this.uniforms.cloudTexture.value = texture;
    }

    setCloudDensityMap(texture: THREE.Texture): void {
        this.uniforms.cloudDensityMap.value = texture;
    }
}

export default AdvancedCloudMaterial;