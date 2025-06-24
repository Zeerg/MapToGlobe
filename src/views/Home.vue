<template>
  <div class="block md:grid relative overflow-hidden" id="container">
    <Nav class="hidden md:block" />
    <div class="relative">
      <Scene />
    </div>
  </div>
</template>

<script lang="ts">
import Scene from '@/components/Scene.vue'; // @ is an alias to /src
import Nav from '@/components/Nav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Scene, Nav }
})
</script>