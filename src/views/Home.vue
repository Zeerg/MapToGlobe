<template>
  <div class="h-screen w-full relative overflow-hidden bg-transparent" id="container" style="position: fixed; top: 0; left: 0;">
    <Nav class="hidden md:block fixed left-0 top-0 w-64 z-20" />
    <div class="relative md:ml-64 z-0 h-full w-full" style="position: absolute; top: 0; bottom: 0; right: 0;">
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