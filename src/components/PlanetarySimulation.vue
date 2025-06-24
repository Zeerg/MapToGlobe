<template>
  <div class="planetary-simulation flex h-screen">
    <!-- 3D Scene Container -->
    <div class="flex-1 relative">
      <canvas 
        ref="sceneCanvas" 
        id="scene" 
        class="w-full h-full bg-black"
      ></canvas>
      
      <!-- Scene Loading Indicator -->
      <div 
        v-if="isLoading" 
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="text-white text-xl">
          🚀 Initializing Solar System...
        </div>
      </div>

      <!-- Quick Action Buttons (Overlay) -->
      <div class="absolute top-4 left-4 flex gap-2">
        <button 
          @click="takeScreenshot"
          class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-lg transition-colors"
          title="Take Screenshot"
        >
          📸
        </button>
        <button 
          @click="createGif"
          class="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-lg transition-colors"
          title="Create Rotating GIF"
        >
          🎬
        </button>
        <button 
          @click="toggleBackground"
          class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded shadow-lg transition-colors"
          title="Toggle Background"
        >
          🌌
        </button>
      </div>

      <!-- Mode Indicator -->
      <div class="absolute top-4 right-4 px-3 py-2 bg-black bg-opacity-70 text-white rounded">
        {{ mapToGlobe?.GetCurrentMode() === 'solar-system' ? '🌌 Solar System Mode' : '🌍 Single Planet Mode' }}
      </div>
    </div>

    <!-- Controls Panel -->
    <div class="w-96 bg-gray-900 overflow-y-auto">
      <SolarSystemControls 
        ref="controlsRef"
        @mode-change="handleModeChange"
        @create-preset="handleCreatePreset"
        @add-planet="handleAddPlanet"
        @clear-system="handleClearSystem"
        @toggle-rotation="handleToggleRotation"
        @time-scale-change="handleTimeScaleChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue';
import SolarSystemControls from './SolarSystemControls.vue';
import MapToGlobe from '../assets/MapToGlobe/MapToGlobe';

export default defineComponent({
  name: 'PlanetarySimulation',
  components: {
    SolarSystemControls
  },
  setup() {
    const sceneCanvas = ref<HTMLCanvasElement>();
    const controlsRef = ref();
    const mapToGlobe = ref<MapToGlobe>();
    const isLoading = ref(true);
    const backgroundMode = ref(0); // 0: black, 1: transparent, 2: starfield

    onMounted(async () => {
      await nextTick();
      await initializeScene();
    });

    onUnmounted(() => {
      if (mapToGlobe.value) {
        mapToGlobe.value.StopAnimation();
      }
    });

    const initializeScene = async () => {
      try {
        if (sceneCanvas.value) {
          mapToGlobe.value = new MapToGlobe(sceneCanvas.value);
          
          // Give it a moment to initialize
          setTimeout(() => {
            isLoading.value = false;
            updateControlsInfo();
          }, 1000);
        }
      } catch (error) {
        console.error('Failed to initialize scene:', error);
        isLoading.value = false;
      }
    };

    const updateControlsInfo = () => {
      if (mapToGlobe.value && controlsRef.value) {
        const mode = mapToGlobe.value.GetCurrentMode();
        const info = mapToGlobe.value.GetPlanetInfo();
        
        controlsRef.value.setCurrentMode(mode);
        if (mode === 'solar-system') {
          controlsRef.value.setSolarSystemInfo(info);
        }
      }
    };

    const handleModeChange = (mode: 'single' | 'solar-system') => {
      if (!mapToGlobe.value) return;

      if (mode === 'single') {
        mapToGlobe.value.EnableSinglePlanetMode();
      } else {
        mapToGlobe.value.EnableSolarSystemMode();
      }
      
      setTimeout(updateControlsInfo, 100);
    };

    const handleCreatePreset = (type: string) => {
      if (!mapToGlobe.value) return;

      mapToGlobe.value.CreateSolarSystem(type as any);
      setTimeout(updateControlsInfo, 100);
    };

    const handleAddPlanet = (config: any) => {
      if (!mapToGlobe.value) return;

      mapToGlobe.value.AddPlanetToSolarSystem(config);
      setTimeout(updateControlsInfo, 100);
    };

    const handleClearSystem = () => {
      if (!mapToGlobe.value) return;

      mapToGlobe.value.ClearSolarSystem();
      setTimeout(updateControlsInfo, 100);
    };

    const handleToggleRotation = (enabled: boolean) => {
      if (!mapToGlobe.value) return;

      mapToGlobe.value.EnableRealTimeRotation(enabled);
    };

    const handleTimeScaleChange = (scale: number) => {
      if (!mapToGlobe.value) return;

      mapToGlobe.value.SetTimeScale(scale);
    };

    const takeScreenshot = () => {
      if (mapToGlobe.value && sceneCanvas.value) {
        mapToGlobe.value.Screenshot(sceneCanvas.value as any);
      }
    };

    const createGif = () => {
      if (mapToGlobe.value && sceneCanvas.value) {
        mapToGlobe.value.Gif(sceneCanvas.value as any);
      }
    };

    const toggleBackground = () => {
      if (!mapToGlobe.value) return;

      backgroundMode.value = (backgroundMode.value + 1) % 3;
      
      switch (backgroundMode.value) {
        case 0:
          mapToGlobe.value.SetBGBlack();
          break;
        case 1:
          mapToGlobe.value.SetBGTransparent();
          break;
        case 2:
          // Could add starfield background here
          mapToGlobe.value.SetBGBlack();
          break;
      }
    };

    // Demo function to showcase the new features
    const startDemo = () => {
      if (!mapToGlobe.value) return;

      // Create a mini solar system
      mapToGlobe.value.CreateSolarSystem('mini');
      
      // Enable real-time rotation
      setTimeout(() => {
        mapToGlobe.value?.EnableRealTimeRotation(true);
        mapToGlobe.value?.SetTimeScale(2);
      }, 1000);

      updateControlsInfo();
    };

    // Expose demo function for external use
    const triggerDemo = () => {
      startDemo();
    };

    return {
      sceneCanvas,
      controlsRef,
      mapToGlobe,
      isLoading,
      backgroundMode,
      handleModeChange,
      handleCreatePreset,
      handleAddPlanet,
      handleClearSystem,
      handleToggleRotation,
      handleTimeScaleChange,
      takeScreenshot,
      createGif,
      toggleBackground,
      triggerDemo
    };
  }
});
</script>

<style scoped>
.planetary-simulation {
  font-family: 'Inter', sans-serif;
}

canvas {
  display: block;
}

/* Ensure controls panel scrolls properly */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #4a5568 #2d3748;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #2d3748;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>