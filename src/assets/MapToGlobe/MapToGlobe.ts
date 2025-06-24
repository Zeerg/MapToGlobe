import * as THREE from 'three';
import { Tween, update } from '@tweenjs/tween.js';
import CanvasVideo from './CanvasVideo';

import Scene from './Scene';
import Planet from './Planet';
import Moon from './Moon';
import Rings from './Rings';

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}



export default class MapToGlobe {
    private animationId: number;
    instance: Scene;
    planet: Planet;
    moon: Moon;
    rings: Rings;
    sunFar = false;
    private lastSunUpdate = 0;

    constructor(element: HTMLCanvasElement) {
        this.instance = new Scene(element);
        this.planet = new Planet();
        this.instance.pivotObject.add(this.planet.object);

        this.moon = new Moon(this.planet.object);
        this.rings = new Rings(this.planet.object);

        let oldDistance = this.instance.camera.getWorldPosition(new THREE.Vector3(0,0,0)).distanceTo(this.planet.object.getWorldPosition(new THREE.Vector3(0,0,0)));

        this.instance.orbitControls.addEventListener("change", (event: THREE.Event) => {
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

        // SCIENCE FEATURE: Update planetary rotation
        this.planet.UpdateRotation();

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

    ToggleRings() {
        this.rings.Toggle();
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
     * SCIENCE FEATURES: Planetary Rotation Controls
     */

    SetPlanetType(planetType: string) {
        this.planet.SetPlanetType(planetType);
    }

    EnableRealTimeRotation(enable: boolean) {
        this.planet.EnableRealTimeRotation(enable);
    }

    SetTimeScale(scale: number) {
        this.planet.SetTimeScale(scale);
    }

    GetPlanetInfo() {
        return this.planet.GetPlanetInfo();
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
}