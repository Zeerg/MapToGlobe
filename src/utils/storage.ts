// Local Storage utility for MapToGlobe application state

export interface StoredMoonConfig {
    id: string;
    name: string;
    size: number;
    distance: number;
    orbitSpeed: number;
    rotationSpeed: number;
    visible: boolean;
    color?: number;
    textureData?: string; // Base64 encoded texture data
}

export interface StoredAppState {
    version: string;
    timestamp: number;
    
    // Moon System
    moonSystem: {
        moons: StoredMoonConfig[];
        customMoonCounter: number;
    };
    
    // Legacy moon
    legacyMoon: {
        visible: boolean;
        scale: number;
        distance: number;
    };
    
    // Planet settings
    planet: {
        shininess: number;
        planetType?: string;
        realTimeRotation?: boolean;
        timeScale?: number;
    };
    
    // Rings
    rings: {
        visible: boolean;
        systemType: 'saturn' | 'uranus' | 'jupiter' | 'custom';
        innerRadius: number;
        outerRadius: number;
        thickness: number;
        opacity: number;
        rotationSpeed: number;
    };
    
    // Lighting
    lighting: {
        sunIntensity: number;
        ambientIntensity: number;
    };
    
    // Background
    background: {
        type: 'black' | 'transparent' | 'custom';
    };
    
    // Atmosphere
    atmosphere: {
        enabled: boolean;
    };
    
    // Images flags
    images: {
        surface: boolean;
        clouds: boolean;
    };
}

const STORAGE_KEY = 'maptoglobe_state';
const STORAGE_VERSION = '1.0.0';

export class StorageManager {
    
    static saveState(state: Partial<StoredAppState>): boolean {
        try {
            const currentState = this.loadState();
            const newState: StoredAppState = {
                ...currentState,
                ...state,
                version: STORAGE_VERSION,
                timestamp: Date.now()
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            return true;
        } catch (error) {
            console.error('Failed to save state to localStorage:', error);
            return false;
        }
    }
    
    static loadState(): StoredAppState {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return this.getDefaultState();
            }
            
            const parsed = JSON.parse(stored);
            
            // Version check - if version mismatch, return default state
            if (parsed.version !== STORAGE_VERSION) {
                console.log('Storage version mismatch, using default state');
                return this.getDefaultState();
            }
            
            return {
                ...this.getDefaultState(),
                ...parsed
            };
        } catch (error) {
            console.error('Failed to load state from localStorage:', error);
            return this.getDefaultState();
        }
    }
    
    static clearState(): boolean {
        try {
            localStorage.removeItem(STORAGE_KEY);
            console.log('State cleared from localStorage');
            return true;
        } catch (error) {
            console.error('Failed to clear state from localStorage:', error);
            return false;
        }
    }
    
    static getDefaultState(): StoredAppState {
        return {
            version: STORAGE_VERSION,
            timestamp: Date.now(),
            
            moonSystem: {
                moons: [],
                customMoonCounter: 1
            },
            
            legacyMoon: {
                visible: false,
                scale: 1,
                distance: 3
            },
            
            planet: {
                shininess: 60,
                planetType: 'earth',
                realTimeRotation: false,
                timeScale: 1
            },
            
            rings: {
                visible: false,
                systemType: 'saturn',
                innerRadius: 3,
                outerRadius: 5,
                thickness: 2,
                opacity: 0.8,
                rotationSpeed: 0.5
            },
            
            lighting: {
                sunIntensity: 0.4,
                ambientIntensity: 0.6
            },
            
            background: {
                type: 'black'
            },
            
            atmosphere: {
                enabled: false
            },
            
            images: {
                surface: false,
                clouds: false
            }
        };
    }
    
    static hasStoredData(): boolean {
        return localStorage.getItem(STORAGE_KEY) !== null;
    }
    
    static getStorageInfo(): { size: number; timestamp?: number } {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return { size: 0 };
            
            const parsed = JSON.parse(stored);
            return {
                size: new Blob([stored]).size,
                timestamp: parsed.timestamp
            };
        } catch (error) {
            return { size: 0 };
        }
    }
    
    // Utility to convert File to base64 for storage
    static fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    // Utility to convert base64 back to File
    static base64ToFile(base64: string, filename: string): File {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
} 