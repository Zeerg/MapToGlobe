import * as THREE from 'three';

export const DayNightVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const DayNightFragmentShader = `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform vec3 sunDirection;
    uniform float sunIntensity;
    uniform float transitionSmoothness;
    uniform bool enableDayNight;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
        // Sample both day and night textures
        vec3 dayColor = texture2D(dayTexture, vUv).rgb;
        vec3 nightColor = texture2D(nightTexture, vUv).rgb;
        
        if (!enableDayNight) {
            // If day/night is disabled, just show the day texture
            gl_FragColor = vec4(dayColor, 1.0);
            return;
        }
        
        // Calculate sun illumination based on surface normal and sun direction
        float sunDot = dot(vNormal, sunDirection);
        
        // Create smooth transition around terminator line
        float dayNightMix = smoothstep(-transitionSmoothness, transitionSmoothness, sunDot);
        
        // Add subtle atmospheric rim lighting
        float rimLight = 1.0 - abs(sunDot);
        rimLight = pow(rimLight, 2.0) * 0.3;
        
        // Mix day and night based on sun position
        vec3 finalColor = mix(nightColor, dayColor, dayNightMix);
        
        // Add subtle rim lighting to create atmospheric glow
        finalColor += vec3(0.4, 0.6, 1.0) * rimLight * (1.0 - dayNightMix);
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

export class DayNightMaterial extends THREE.ShaderMaterial {
    constructor(dayTexture?: THREE.Texture, nightTexture?: THREE.Texture) {
        const uniforms = {
            dayTexture: { value: dayTexture || null },
            nightTexture: { value: nightTexture || null },
            sunDirection: { value: new THREE.Vector3(1, 0, 0) },
            sunIntensity: { value: 1.0 },
            transitionSmoothness: { value: 0.1 },
            enableDayNight: { value: false }
        };

        super({
            uniforms,
            vertexShader: DayNightVertexShader,
            fragmentShader: DayNightFragmentShader
        });
    }

    setSunDirection(direction: THREE.Vector3) {
        this.uniforms.sunDirection.value.copy(direction);
    }

    setDayTexture(texture: THREE.Texture) {
        this.uniforms.dayTexture.value = texture;
    }

    setNightTexture(texture: THREE.Texture) {
        this.uniforms.nightTexture.value = texture;
        this.uniforms.enableDayNight.value = true;
    }

    setTransitionSmoothness(smoothness: number) {
        this.uniforms.transitionSmoothness.value = smoothness;
    }

    setSunIntensity(intensity: number) {
        this.uniforms.sunIntensity.value = intensity;
    }

    enableDayNight(enable: boolean) {
        this.uniforms.enableDayNight.value = enable;
    }
}

export default DayNightMaterial; 