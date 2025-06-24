<template>
  <div class="home-container">
    <!-- Navigation overlay (only for mobile) -->
    <div class="md:hidden absolute top-0 left-0 right-0 z-10">
      <Nav />
    </div>
    
    <!-- Main Planetary Simulation -->
    <PlanetarySimulation />
    
    <!-- Desktop Navigation (integrated in sidebar) -->
    <div class="hidden md:block absolute top-4 left-4 z-10">
      <div class="bg-black bg-opacity-50 rounded p-2">
        <img src="/favicon.ico" alt="MapToGlobe" class="w-8 h-8 mx-auto">
        <div class="text-white text-xs text-center mt-1">MapToGlobe</div>
      </div>
    </div>

    <!-- Demo Button -->
    <div class="absolute bottom-4 right-4 z-10">
      <button 
        @click="triggerDemo"
        class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        ✨ Quick Demo
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlanetarySimulation from '@/components/PlanetarySimulation.vue';
import Nav from '@/components/Nav.vue';

export default defineComponent({
  name: 'Home',
  components: { 
    PlanetarySimulation,
    Nav 
  },
  setup() {
    const planetarySimRef = ref();

    const triggerDemo = () => {
      if (planetarySimRef.value) {
        planetarySimRef.value.triggerDemo();
      }
    };

    return {
      planetarySimRef,
      triggerDemo
    };
  }
});
</script>

<style scoped>
.home-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* Ensure mobile nav is properly positioned */
@media (max-width: 768px) {
  .home-container {
    padding-top: 60px; /* Account for mobile nav */
  }
}
</style>