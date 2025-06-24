<template>
    <canvas id="scene" class="w-full h-screen relative z-0"></canvas>
</template>

<script lang="ts">
export default {
  
}
</script>

<style scoped>
#scene {
    display: block;
    width: 100% !important;
    height: 100% !important;
    max-width: 100%;
    max-height: 100vh;
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}
</style>