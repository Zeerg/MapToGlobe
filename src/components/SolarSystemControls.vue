<template>
  <div class="solar-system-controls bg-gray-900 text-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4 text-center">🪐 Solar System Controls</h2>
    
    <!-- Mode Toggle -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Mode</h3>
      <div class="flex gap-2">
        <button 
          @click="setMode('single')"
          :class="[
            'px-4 py-2 rounded transition-colors',
            currentMode === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
          ]"
        >
          🌍 Single Planet
        </button>
        <button 
          @click="setMode('solar-system')"
          :class="[
            'px-4 py-2 rounded transition-colors',
            currentMode === 'solar-system' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
          ]"
        >
          🌌 Solar System
        </button>
      </div>
    </div>

    <!-- Solar System Presets -->
    <div v-if="currentMode === 'solar-system'" class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Quick Presets</h3>
      <div class="grid grid-cols-2 gap-2">
        <button 
          @click="createPreset('mini')"
          class="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors text-sm"
        >
          🌟 Mini Solar System
        </button>
        <button 
          @click="createPreset('earth-moon')"
          class="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm"
        >
          🌍 Earth & Moon
        </button>
        <button 
          @click="createPreset('jupiter')"
          class="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded transition-colors text-sm"
        >
          🪐 Jupiter System
        </button>
        <button 
          @click="createPreset('saturn')"
          class="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors text-sm"
        >
          💍 Saturn with Rings
        </button>
      </div>
    </div>

    <!-- Custom Planet Creator -->
    <div v-if="currentMode === 'solar-system'" class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Add Custom Planet</h3>
      
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium mb-1">Planet Name</label>
          <input 
            v-model="newPlanet.name"
            type="text"
            class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
            placeholder="e.g., Tatooine"
          >
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium mb-1">Texture</label>
            <select 
              v-model="newPlanet.texture"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded focus:border-blue-500 focus:outline-none"
            >
              <option value="earth">Earth</option>
              <option value="mars">Mars</option>
              <option value="jupiter">Jupiter</option>
              <option value="venus">Venus</option>
              <option value="mercury">Mercury</option>
              <option value="pluto">Pluto</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Size</label>
            <input 
              v-model.number="newPlanet.size"
              type="range"
              min="0.3"
              max="3"
              step="0.1"
              class="w-full"
            >
            <span class="text-xs text-gray-400">{{ newPlanet.size }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium mb-1">Orbit Distance</label>
            <input 
              v-model.number="newPlanet.orbitRadius"
              type="range"
              min="5"
              max="50"
              step="1"
              class="w-full"
            >
            <span class="text-xs text-gray-400">{{ newPlanet.orbitRadius }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Orbit Speed</label>
            <input 
              v-model.number="newPlanet.orbitSpeed"
              type="range"
              min="0.001"
              max="0.02"
              step="0.001"
              class="w-full"
            >
            <span class="text-xs text-gray-400">{{ newPlanet.orbitSpeed.toFixed(3) }}</span>
          </div>
        </div>

        <!-- Rings Toggle -->
        <div class="flex items-center gap-2">
          <input 
            v-model="newPlanet.hasRings"
            type="checkbox"
            id="hasRings"
            class="rounded"
          >
          <label for="hasRings" class="text-sm">Add Planetary Rings</label>
        </div>

        <!-- Moon Creator -->
        <div class="border-t border-gray-600 pt-3">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium">Moons ({{ newPlanet.moons.length }})</label>
            <button 
              @click="addMoon"
              class="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
            >
              + Add Moon
            </button>
          </div>

          <div v-for="(moon, index) in newPlanet.moons" :key="index" class="bg-gray-800 p-2 rounded mb-2">
            <div class="flex items-center justify-between mb-1">
              <input 
                v-model="moon.name"
                type="text"
                placeholder="Moon name"
                class="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs mr-2"
              >
              <button 
                @click="removeMoon(index)"
                class="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
              >
                ×
              </button>
            </div>
            <div class="grid grid-cols-3 gap-1">
              <div>
                <label class="text-xs text-gray-400">Size</label>
                <input 
                  v-model.number="moon.size"
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.01"
                  class="w-full"
                >
                <span class="text-xs text-gray-400">{{ moon.size }}</span>
              </div>
              <div>
                <label class="text-xs text-gray-400">Distance</label>
                <input 
                  v-model.number="moon.orbitRadius"
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  class="w-full"
                >
                <span class="text-xs text-gray-400">{{ moon.orbitRadius }}</span>
              </div>
              <div>
                <label class="text-xs text-gray-400">Speed</label>
                <input 
                  v-model.number="moon.orbitSpeed"
                  type="range"
                  min="0.01"
                  max="0.15"
                  step="0.01"
                  class="w-full"
                >
                <span class="text-xs text-gray-400">{{ moon.orbitSpeed.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          @click="addCustomPlanet"
          :disabled="!newPlanet.name"
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors"
        >
          🚀 Add Planet to Solar System
        </button>
      </div>
    </div>

    <!-- Current Solar System Info -->
    <div v-if="currentMode === 'solar-system' && solarSystemInfo.planetCount > 0" class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Current Solar System</h3>
      <div class="bg-gray-800 p-3 rounded">
        <p class="text-sm mb-2">
          <strong>{{ solarSystemInfo.planetCount }}</strong> Planet{{ solarSystemInfo.planetCount !== 1 ? 's' : '' }}
        </p>
        <div class="space-y-1">
          <div 
            v-for="planet in solarSystemInfo.planets" 
            :key="planet.name"
            class="text-xs bg-gray-700 p-2 rounded flex justify-between items-center"
          >
            <span>
              🪐 {{ planet.name }} 
              ({{ planet.moonCount }} moon{{ planet.moonCount !== 1 ? 's' : '' }}
              {{ planet.hasRings ? ', rings' : '' }})
            </span>
          </div>
        </div>
        <button 
          @click="clearSolarSystem"
          class="w-full mt-3 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
        >
          🗑️ Clear Solar System
        </button>
      </div>
    </div>

    <!-- Animation Controls -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Animation Controls</h3>
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <input 
            v-model="realTimeRotation"
            type="checkbox"
            id="realTime"
            class="rounded"
            @change="toggleRealTimeRotation"
          >
          <label for="realTime" class="text-sm">Real-time Rotation</label>
        </div>

        <div v-if="realTimeRotation">
          <label class="block text-sm font-medium mb-1">Time Scale</label>
          <input 
            v-model.number="timeScale"
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            class="w-full"
            @input="updateTimeScale"
          >
          <span class="text-xs text-gray-400">{{ timeScale }}x speed</span>
        </div>
      </div>
    </div>

    <!-- Info Panel -->
    <div class="bg-gray-800 p-3 rounded">
      <h4 class="font-semibold mb-2">ℹ️ Tips</h4>
      <ul class="text-xs space-y-1 text-gray-300">
        <li>• Use mouse wheel to zoom in/out</li>
        <li>• Click and drag to rotate the view</li>
        <li v-if="currentMode === 'solar-system'">• Planets orbit around the central sun</li>
        <li v-if="currentMode === 'solar-system'">• Moons orbit around their parent planets</li>
        <li>• Toggle real-time rotation for dynamic movement</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'SolarSystemControls',
  emits: ['mode-change', 'create-preset', 'add-planet', 'clear-system', 'toggle-rotation', 'time-scale-change'],
  setup(props, { emit }) {
    const currentMode = ref<'single' | 'solar-system'>('single');
    const realTimeRotation = ref(false);
    const timeScale = ref(1);
    
    const solarSystemInfo = reactive({
      planetCount: 0,
      planets: [] as Array<{
        name: string;
        moonCount: number;
        hasRings: boolean;
      }>
    });

    const newPlanet = reactive({
      name: '',
      texture: 'earth',
      size: 1,
      orbitRadius: 15,
      orbitSpeed: 0.008,
      hasRings: false,
      moons: [] as Array<{
        name: string;
        size: number;
        orbitRadius: number;
        orbitSpeed: number;
      }>
    });

    const setMode = (mode: 'single' | 'solar-system') => {
      currentMode.value = mode;
      emit('mode-change', mode);
    };

    const createPreset = (type: string) => {
      emit('create-preset', type);
    };

    const addMoon = () => {
      newPlanet.moons.push({
        name: `Moon ${newPlanet.moons.length + 1}`,
        size: 0.2,
        orbitRadius: 3 + newPlanet.moons.length,
        orbitSpeed: 0.05 - (newPlanet.moons.length * 0.01)
      });
    };

    const removeMoon = (index: number) => {
      newPlanet.moons.splice(index, 1);
    };

    const addCustomPlanet = () => {
      if (!newPlanet.name) return;

      const planetConfig = {
        name: newPlanet.name,
        texture: newPlanet.texture,
        size: newPlanet.size,
        orbitRadius: newPlanet.orbitRadius,
        orbitSpeed: newPlanet.orbitSpeed,
        rotationSpeed: 0.001,
        moons: [...newPlanet.moons],
        hasRings: newPlanet.hasRings,
        ...(newPlanet.hasRings && {
          ringConfig: {
            innerRadius: 2.5,
            outerRadius: 4,
            opacity: 0.7
          }
        })
      };

      emit('add-planet', planetConfig);

      // Reset form
      newPlanet.name = '';
      newPlanet.texture = 'earth';
      newPlanet.size = 1;
      newPlanet.orbitRadius = 15;
      newPlanet.orbitSpeed = 0.008;
      newPlanet.hasRings = false;
      newPlanet.moons = [];
    };

    const clearSolarSystem = () => {
      emit('clear-system');
      solarSystemInfo.planetCount = 0;
      solarSystemInfo.planets = [];
    };

    const toggleRealTimeRotation = () => {
      emit('toggle-rotation', realTimeRotation.value);
    };

    const updateTimeScale = () => {
      emit('time-scale-change', timeScale.value);
    };

    const updateSolarSystemInfo = (info: any) => {
      if (info && info.planetCount !== undefined) {
        solarSystemInfo.planetCount = info.planetCount;
        solarSystemInfo.planets = info.planets || [];
      }
    };

    // Expose method for parent component to update info
    const setCurrentMode = (mode: 'single' | 'solar-system') => {
      currentMode.value = mode;
    };

    const setSolarSystemInfo = (info: any) => {
      updateSolarSystemInfo(info);
    };

    return {
      currentMode,
      realTimeRotation,
      timeScale,
      solarSystemInfo,
      newPlanet,
      setMode,
      createPreset,
      addMoon,
      removeMoon,
      addCustomPlanet,
      clearSolarSystem,
      toggleRealTimeRotation,
      updateTimeScale,
      setCurrentMode,
      setSolarSystemInfo
    };
  }
});
</script>

<style scoped>
/* Add any custom styles if needed */
input[type="range"] {
  accent-color: #3b82f6;
}

input[type="checkbox"] {
  accent-color: #3b82f6;
}
</style>