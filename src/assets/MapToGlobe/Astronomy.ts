import * as THREE from 'three';

// Planetary data for realistic rotation periods
export interface PlanetData {
    name: string;
    rotationHours: number; // Real rotation period in Earth hours
    displayScale: number;   // How fast to show it (1 = real-time scaled)
    tilt: number;          // Axial tilt in degrees
}

export const PLANET_DATA: { [key: string]: PlanetData } = {
    earth: {
        name: "Earth",
        rotationHours: 24,
        displayScale: 720, // 24 hours → 2 minutes
        tilt: 23.44
    },
    mars: {
        name: "Mars", 
        rotationHours: 24.6,
        displayScale: 738, // 24.6 hours → ~2 minutes
        tilt: 25.19
    },
    jupiter: {
        name: "Jupiter",
        rotationHours: 9.9,
        displayScale: 297, // 9.9 hours → ~2 minutes
        tilt: 3.13
    },
    venus: {
        name: "Venus",
        rotationHours: 5832, // 243 Earth days (retrograde)
        displayScale: -17496, // Negative for retrograde, ~10 minutes
        tilt: 177.4
    },
    mercury: {
        name: "Mercury",
        rotationHours: 1407.6, // 58.6 Earth days
        displayScale: 4223, // ~7 minutes
        tilt: 0.034
    },
    saturn: {
        name: "Saturn",
        rotationHours: 10.7,
        displayScale: 321, // ~2 minutes
        tilt: 26.73
    }
};

export class AstronomyCalculator {
    
    /**
     * Calculate the sun's position for day/night terminator
     */
    static calculateSunPosition(date: Date = new Date()): THREE.Vector3 {
        const dayOfYear = this.getDayOfYear(date);
        const hour = date.getUTCHours() + date.getUTCMinutes() / 60;
        
        // Solar declination (Earth's tilt effect on seasons)
        const declination = -23.44 * Math.cos(2 * Math.PI * (dayOfYear + 10) / 365.25);
        const declinationRad = declination * Math.PI / 180;
        
        // Hour angle (Earth's rotation effect)
        const hourAngle = 15 * (hour - 12); // 15 degrees per hour
        const hourAngleRad = hourAngle * Math.PI / 180;
        
        // Convert to 3D vector (sun direction)
        const x = Math.cos(declinationRad) * Math.cos(hourAngleRad);
        const y = Math.sin(declinationRad);
        const z = Math.cos(declinationRad) * Math.sin(hourAngleRad);
        
        return new THREE.Vector3(x, y, z).normalize();
    }
    
    /**
     * Get rotation speed for a planet in radians per frame
     */
    static getPlanetRotationSpeed(planetType: string, timeScale = 1): number {
        const planetData = PLANET_DATA[planetType.toLowerCase()] || PLANET_DATA.earth;
        
        // Convert to radians per second, then per frame (assuming 60fps)
        const radiansPerHour = (2 * Math.PI) / planetData.rotationHours;
        const radiansPerSecond = radiansPerHour / 3600;
        const radiansPerFrame = radiansPerSecond / 60; // 60fps
        
        // Apply display scaling and user time scale
        return radiansPerFrame * planetData.displayScale * timeScale;
    }
    
    /**
     * Get axial tilt for a planet in radians
     */
    static getPlanetTilt(planetType: string): number {
        const planetData = PLANET_DATA[planetType.toLowerCase()] || PLANET_DATA.earth;
        return planetData.tilt * Math.PI / 180;
    }
    
    /**
     * Helper function to get day of year
     */
    private static getDayOfYear(date: Date): number {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    
    /**
     * Calculate seasonal sun position based on day of year
     */
    static calculateSeasonalSunPosition(dayOfYear: number, hour: number): THREE.Vector3 {
        // Solar declination varies throughout the year
        const declination = -23.44 * Math.cos(2 * Math.PI * (dayOfYear + 10) / 365.25);
        const declinationRad = declination * Math.PI / 180;
        
        // Hour angle for time of day
        const hourAngle = 15 * (hour - 12);
        const hourAngleRad = hourAngle * Math.PI / 180;
        
        const x = Math.cos(declinationRad) * Math.cos(hourAngleRad);
        const y = Math.sin(declinationRad);
        const z = Math.cos(declinationRad) * Math.sin(hourAngleRad);
        
        return new THREE.Vector3(x, y, z).normalize();
    }
}

export default AstronomyCalculator; 