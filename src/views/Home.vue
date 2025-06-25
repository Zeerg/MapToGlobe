<template>
  <div class="h-screen w-full relative overflow-hidden bg-transparent" id="container" style="position: fixed; top: 0; left: 0;">
    <Nav class="hidden md:block" @nav-toggle="handleNavToggle" />
    <div class="relative z-0 h-full w-full transition-all duration-300" 
         :class="{ 'md:ml-80': navVisible, 'md:ml-0': !navVisible }"
         style="position: absolute; top: 0; bottom: 0; right: 0;">
      <Scene />
    </div>
  </div>
</template>

<script lang="ts">
import Scene from '@/components/Scene.vue'; // @ is an alias to /src
import Nav from '@/components/Nav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Scene, Nav },
  data() {
    return {
      navVisible: true
    }
  },
  methods: {
    handleNavToggle(visible: boolean) {
      this.navVisible = visible;
    }
  },
  mounted() {
    // Prevent any document-level layout shifts when canvas becomes transparent
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
  },
  beforeUnmount() {
    // Restore normal scrolling when component is destroyed
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.height = '';
    document.documentElement.style.height = '';
  }
})
</script>