import { Tween, Easing } from '@tweenjs/tween.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export default class Scene {
    scene: THREE.Scene;
    renderer: THREE.Renderer;
    camera: THREE.PerspectiveCamera;
    controls: TransformControls;
    light: THREE.Object3D;
    ambient: THREE.AmbientLight;
    orbitControls: OrbitControls;
    oldLightPosition: THREE.Quaternion;
    pivotObject = new THREE.Object3D();

    constructor(element: HTMLCanvasElement) {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("black");

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas: element, alpha: true, preserveDrawingBuffer: true, antialias: true });
        renderer.setSize((element.parentElement as HTMLDivElement).clientWidth, (element.parentElement as HTMLDivElement).clientHeight); // Use parent container height instead of window height
        renderer.shadowMap.enabled = true;

        // Camera
        const camera = new THREE.PerspectiveCamera(25, element.offsetWidth / element.offsetHeight, 0.1, 2000);
        camera.position.z = 12;
        scene.add(camera);

        // Sun light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 100);
        light.name = "directionalLight";
        light.castShadow = true;
        light.intensity = 0.4;

        // Controls
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enablePan = false;
        orbitControls.enableDamping = true;
        const transformControls = new TransformControls(camera, renderer.domElement);
        transformControls.addEventListener("dragging-changed", function (event: THREE.Event) {
            orbitControls.enabled = !event.value;
        });
        transformControls.setMode("rotate");
        transformControls.setSize(1.5);
        scene.add(transformControls);

        // To lighten shadows. See https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
        const light2 = light.clone();
        light2.castShadow = false;
        light2.intensity = 1 - 0.4;
        
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        ambientLight.name = "ambientLight";

        const anchor = new THREE.Object3D();
        anchor.position.set(0, 0, 0);
        anchor.name = "lightParent";
        anchor.add(light);
        anchor.add(light2);

        this.oldLightPosition = anchor.quaternion.clone();

        scene.add(ambientLight);
        camera.add(anchor);

        scene.add(this.pivotObject);

        window.addEventListener("resize", () => {
            this.camera.aspect = (element.parentElement as HTMLDivElement).clientWidth / (element.parentElement as HTMLDivElement).clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize((element.parentElement as HTMLDivElement).clientWidth, (element.parentElement as HTMLDivElement).clientHeight);
        });

        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.controls = transformControls;
        this.light = anchor;
        this.ambient = ambientLight;
        this.orbitControls = orbitControls;
    }

    SetBGBlack() {
        this.scene.background = new THREE.Color(0x000000);
    }

    SetBGTransparent() {
        this.scene.background = null;
    }

    SetBGImage(image: File) {
        const loader = new THREE.TextureLoader();
        const fileURL = URL.createObjectURL(image);
        loader.load(fileURL, (res) => {
            this.scene.background = res;
        });
    }

    SetBGColor(hexColor: string) {
        this.scene.background = new THREE.Color(hexColor);
    }

    SetBGStarfield() {
        const canvas = document.createElement('canvas');
        canvas.width = 4096;  // High resolution but manageable
        canvas.height = 2048;
        const ctx = canvas.getContext('2d')!;
        
        // Enable high-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        this.generateBeautifulStarfield(ctx, canvas.width, canvas.height);

        const texture = new THREE.CanvasTexture(canvas);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        this.scene.background = texture;
    }

    private generateBeautifulStarfield(ctx: CanvasRenderingContext2D, width: number, height: number) {
        // Create smooth deep space background
        const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
        bgGradient.addColorStop(0, '#000510');
        bgGradient.addColorStop(0.7, '#000208');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);

        // Generate beautiful star layers with realistic distribution
        const starLayers = [
            { count: 8000, maxSize: 0.5, brightness: [0.2, 0.6], colors: ['#ffffff', '#fff8e7', '#ffe4b5'] }, // Distant stars
            { count: 4000, maxSize: 1.0, brightness: [0.4, 0.8], colors: ['#ffffff', '#fff8e7', '#ffcc99', '#ff9966'] }, // Medium stars
            { count: 1500, maxSize: 1.8, brightness: [0.6, 1.0], colors: ['#ffffff', '#ffeeaa', '#ffaa44', '#ff6633'] }, // Bright stars
            { count: 400, maxSize: 2.5, brightness: [0.8, 1.0], colors: ['#ffffff', '#aaccff', '#88aaff', '#6699ff'] }, // Very bright stars
            { count: 80, maxSize: 3.5, brightness: [0.9, 1.0], colors: ['#ffffff', '#ffdddd', '#ff8888', '#ff4444'] }  // Brilliant stars
        ];

        starLayers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = 0.3 + Math.random() * layer.maxSize;
                const brightness = layer.brightness[0] + Math.random() * (layer.brightness[1] - layer.brightness[0]);
                const color = layer.colors[Math.floor(Math.random() * layer.colors.length)];
                
                // Draw star with smooth anti-aliasing
                this.drawSmoothStar(ctx, x, y, size, color, brightness);
                
                // Add glow for larger/brighter stars
                if (size > 1.5 && brightness > 0.7) {
                    this.drawStarGlow(ctx, x, y, size, color, brightness);
                }
                
                // Add diffraction spikes for very bright stars
                if (size > 2.5 && brightness > 0.85) {
                    this.drawDiffractionSpikes(ctx, x, y, size, color, brightness);
                }
            }
        });

        // Add subtle Milky Way band
        this.drawMilkyWayBand(ctx, width, height);
    }

    private drawSmoothStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, brightness: number) {
        ctx.globalAlpha = brightness;
        ctx.fillStyle = color;
        
        // Use multiple circles with slight offsets for smooth anti-aliasing
        const samples = 3;
        const alpha = brightness / samples;
        
        for (let i = 0; i < samples; i++) {
            ctx.globalAlpha = alpha;
            const offset = (i - 1) * 0.3;
            ctx.beginPath();
            ctx.arc(x + offset, y + offset, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    private drawStarGlow(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, brightness: number) {
        const glowRadius = size * (2 + brightness * 3);
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        
        // Create smooth glow with proper alpha blending
        const baseAlpha = Math.floor(brightness * 60);
        const midAlpha = Math.floor(brightness * 25);
        
        glowGradient.addColorStop(0, color.replace('rgb', 'rgba').replace(')', `, ${baseAlpha / 255})`));
        glowGradient.addColorStop(0.4, color.replace('rgb', 'rgba').replace(')', `, ${midAlpha / 255})`));
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.globalAlpha = brightness * 0.8;
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    private drawDiffractionSpikes(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, brightness: number) {
        const spikeLength = size * (6 + brightness * 8);
        
        ctx.globalAlpha = brightness * 0.6;
        ctx.strokeStyle = color;
        ctx.lineWidth = size * 0.15;
        ctx.lineCap = 'round';
        
        // Draw four main spikes
        ctx.beginPath();
        ctx.moveTo(x - spikeLength, y);
        ctx.lineTo(x + spikeLength, y);
        ctx.moveTo(x, y - spikeLength);
        ctx.lineTo(x, y + spikeLength);
        ctx.stroke();
        
        // Add secondary diagonal spikes for very bright stars
        if (brightness > 0.9) {
            ctx.globalAlpha = brightness * 0.3;
            ctx.lineWidth = size * 0.08;
            const diagLength = spikeLength * 0.7;
            
            ctx.beginPath();
            ctx.moveTo(x - diagLength * 0.7, y - diagLength * 0.7);
            ctx.lineTo(x + diagLength * 0.7, y + diagLength * 0.7);
            ctx.moveTo(x - diagLength * 0.7, y + diagLength * 0.7);
            ctx.lineTo(x + diagLength * 0.7, y - diagLength * 0.7);
            ctx.stroke();
        }
    }

    private drawMilkyWayBand(ctx: CanvasRenderingContext2D, width: number, height: number) {
        // Create subtle galactic plane
        ctx.globalAlpha = 0.12;
        const bandGradient = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.65);
        bandGradient.addColorStop(0, 'rgba(255, 248, 240, 0)');
        bandGradient.addColorStop(0.5, 'rgba(255, 248, 240, 0.4)');
        bandGradient.addColorStop(1, 'rgba(255, 248, 240, 0)');
        
        ctx.fillStyle = bandGradient;
        ctx.fillRect(0, height * 0.35, width, height * 0.3);
        
        // Add some texture with small variations
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * width;
            const y = height * 0.4 + Math.random() * height * 0.2;
            const variation = Math.random() * 0.1;
            
            ctx.globalAlpha = variation;
            ctx.fillStyle = 'rgba(255, 248, 240, 1)';
            ctx.beginPath();
            ctx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1;
    }





    SetSunIntensity(num: number) {
        (this.light.children[0] as THREE.DirectionalLight).intensity = num / 2;
    }

    SetAmbientIntensity(num: number) {
        (this.scene.getObjectByName("ambientLight") as THREE.AmbientLight).intensity = num;
    }

    SetSunFar() {
        this.light.applyQuaternion(this.camera.quaternion.clone());
        this.pivotObject.add(this.light);
        new Tween(this.light.quaternion).to(this.oldLightPosition, 750).easing(Easing.Cubic.Out).start();
    }

    SetSunClose() {
        this.oldLightPosition = this.light.quaternion.clone();
        const endQuaternion = this.camera.quaternion.clone();
        this.light.applyQuaternion(endQuaternion.clone().inverse());
        this.camera.add(this.light);
        new Tween(this.light.quaternion).to(new THREE.Quaternion(), 750).easing(Easing.Cubic.Out).start();
    }
}