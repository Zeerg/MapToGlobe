<template>
    <div v-bind="$attrs">
        <!-- Toggle button for the navigation panel -->
        <button @click="toggleNavPanel" 
                class="fixed top-4 left-4 z-40 p-2 bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-lg shadow-lg transition-all duration-200 backdrop-blur"
                :class="{ 'left-80': navPanelVisible, 'left-4': !navPanelVisible }">
            <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': navPanelVisible }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </button>

        <div class="h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-y-auto shadow-2xl border-r border-gray-800 relative z-30 nav-container"
             :class="{ 'transform -translate-x-full': !navPanelVisible }">
        <Loader v-if="loading" class="absolute w-full h-full inset-0" :message="loader.message" />
        
        <!-- Header -->
        <div class="flex flex-col items-center justify-center">
            <div class="text-sm text-blue-300 mt-0 px-6 py-4 text-center bg-gradient-to-r from-gray-900 to-black border-b border-gray-700 w-full">
                <div class="flex items-center justify-center">
                    <div class="relative">
                        <svg class="w-10 h-10 text-blue-400 animate-spin mr-3" style="animation-duration: 20s;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <!-- Planet body -->
                            <defs>
                                <radialGradient id="planetGradientHeader" cx="30%" cy="30%">
                                    <stop offset="0%" style="stop-color:#60A5FA"/>
                                    <stop offset="70%" style="stop-color:#3B82F6"/>
                                    <stop offset="100%" style="stop-color:#1E40AF"/>
                                </radialGradient>
                            </defs>
                            <circle cx="50" cy="50" r="45" fill="url(#planetGradientHeader)" stroke="#1E40AF" stroke-width="1"/>
                            
                            <!-- Continents -->
                            <path d="M25 35 Q35 25 45 35 Q55 40 65 35 Q75 30 85 40 L85 45 Q75 50 65 45 Q55 50 45 45 Q35 55 25 45 Z" fill="#1E40AF" opacity="0.8"/>
                            <path d="M15 55 Q25 50 35 60 Q45 65 55 60 L55 70 Q45 75 35 70 Q25 80 15 70 Z" fill="#1E40AF" opacity="0.8"/>
                            <ellipse cx="70" cy="65" rx="12" ry="8" fill="#1E40AF" opacity="0.8"/>
                            
                            <!-- Atmosphere glow -->
                            <circle cx="50" cy="50" r="47" fill="none" stroke="#60A5FA" stroke-width="1" opacity="0.3"/>
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold text-white">MapToGlobe</h1>
                    </div>
                </div>
            </div>
        </div>

        <nav class="mt-6 select-none px-4">
            <!-- Objects Section -->
            <div class="mb-6">
                <button @click="menu.open.objects = !menu.open.objects" 
                        class="w-full flex justify-between items-center py-2 px-2 text-gray-400 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-800/30 focus:outline-none rounded-lg transition-all duration-200 group">
                    <span class="flex items-center">
                        <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Objects
                    </span>
                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.objects }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                
                <div v-show="menu.open.objects" class="mt-3">
                <!-- Planet -->
                <div class="mb-4">
                    <button @click="menu.open.planet = !menu.open.planet" 
                            class="w-full flex justify-between items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group">
                        <span class="flex items-center">
                            <div class="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                                <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span class="font-medium">Planet</span>
                        </span>
                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planet }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>

                    <div v-show="menu.open.planet" class="bg-gray-900/50 rounded-lg mt-2 overflow-hidden">
                        <!-- Planet Subsections -->
                        <div class="space-y-3 p-3">
                            
                            <!-- Textures Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.planetTextures = !menu.open.planetTextures" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                        </svg>
                                        Textures
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planetTextures }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.planetTextures" class="p-3 bg-gray-800/30 space-y-2">
                                    <div>
                                        <input type="file" class="hidden" id="surfaceFileSelect" accept="image/*" @change="setSurfaceImage">
                                        <label for="surfaceFileSelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors">
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                </svg>
                                                Surface Texture
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input type="file" class="hidden" id="heightmapFileSelect" accept="image/*" @change="setHeightmapImage" :disabled="!images.surface">
                                        <label for="heightmapFileSelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors" :class="{ 'opacity-50 cursor-not-allowed': !images.surface }">
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                </svg>
                                                Height Map
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <input type="file" class="hidden" id="specularFileSelect" accept="image/*" @change="setSpecularImage" :disabled="!images.surface">
                                        <label for="specularFileSelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors" :class="{ 'opacity-50 cursor-not-allowed': !images.surface }">
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                Specular Map
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            
                            <!-- Appearance Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.planetAppearance = !menu.open.planetAppearance" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
                                            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5a.75.75 0 001.5 0v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                                        </svg>
                                        Appearance
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planetAppearance }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.planetAppearance" class="p-3 bg-gray-800/30 space-y-3">
                                    <div>
                                        <label class="block text-xs text-gray-400 mb-2">Shininess: {{ menu.planet.shininess.toFixed(0) }}</label>
                                        <vue-slider v-model="menu.planet.shininess" :min="0" :max="100" :interval="0.1" :tooltip="'none'" @change="planetShininess"></vue-slider>
                                    </div>
                                </div>
                            </div>

                            <!-- Motion Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.planetMotion = !menu.open.planetMotion" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Motion
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planetMotion }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.planetMotion" class="p-3 bg-gray-800/30 space-y-3">
                                    <div>
                                        <label class="block text-xs text-gray-400 mb-2">
                                            Rotation Speed: {{ menu.planet.rotationSpeed.toFixed(1) }}
                                            <span class="text-gray-500">({{ getRotationSpeedDescription(menu.planet.rotationSpeed) }})</span>
                                        </label>
                                        <vue-slider v-model="menu.planet.rotationSpeed" :min="0" :max="5" :interval="0.1" :tooltip="'none'" @change="setPlanetRotationSpeed"></vue-slider>
                                    </div>
                                </div>
                            </div>

                            <!-- Shape Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.planetShape = !menu.open.planetShape" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Shape
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planetShape }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.planetShape" class="p-3 bg-gray-800/30 space-y-3">
                                    <div>
                                        <label class="block text-xs text-gray-400 mb-2">
                                            Width: {{ menu.planet.shape.scaleX.toFixed(2) }}
                                            <span class="text-gray-500">({{ getShapeDescription('width', menu.planet.shape.scaleX) }})</span>
                                        </label>
                                        <vue-slider v-model="menu.planet.shape.scaleX" :min="0.3" :max="2.0" :interval="0.05" :tooltip="'none'" @change="updatePlanetShape"></vue-slider>
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-400 mb-2">
                                            Height: {{ menu.planet.shape.scaleY.toFixed(2) }}
                                            <span class="text-gray-500">({{ getShapeDescription('height', menu.planet.shape.scaleY) }})</span>
                                        </label>
                                        <vue-slider v-model="menu.planet.shape.scaleY" :min="0.3" :max="2.0" :interval="0.05" :tooltip="'none'" @change="updatePlanetShape"></vue-slider>
                                    </div>
                                    <div>
                                        <label class="block text-xs text-gray-400 mb-2">
                                            Depth: {{ menu.planet.shape.scaleZ.toFixed(2) }}
                                            <span class="text-gray-500">({{ getShapeDescription('depth', menu.planet.shape.scaleZ) }})</span>
                                        </label>
                                        <vue-slider v-model="menu.planet.shape.scaleZ" :min="0.3" :max="2.0" :interval="0.05" :tooltip="'none'" @change="updatePlanetShape"></vue-slider>
                                    </div>
                                    <button @click="resetPlanetShape" 
                                            class="w-full py-2 px-3 text-xs text-gray-200 bg-blue-500/20 hover:bg-blue-500/30 rounded transition-colors">
                                        Reset to Sphere
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Clouds Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.planetClouds = !menu.open.planetClouds" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                        </svg>
                                        Clouds
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planetClouds }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.planetClouds" class="p-3 bg-gray-800/30 space-y-3">
                                    <!-- Cloud Texture Upload -->
                                    <div>
                                        <input type="file" class="hidden" id="cloudsFileSelect" accept="image/*" @change="setCloudsImage">
                                        <label for="cloudsFileSelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors bg-gray-700/30 border border-gray-600">
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                                </svg>
                                                {{ images.clouds ? 'Change Cloud Texture' : 'Load Cloud Texture' }}
                                            </span>
                                        </label>
                                    </div>
                                    
                                    <!-- Cloud Opacity -->
                                    <div :class="{ 'opacity-50': !images.clouds }">
                                        <label class="block text-xs text-gray-400 mb-2">
                                            Cloud Opacity: {{ menu.clouds.opacity.toFixed(2) }}
                                            <span class="text-gray-500">({{ getCloudOpacityDescription(menu.clouds.opacity) }})</span>
                                        </label>
                                        <vue-slider v-model="menu.clouds.opacity" :min="0" :max="1" :interval="0.01" :tooltip="'none'" @change="setCloudOpacity" :disabled="!images.clouds"></vue-slider>
                                    </div>
                                    
                                    <!-- Cloud Controls Toggle -->
                                    <div class="flex items-center justify-between" :class="{ 'opacity-50': !images.clouds }">
                                        <label class="text-sm font-medium text-gray-200">3D Cloud Controls</label>
                                        <div class="relative">
                                            <input type="checkbox" class="sr-only" id="cloudControlsToggle" @change="toggleControls" value="clouds" :disabled="!images.clouds">
                                            <label for="cloudControlsToggle" class="flex items-center cursor-pointer" :class="{ 'cursor-not-allowed': !images.clouds }">
                                                <div class="relative">
                                                    <div class="block bg-gray-700 w-12 h-6 rounded-full"></div>
                                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{ 'transform translate-x-6': cloudControlsVisible }"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <p v-if="!images.clouds" class="text-xs text-gray-500 italic">Load a cloud texture to enable all cloud controls</p>
                                </div>
                            </div>

                            <!-- Visual Helpers Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.planetHelpers = !menu.open.planetHelpers" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Controls
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.planetHelpers }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.planetHelpers" class="p-3 bg-gray-800/30 space-y-3">
                                    <div class="flex items-center justify-between">
                                        <label class="text-sm font-medium text-gray-200">Show Axis</label>
                                        <div class="relative">
                                            <input type="checkbox" class="sr-only" id="axisToggle" @change="toggleAxis">
                                            <label for="axisToggle" class="flex items-center cursor-pointer">
                                                <div class="relative">
                                                    <div class="block bg-gray-700 w-12 h-6 rounded-full"></div>
                                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{ 'transform translate-x-6': axisVisible }"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <label class="text-sm font-medium text-gray-200">Planet Controls</label>
                                        <div class="relative">
                                            <input type="checkbox" class="sr-only" id="planetControlsToggle" @change="toggleControls" value="planet">
                                            <label for="planetControlsToggle" class="flex items-center cursor-pointer">
                                                <div class="relative">
                                                    <div class="block bg-gray-700 w-12 h-6 rounded-full"></div>
                                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{ 'transform translate-x-6': planetControlsVisible }"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Multi-Moon System -->
                <div class="mb-4">
                    <button @click="menu.open.moon = !menu.open.moon" 
                            class="w-full flex justify-between items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group">
                        <span class="flex items-center">
                            <div class="p-2 bg-purple-500/20 rounded-lg mr-3 group-hover:bg-purple-500/30 transition-colors">
                                <svg class="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <span class="font-medium">Moon System</span>
                            <span v-if="moonSystemInfo.visibleMoons > 0" class="ml-2 px-2 py-1 bg-purple-500/30 text-purple-300 text-xs rounded-full">
                                {{ moonSystemInfo.visibleMoons }}
                            </span>
                        </span>
                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.open.moon }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>

                    <div v-show="menu.open.moon" class="bg-gray-900/50 rounded-lg mt-2 overflow-hidden">
                        <!-- Moon Subsections -->
                        <div class="space-y-3 p-3">
                            
                            <!-- Legacy Moon Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.moonLegacy = !menu.open.moonLegacy" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        Legacy Moon
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.moonLegacy }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.moonLegacy" class="p-3 bg-gray-800/30 space-y-3">
                                    <div class="flex items-center justify-between">
                                        <label class="text-sm font-medium text-gray-200">Show Legacy Moon</label>
                                        <div class="relative">
                                            <input type="checkbox" class="sr-only" id="moonToggle" @change="toggleMoon">
                                            <label for="moonToggle" class="flex items-center cursor-pointer">
                                                <div class="relative">
                                                    <div class="block bg-gray-700 w-12 h-6 rounded-full"></div>
                                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{ 'transform translate-x-6': moonIsVisible }"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <!-- Legacy Moon Controls (only show when moon is visible) -->
                                    <div v-if="moonIsVisible" class="space-y-3 pl-2 border-l-2 border-purple-500/30">
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">
                                                Size: {{ menu.moon.scale.toFixed(2) }}
                                                <span class="text-gray-500">({{ getMoonSizeDescription(menu.moon.scale) }})</span>
                                            </label>
                                            <vue-slider v-model="menu.moon.scale" :min="0.1" :max="3.0" :interval="0.1" :tooltip="'none'" @change="moonScale"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">
                                                Distance: {{ menu.moon.distance.toFixed(1) }}
                                                <span class="text-gray-500">({{ getMoonDistanceDescription(menu.moon.distance) }})</span>
                                            </label>
                                            <vue-slider v-model="menu.moon.distance" :min="1.5" :max="20" :interval="0.5" :tooltip="'none'" @change="moonDistance"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">
                                                Rotation Speed: {{ menu.moon.rotationSpeed.toFixed(1) }}
                                                <span class="text-gray-500">({{ getRotationSpeedDescription(menu.moon.rotationSpeed) }})</span>
                                            </label>
                                            <vue-slider v-model="menu.moon.rotationSpeed" :min="0.0" :max="5.0" :interval="0.1" :tooltip="'none'" @change="moonRotationSpeed"></vue-slider>
                                        </div>
                                        
                                        <!-- Legacy Moon Texture -->
                                        <div>
                                            <input type="file" class="hidden" id="legacyMoonFileSelect" accept="image/*" @change="setLegacyMoonImage">
                                            <label for="legacyMoonFileSelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors bg-gray-700/30 border border-gray-600">
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                    </svg>
                                                    Load Moon Texture
                                                </span>
                                            </label>
                                        </div>
                                        
                                        <!-- Legacy Moon Color -->
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">Moon Color</label>
                                            <div class="flex items-center space-x-2">
                                                <input 
                                                    type="color" 
                                                    v-model="menu.moon.color" 
                                                    @change="updateLegacyMoonColor"
                                                    class="w-12 h-8 rounded border border-gray-600 bg-gray-700 cursor-pointer"
                                                    title="Select moon color"
                                                />
                                                <span class="text-xs text-gray-400">{{ menu.moon.color }}</span>
                                                <button 
                                                    @click="resetLegacyMoonColor" 
                                                    class="px-2 py-1 text-xs text-gray-300 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                                                    title="Reset to default">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Presets Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.moonPresets = !menu.open.moonPresets" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                        System Presets
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.moonPresets }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.moonPresets" class="p-3 bg-gray-800/30">
                                    <div class="grid grid-cols-2 gap-2">
                                        <button @click="loadMoonPreset('earth')" 
                                                class="py-2 px-3 text-xs text-gray-200 bg-blue-500/20 hover:bg-blue-500/30 rounded transition-colors">
                                            🌍 Earth
                                        </button>
                                        <button @click="loadMoonPreset('jupiter')" 
                                                class="py-2 px-3 text-xs text-gray-200 bg-orange-500/20 hover:bg-orange-500/30 rounded transition-colors">
                                            🪐 Jupiter
                                        </button>
                                        <button @click="loadMoonPreset('saturn')" 
                                                class="py-2 px-3 text-xs text-gray-200 bg-yellow-500/20 hover:bg-yellow-500/30 rounded transition-colors">
                                            🪐 Saturn
                                        </button>
                                        <button @click="loadMoonPreset('custom')" 
                                                class="py-2 px-3 text-xs text-gray-200 bg-purple-500/20 hover:bg-purple-500/30 rounded transition-colors">
                                            ✨ Custom
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- System Management Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.moonManagement = !menu.open.moonManagement" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        System Management
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.moonManagement }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.moonManagement" class="p-3 bg-gray-800/30 space-y-3">
                                    <div class="flex gap-2">
                                        <button @click="showAllMoons" 
                                                class="flex-1 py-2 px-3 text-xs text-gray-200 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors">
                                            Show All
                                        </button>
                                        <button @click="hideAllMoons" 
                                                class="flex-1 py-2 px-3 text-xs text-gray-200 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors">
                                            Hide All
                                        </button>
                                    </div>
                                    <div class="flex gap-2">
                                        <button @click="clearMoonSystem" 
                                                class="flex-1 py-2 px-3 text-xs text-gray-200 bg-gray-500/20 hover:bg-gray-500/30 rounded transition-colors">
                                            Clear System
                                        </button>
                                        <button @click="addCustomMoon" 
                                                class="flex-1 py-2 px-3 text-xs text-gray-200 bg-purple-500/20 hover:bg-purple-500/30 rounded transition-colors">
                                            Add Moon
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Individual Moons Subsection -->
                            <div v-if="moonSystemInfo.totalMoons > 0" class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.moonIndividual = !menu.open.moonIndividual" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Individual Moons ({{ moonSystemInfo.visibleMoons }}/{{ moonSystemInfo.totalMoons }})
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.moonIndividual }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.moonIndividual" class="p-3 bg-gray-800/30 space-y-3">
                                    <p class="text-xs text-gray-400 italic">Double-click moon names to rename or use the Rename button</p>
                                    <div v-for="moon in moonSystemInfo.moons" :key="moon.id" 
                                         class="bg-gray-700/50 rounded-lg p-3 space-y-2">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center flex-1 mr-2">
                                                <input v-if="editingMoonName === moon.id"
                                                       v-model="editingMoonNameValue"
                                                       @keyup.enter="saveMoonName(moon.id)"
                                                       @keyup.escape="cancelEditMoonName"
                                                       @blur="saveMoonName(moon.id)"
                                                       class="text-sm font-medium bg-gray-600 text-gray-200 px-2 py-1 rounded border border-gray-500 focus:border-purple-400 focus:outline-none"
                                                       :ref="`moonNameInput_${moon.id}`">
                                                <span v-else 
                                                      @dblclick="startEditMoonName(moon.id, moon.name)"
                                                      class="text-sm font-medium text-gray-200 cursor-pointer hover:text-purple-300 transition-colors">
                                                    {{ moon.name }}
                                                </span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <button v-if="editingMoonName !== moon.id"
                                                        @click="startEditMoonName(moon.id, moon.name)" 
                                                        class="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 rounded transition-colors">
                                                    Rename
                                                </button>
                                                <button v-if="moon.visible"
                                                        @click="toggleMoonControlsVisibility(moon.id)" 
                                                        class="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded transition-colors">
                                                    {{ moonControlsVisible[moon.id] ? 'Hide' : 'Controls' }}
                                                </button>
                                                <button @click="toggleMoonVisibility(moon.id)" 
                                                        class="px-2 py-1 text-xs rounded transition-colors"
                                                        :class="moon.visible ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'">
                                                    {{ moon.visible ? 'On' : 'Off' }}
                                                </button>
                                                <button @click="removeMoon(moon.id)" 
                                                        class="px-2 py-1 text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded transition-colors">
                                                    ×
                                                </button>
                                            </div>
                                        </div>

                                        <div v-if="moon.visible && moonControlsVisible[moon.id]" class="space-y-2 pl-2 border-l-2 border-purple-500/30 mt-2">
                                            <div>
                                                <label class="block text-xs text-gray-400 mb-1">Size: {{ moon.size.toFixed(2) }}</label>
                                                <vue-slider v-model="moon.size" :min="0.1" :max="2" :interval="0.05" :tooltip="'none'" 
                                                          @change="(value) => updateMoonSize(moon.id, value)"></vue-slider>
                                            </div>
                                            <div>
                                                <label class="block text-xs text-gray-400 mb-1">Distance: {{ moon.distance.toFixed(1) }}</label>
                                                <vue-slider v-model="moon.distance" :min="3" :max="50" :interval="0.5" :tooltip="'none'" 
                                                          @change="(value) => updateMoonDistance(moon.id, value)"></vue-slider>
                                            </div>
                                            <div>
                                                <label class="block text-xs text-gray-400 mb-1">Orbit Speed: {{ moon.orbitSpeed.toFixed(1) }}</label>
                                                <vue-slider v-model="moon.orbitSpeed" :min="0.0" :max="5" :interval="0.1" :tooltip="'none'" 
                                                          @change="(value) => updateMoonOrbitSpeed(moon.id, value)"></vue-slider>
                                            </div>
                                            <div>
                                                <label class="block text-xs text-gray-400 mb-1">Rotation Speed: {{ moon.rotationSpeed.toFixed(1) }}</label>
                                                <vue-slider v-model="moon.rotationSpeed" :min="0.0" :max="5" :interval="0.1" :tooltip="'none'" 
                                                          @change="(value) => updateMoonRotationSpeed(moon.id, value)"></vue-slider>
                                            </div>
                                            <div>
                                                <label class="block text-xs text-gray-400 mb-1">Orbit Direction: {{ getOrbitDirection(moon.retrograde) }}</label>
                                                <div class="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>Clockwise</span>
                                                    <span>Counter-Clockwise</span>
                                                </div>
                                                <vue-slider v-model="moon.retrograde" :min="0" :max="180" :interval="5" :tooltip="'none'" 
                                                          @change="(value) => updateMoonOrbitDirection(moon.id, value)"></vue-slider>
                                            </div>
                                            <div>
                                                <input type="file" class="hidden" :id="`moonTexture_${moon.id}`" accept="image/*" @change="(event) => setMoonTexture(moon.id, event)">
                                                <label :for="`moonTexture_${moon.id}`" class="cursor-pointer py-1 px-2 block text-xs text-gray-200 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors">
                                                    <span class="flex items-center">
                                                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                        </svg>
                                                        Custom Texture
                                                    </span>
                                                </label>
                                            </div>
                                            
                                            <!-- Individual Moon Color -->
                                            <div>
                                                <label class="block text-xs text-gray-400 mb-1">Moon Color</label>
                                                <div class="flex items-center space-x-2">
                                                    <input 
                                                        type="color" 
                                                        :value="getMoonColor(moon.id)" 
                                                        @change="(event) => updateMoonColor(moon.id, event)"
                                                        class="w-10 h-6 rounded border border-gray-600 bg-gray-700 cursor-pointer"
                                                        :title="`Select color for ${moon.name}`"
                                                    />
                                                    <span class="text-xs text-gray-400">{{ getMoonColor(moon.id) }}</span>
                                                    <button 
                                                        @click="resetMoonColor(moon.id)" 
                                                        class="px-1 py-0.5 text-xs text-gray-300 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                                                        title="Reset to default">
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <!-- 3D Transform Controls -->
                                            <div class="border border-gray-600 rounded-lg overflow-hidden mt-3">
                                                <button @click="toggleMoonTransformControls(moon.id)" 
                                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors bg-gray-700/20">
                                                    <span class="text-xs font-medium flex items-center">
                                                        <svg class="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        3D Transform Controls
                                                    </span>
                                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': moonTransformControlsVisible[moon.id] }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </button>
                                                <div v-show="moonTransformControlsVisible[moon.id]" class="p-3 bg-gray-800/40 space-y-3">
                                                    <!-- Position Controls -->
                                                    <div class="flex items-center justify-between">
                                                        <label class="text-xs font-medium text-gray-200">Position Controls</label>
                                                        <div class="relative">
                                                            <input type="checkbox" class="sr-only" :id="`moonPositionControls-${moon.id}`" @change="toggleMoonControls($event, moon.id, 'position')" :checked="moonPositionControlsVisible[moon.id]">
                                                            <label :for="`moonPositionControls-${moon.id}`" class="flex items-center cursor-pointer">
                                                                <div class="relative">
                                                                    <div class="block bg-gray-700 w-10 h-5 rounded-full"></div>
                                                                    <div class="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition" :class="{ 'transform translate-x-5': moonPositionControlsVisible[moon.id] }"></div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <!-- Rotation Controls -->
                                                    <div class="flex items-center justify-between">
                                                        <label class="text-xs font-medium text-gray-200">Rotation Controls</label>
                                                        <div class="relative">
                                                            <input type="checkbox" class="sr-only" :id="`moonRotationControls-${moon.id}`" @change="toggleMoonControls($event, moon.id, 'rotation')" :checked="moonRotationControlsVisible[moon.id]">
                                                            <label :for="`moonRotationControls-${moon.id}`" class="flex items-center cursor-pointer">
                                                                <div class="relative">
                                                                    <div class="block bg-gray-700 w-10 h-5 rounded-full"></div>
                                                                    <div class="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition" :class="{ 'transform translate-x-5': moonRotationControlsVisible[moon.id] }"></div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <!-- Scale Controls -->
                                                    <div class="flex items-center justify-between">
                                                        <label class="text-xs font-medium text-gray-200">Scale Controls</label>
                                                        <div class="relative">
                                                            <input type="checkbox" class="sr-only" :id="`moonScaleControls-${moon.id}`" @change="toggleMoonControls($event, moon.id, 'scale')" :checked="moonScaleControlsVisible[moon.id]">
                                                            <label :for="`moonScaleControls-${moon.id}`" class="flex items-center cursor-pointer">
                                                                <div class="relative">
                                                                    <div class="block bg-gray-700 w-10 h-5 rounded-full"></div>
                                                                    <div class="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition" :class="{ 'transform translate-x-5': moonScaleControlsVisible[moon.id] }"></div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <!-- Reset Button -->
                                                    <button @click="resetMoonTransform(moon.id)" 
                                                            class="w-full mt-2 py-1 px-2 text-xs text-gray-200 bg-blue-500/20 hover:bg-blue-500/30 rounded transition-colors">
                                                        Reset Transform
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rings -->
                <div class="mb-4">
                    <button @click="menu.open.rings = !menu.open.rings" 
                            class="w-full flex justify-between items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group">
                        <span class="flex items-center">
                            <div class="p-2 bg-amber-500/20 rounded-lg mr-3 group-hover:bg-amber-500/30 transition-colors">
                                <svg class="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span class="font-medium">Rings</span>
                        </span>
                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.open.rings }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>

                    <div v-show="menu.open.rings" class="bg-gray-900/50 rounded-lg mt-2 overflow-hidden">
                        <!-- Rings Subsections -->
                        <div class="space-y-3 p-3">
                            
                            <!-- Ring Visibility Subsection -->
                            <div class="border border-gray-700 rounded-lg overflow-hidden">
                                <button @click="menu.open.ringsVisibility = !menu.open.ringsVisibility" 
                                        class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                    <span class="text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Visibility
                                    </span>
                                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.ringsVisibility }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <div v-show="menu.open.ringsVisibility" class="p-3 bg-gray-800/30">
                                    <div class="flex items-center justify-between">
                                        <label class="text-sm font-medium text-gray-200">Show Rings</label>
                                        <div class="relative">
                                            <input type="checkbox" class="sr-only" id="ringsToggle" @change="toggleRings">
                                            <label for="ringsToggle" class="flex items-center cursor-pointer">
                                                <div class="relative">
                                                    <div class="block bg-gray-700 w-12 h-6 rounded-full"></div>
                                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{ 'transform translate-x-6': ringsVisible }"></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="ringsVisible" class="space-y-3">
                                <!-- Ring System Presets Subsection -->
                                <div class="border border-gray-700 rounded-lg overflow-hidden">
                                    <button @click="menu.open.ringsPresets = !menu.open.ringsPresets" 
                                            class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                        <span class="text-sm font-medium flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                            </svg>
                                            System Presets
                                        </span>
                                        <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.ringsPresets }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <div v-show="menu.open.ringsPresets" class="p-3 bg-gray-800/30">
                                        <div class="grid grid-cols-2 gap-2">
                                            <button @click="setRingSystemType('saturn')" 
                                                    class="px-3 py-2 text-xs text-gray-200 border border-gray-700 rounded hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
                                                    :class="{ 'bg-amber-500/30 border-amber-500': menu.rings.systemType === 'saturn' }">
                                                Saturn
                                            </button>
                                            <button @click="setRingSystemType('uranus')" 
                                                    class="px-3 py-2 text-xs text-gray-200 border border-gray-700 rounded hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
                                                    :class="{ 'bg-amber-500/30 border-amber-500': menu.rings.systemType === 'uranus' }">
                                                Uranus
                                            </button>
                                            <button @click="setRingSystemType('jupiter')" 
                                                    class="px-3 py-2 text-xs text-gray-200 border border-gray-700 rounded hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
                                                    :class="{ 'bg-amber-500/30 border-amber-500': menu.rings.systemType === 'jupiter' }">
                                                Jupiter
                                            </button>
                                            <button @click="setRingSystemType('custom')" 
                                                    class="px-3 py-2 text-xs text-gray-200 border border-gray-700 rounded hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
                                                    :class="{ 'bg-amber-500/30 border-amber-500': menu.rings.systemType === 'custom' }">
                                                Custom
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ring Size Controls Subsection -->
                                <div v-if="menu.rings.systemType === 'custom'" class="border border-gray-700 rounded-lg overflow-hidden">
                                    <button @click="menu.open.ringsSize = !menu.open.ringsSize" 
                                            class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                        <span class="text-sm font-medium flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            Size & Scale
                                        </span>
                                        <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.ringsSize }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <div v-show="menu.open.ringsSize" class="p-3 bg-gray-800/30 space-y-3">
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Inner Radius: {{ menu.rings.innerRadius.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.innerRadius" :min="0.5" :max="8" :interval="0.1" :tooltip="'none'" @change="updateRingInnerRadius" @drag-end="saveRingState"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Outer Radius: {{ menu.rings.outerRadius.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.outerRadius" :min="1" :max="12" :interval="0.1" :tooltip="'none'" @change="updateRingOuterRadius" @drag-end="saveRingState"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Thickness: {{ menu.rings.thickness.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.thickness" :min="0.2" :max="8" :interval="0.1" :tooltip="'none'" @change="updateRingThickness" @drag-end="saveRingState"></vue-slider>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ring Appearance Subsection -->
                                <div class="border border-gray-700 rounded-lg overflow-hidden">
                                    <button @click="menu.open.ringsAppearance = !menu.open.ringsAppearance" 
                                            class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                        <span class="text-sm font-medium flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
                                                <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5a.75.75 0 001.5 0v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                                            </svg>
                                            Appearance
                                        </span>
                                        <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.ringsAppearance }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <div v-show="menu.open.ringsAppearance" class="p-3 bg-gray-800/30 space-y-3">
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Opacity: {{ menu.rings.opacity.toFixed(2) }}</label>
                                            <vue-slider v-model="menu.rings.opacity" :min="0.1" :max="1" :interval="0.01" :tooltip="'none'" @change="updateRingOpacity" @drag-end="saveRingState"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Rotation Speed: {{ menu.rings.rotationSpeed.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.rotationSpeed" :min="0" :max="3" :interval="0.1" :tooltip="'none'" @change="updateRingRotationSpeed" @drag-end="saveRingState"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">Ring Color</label>
                                            <div class="flex items-center space-x-2">
                                                <input 
                                                    type="color" 
                                                    v-model="menu.rings.color" 
                                                    @change="updateRingColor"
                                                    class="w-12 h-8 rounded border border-gray-600 bg-gray-700 cursor-pointer"
                                                    title="Select ring color"
                                                />
                                                <span class="text-xs text-gray-400">{{ menu.rings.color }}</span>
                                                <button 
                                                    @click="resetRingColor" 
                                                    class="px-2 py-1 text-xs text-gray-300 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                                                    title="Reset to white">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ring Textures Subsection -->
                                <div class="border border-gray-700 rounded-lg overflow-hidden">
                                    <button @click="menu.open.ringsTextures = !menu.open.ringsTextures" 
                                            class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                        <span class="text-sm font-medium flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                            </svg>
                                            Textures
                                        </span>
                                        <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.ringsTextures }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <div v-show="menu.open.ringsTextures" class="p-3 bg-gray-800/30 space-y-3">


                                        <!-- Texture Upload -->
                                        <div>
                                            <input type="file" class="hidden" id="ringsSurfaceSelect" accept="image/*" @change="setRingsImage">
                                            <label for="ringsSurfaceSelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors">
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                    </svg>
                                                    Surface Texture
                                                </span>
                                            </label>
                                        </div>
                                        <div>
                                            <input type="file" class="hidden" id="ringsTransparencySelect" accept="image/*" @change="setRingsTransparency">
                                            <label for="ringsTransparencySelect" class="cursor-pointer py-2 px-3 block text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors">
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                                    </svg>
                                                    Transparency Map
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ring Visual Helpers Subsection -->
                                <div class="border border-gray-700 rounded-lg overflow-hidden">
                                    <button @click="menu.open.ringsHelpers = !menu.open.ringsHelpers" 
                                            class="w-full flex justify-between items-center py-2 px-3 text-gray-200 hover:bg-gray-700/30 transition-colors">
                                        <span class="text-sm font-medium flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Controls
                                        </span>
                                        <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.ringsHelpers }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>
                                    <div v-show="menu.open.ringsHelpers" class="p-3 bg-gray-800/30">
                                        <div class="flex items-center justify-between">
                                            <label class="text-sm font-medium text-gray-200">Ring Controls</label>
                                            <div class="relative">
                                                <input type="checkbox" class="sr-only" id="ringControlsToggle" @change="toggleControls" value="rings">
                                                <label for="ringControlsToggle" class="flex items-center cursor-pointer">
                                                    <div class="relative">
                                                        <div class="block bg-gray-700 w-12 h-6 rounded-full"></div>
                                                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition" :class="{ 'transform translate-x-6': ringControlsVisible }"></div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Background -->
                <div class="mb-4">
                    <button @click="menu.open.background = !menu.open.background" 
                            class="w-full flex justify-between items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group">
                        <span class="flex items-center">
                            <div class="p-2 bg-teal-500/20 rounded-lg mr-3 group-hover:bg-teal-500/30 transition-colors">
                                <svg class="h-5 w-5 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                </svg>
                            </div>
                            <span class="font-medium">Background</span>
                        </span>
                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.open.background }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>

                    <div v-show="menu.open.background" class="bg-gray-900/50 rounded-lg mt-2 overflow-hidden">
                        <div class="p-4">
                            <h4 class="text-gray-400 text-sm font-medium mb-4">Choose Background</h4>
                            
                            <!-- Basic Backgrounds -->
                            <div class="mb-4">
                                <h5 class="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Basic</h5>
                                <div class="grid grid-cols-2 gap-2">
                                    <!-- Solid Black -->
                                    <div class="bg-card cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:border-gray-600" 
                                         :class="menu.background.type === 'black' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-800/30'"
                                         @click="setBgBlack">
                                        <input type="radio" name="bgType" class="sr-only" v-model="menu.background.type" value="black">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="w-8 h-8 bg-black rounded-full border border-gray-600 mb-2"></div>
                                            <span class="text-xs text-gray-200 font-medium">Black</span>
                                            <span class="text-xs text-gray-400">Classic space</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Transparent -->
                                    <div class="bg-card cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:border-gray-600" 
                                         :class="menu.background.type === 'transparent' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-800/30'"
                                         @click="setBgTransparent">
                                        <input type="radio" name="bgType" class="sr-only" v-model="menu.background.type" value="transparent">
                                        <div class="flex flex-col items-center text-center">
                                            <div class="w-8 h-8 rounded-full border-2 border-dashed border-gray-500 mb-2 bg-gradient-to-br from-gray-800 to-transparent"></div>
                                            <span class="text-xs text-gray-200 font-medium">Transparent</span>
                                            <span class="text-xs text-gray-400">For overlays</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Color Picker -->
                            <div class="mb-4">
                                <h5 class="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Custom Color</h5>
                                <div class="bg-card cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:border-gray-600" 
                                     :class="menu.background.type === 'color' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-800/30'"
                                     @click="menu.background.type = 'color'">
                                    <input type="radio" name="bgType" class="sr-only" v-model="menu.background.type" value="color">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center">
                                            <div class="w-8 h-8 rounded-full border border-gray-600 mr-3" :style="{ backgroundColor: menu.background.color }"></div>
                                            <div>
                                                <span class="text-sm text-gray-200 font-medium">Color Picker</span>
                                                <div class="text-xs text-gray-400">Choose any color</div>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <input type="color" v-model="menu.background.color" @change="setBgColor" 
                                                   class="w-8 h-8 rounded cursor-pointer border border-gray-600">
                                            <span class="text-xs text-gray-400 font-mono">{{ menu.background.color }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                                                         <!-- Starfield Background -->
                             <div class="mb-4">
                                 <h5 class="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Starfield</h5>
                                 <div class="bg-card cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:border-gray-600" 
                                      :class="menu.background.type === 'starfield' ? 'border-teal-500 bg-teal-500/10' : 'border-gray-700 hover:bg-gray-800/30'"
                                      @click="setBgStarfield()">
                                     <div class="flex items-center">
                                         <div class="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-full mr-3 border border-gray-600 relative overflow-hidden">
                                             <div class="absolute inset-0">
                                                 <div class="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                                                 <div class="absolute top-3 left-1 w-0.5 h-0.5 bg-blue-200 rounded-full"></div>
                                                 <div class="absolute top-2 right-1 w-0.5 h-0.5 bg-white rounded-full"></div>
                                                 <div class="absolute bottom-2 left-3 w-0.5 h-0.5 bg-yellow-200 rounded-full"></div>
                                                 <div class="absolute bottom-1 right-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                                             </div>
                                         </div>
                                         <div>
                                             <span class="text-sm text-gray-200 font-medium">✨ Starfield</span>
                                             <div class="text-xs text-gray-400">Realistic night sky</div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                            
                            <!-- Custom Image -->
                            <div>
                                <h5 class="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Custom</h5>
                                <div class="bg-card cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:border-gray-600" 
                                     :class="menu.background.type === 'custom' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:bg-gray-800/30'"
                                     @click="triggerImageSelect">
                                    <input type="radio" name="bgType" class="sr-only" v-model="menu.background.type" value="custom">
                                    <input type="file" class="hidden" id="imageBG" accept="image/*" @change="setBgImage">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mr-3 border border-gray-600 flex items-center justify-center">
                                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-200 font-medium">📁 Custom Image</span>
                                            <div class="text-xs text-gray-400">Upload your own background</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lights -->
                <div class="mb-4">
                    <button @click="menu.open.lights = !menu.open.lights" 
                            class="w-full flex justify-between items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group">
                        <span class="flex items-center">
                            <div class="p-2 bg-yellow-500/20 rounded-lg mr-3 group-hover:bg-yellow-500/30 transition-colors">
                                <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span class="font-medium">Lighting</span>
                        </span>
                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.open.lights }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>

                    <div v-show="menu.open.lights" class="bg-gray-900/50 rounded-lg mt-2 overflow-hidden">
                        <div class="p-4 space-y-4">
                            <button type="button" class="w-full py-2 px-4 text-sm text-gray-200 hover:bg-yellow-500/20 hover:text-yellow-300 rounded transition-colors" value="light" @click="toggleControls">
                                Toggle Light Controls
                            </button>
                            
                            <div>
                                <label class="block text-xs text-gray-400 mb-2">Sun Intensity: {{ menu.light.sunIntensity }}</label>
                                <vue-slider v-model="menu.light.sunIntensity" :min="0" :max="2.5" :interval="0.01" :tooltip="'none'" @change="sunIntensity"></vue-slider>
                            </div>
                            
                            <div>
                                <label class="block text-xs text-gray-400 mb-2">Ambient Intensity: {{ menu.light.ambientIntensity }}</label>
                                <vue-slider v-model="menu.light.ambientIntensity" :min="0" :max="4" :interval="0.01" :tooltip="'none'" @change="ambientIntensity"></vue-slider>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <!-- Export Section -->
            <div class="mb-6">
                <button @click="menu.open.export = !menu.open.export" 
                        class="w-full flex justify-between items-center py-2 px-2 text-gray-400 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-800/30 focus:outline-none rounded-lg transition-all duration-200 group">
                    <span class="flex items-center">
                        <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Export
                    </span>
                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.export }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                
                <div v-show="menu.open.export" class="mt-3 space-y-2">
                    <button class="w-full flex items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group" @click="takeScreenshot">
                        <div class="p-2 bg-green-500/20 rounded-lg mr-3 group-hover:bg-green-500/30 transition-colors">
                            <svg class="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="text-left">
                            <div class="font-medium">Screenshot</div>
                            <div class="text-xs text-gray-400">Save current view as JPG</div>
                        </div>
                    </button>
                    
                    <button class="w-full flex items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group" @click="makeGif">
                        <div class="p-2 bg-orange-500/20 rounded-lg mr-3 group-hover:bg-orange-500/30 transition-colors">
                            <svg class="w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="text-left">
                            <div class="font-medium">Animation</div>
                            <div class="text-xs text-gray-400">Create rotating GIF</div>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Storage Management Section -->
            <div class="mb-6">
                <button @click="menu.open.storage = !menu.open.storage" 
                        class="w-full flex justify-between items-center py-2 px-2 text-gray-400 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-800/30 focus:outline-none rounded-lg transition-all duration-200 group">
                    <span class="flex items-center">
                        <span class="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                        Storage
                        <span v-if="hasStoredData" class="ml-2 px-2 py-1 bg-green-500/30 text-green-300 text-xs rounded-full">
                            Saved
                        </span>
                    </span>
                    <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-90': menu.open.storage }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                
                <div v-show="menu.open.storage" class="mt-3">
                <!-- Storage Info -->
                <div v-if="hasStoredData" class="bg-gray-800/30 rounded-lg p-3 mb-3">
                    <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>Auto-saved locally</span>
                        <span>{{ Math.round(storageInfo.size / 1024) }}KB</span>
                    </div>
                    <div v-if="storageInfo.timestamp" class="text-xs text-gray-500">
                        Last saved: {{ new Date(storageInfo.timestamp).toLocaleString() }}
                    </div>
                </div>
                
                <div class="space-y-2">
                    <button class="w-full flex items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group" @click="saveCurrentState">
                        <div class="p-2 bg-green-500/20 rounded-lg mr-3 group-hover:bg-green-500/30 transition-colors">
                            <svg class="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        </div>
                        <div class="text-left">
                            <div class="font-medium">Save State</div>
                            <div class="text-xs text-gray-400">Store current configuration</div>
                        </div>
                    </button>
                    
                    <button class="w-full flex items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group" @click="clearCanvas">
                        <div class="p-2 bg-red-500/20 rounded-lg mr-3 group-hover:bg-red-500/30 transition-colors">
                            <svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div class="text-left">
                            <div class="font-medium">Clear Canvas</div>
                            <div class="text-xs text-gray-400">Reset all settings & storage</div>
                        </div>
                    </button>
                </div>
                </div>
            </div>

            <!-- Help Section -->
            <div class="border-t border-gray-800 pt-4">
                <router-link to="/help" class="w-full flex items-center justify-between py-3 px-4 text-gray-300 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group" target="_blank">
                    <div class="flex items-center">
                        <div class="p-2 bg-gray-700/30 rounded-lg mr-3 group-hover:bg-gray-700/50 transition-colors">
                            <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span class="font-medium">Help & Support</span>
                    </div>
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </router-link>
            </div>
        </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import VueSlider from 'vue-slider-component';
import Loader from '@/components/Loader.vue';
import 'vue-slider-component/theme/antd.css';
import MapToGlobe from '../assets/MapToGlobe/MapToGlobe';
import * as THREE from 'three';
import { StorageManager, StoredAppState } from '../utils/storage';
import type { StoredMoonConfig } from '../utils/storage';

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

export default defineComponent({
    components: {
        VueSlider,
        Loader
    },
    emits: ['nav-toggle'],
    inheritAttrs: false,
    data() {
        return {
            loading: false,
            loader: {
                message: undefined as string | undefined
            },

            menu: {
                open: {
                    objects: true,
                    export: false,
                    storage: false,
                    planet: false,
                    planetTextures: false,
                    planetAppearance: false,
                    planetMotion: false,
                    planetShape: false,
                    planetClouds: false,
                    planetHelpers: false,
                    moon: false,
                    moonLegacy: false,
                    moonPresets: false,
                    moonManagement: false,
                    moonIndividual: false,
                    rings: false,
                    ringsVisibility: false,
                    ringsPresets: false,
                    ringsSize: false,
                    ringsAppearance: false,
                    ringsTextures: false,
                    ringsHelpers: false,
                    background: false,
                    lights: false
                },
                planet: {
                    shininess: 60,
                    rotationSpeed: 0.0,
                    shape: {
                        scaleX: 1.0,
                        scaleY: 1.0,
                        scaleZ: 1.0
                    }
                },
                clouds: {
                    opacity: 1.0
                },
                moon: {
                    controls: false,
                    scale: 1,
                    distance: 3,
                    rotationSpeed: 0.0,
                    color: '#cccccc'  // Default moon color
                },
                light: {
                    sunIntensity: 0.4,
                    ambientIntensity: 0.6
                },
                rings: {
                    systemType: 'saturn' as 'saturn' | 'uranus' | 'jupiter' | 'custom',
                    innerRadius: 2.0,  // Ensure within slider bounds (0.5-8)
                    outerRadius: 4.0,  // Ensure within slider bounds (1-12) 
                    thickness: 2.0,    // Ensure within slider bounds (0.2-8)
                    opacity: 0.8,      // Already within bounds (0.1-1)
                    rotationSpeed: 0.5, // Already within bounds (0-3)
                    color: '#ffffff'    // Default white color
                },
                background: {
                    type: 'black' as 'black' | 'transparent' | 'color' | 'starfield' | 'custom',
                    color: '#000000'
                }
            },
            images: {
                surface: false,
                clouds: false
            },
            atmosphere: {
                enabled: false
            },
            moonIsVisible: false,
            ringsVisible: false,
            axisVisible: false,
            planetControlsVisible: false,
            cloudControlsVisible: false,
            ringControlsVisible: false,
            controls: null,
            maptoglobe: {} as MapToGlobe,
            moonSystemInfo: {
                totalMoons: 0,
                visibleMoons: 0,
                moons: [] as Array<{
                    id: string;
                    name: string;
                    visible: boolean;
                    size: number;
                    distance: number;
                    orbitSpeed: number;
                    rotationSpeed: number;
                    retrograde: number;
                    color?: string;
                }>
            },
            customMoonCounter: 1,
            hasStoredData: false,
            storageInfo: { size: 0, timestamp: undefined as number | undefined } as { size: number; timestamp?: number },
            isLoadingStoredData: false,
            ringUpdateTimeout: null as number | null,
            navPanelVisible: true,
            editingMoonName: null as string | null,
            editingMoonNameValue: '',
            moonControlsVisible: {} as Record<string, boolean>,
            moonTransformControlsVisible: {} as Record<string, boolean>,
            moonPositionControlsVisible: {} as Record<string, boolean>,
            moonRotationControlsVisible: {} as Record<string, boolean>,
            moonScaleControlsVisible: {} as Record<string, boolean>
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => { if (this.$route.params.saveId.length > 0) this.Load() },
            { immediate: true }
        )
    },
    async mounted() {
        window.addEventListener("set_loading_message", (e: CustomEventInit) => {
            this.loader.message = e.detail;
        });
        
        this.maptoglobe = new MapToGlobe(document.getElementById("scene") as HTMLCanvasElement);

        this.menu.planet.shininess = ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess;
        this.menu.light.sunIntensity = (this.maptoglobe.instance.light.children[0] as THREE.DirectionalLight).intensity;
        this.menu.light.ambientIntensity = this.maptoglobe.instance.ambient.intensity;
        this.menu.moon.distance = this.maptoglobe.moon.moon.position.x;
        this.menu.moon.scale = this.maptoglobe.moon.moon.scale.x;
        this.menu.moon.rotationSpeed = this.maptoglobe.GetMoonRotationSpeed();
        
        // Initialize moon system info
        this.updateMoonSystemInfo();
        
        // Initialize planet rotation speed
        this.menu.planet.rotationSpeed = this.maptoglobe.GetPlanetRotationSpeed();
        
        // Initialize planet shape
        const shape = this.maptoglobe.GetPlanetShape();
        this.menu.planet.shape.scaleX = shape.x;
        this.menu.planet.shape.scaleY = shape.y;
        this.menu.planet.shape.scaleZ = shape.z;
        
        // Initialize cloud opacity
        this.menu.clouds.opacity = 1.0;
        
        // Load stored data and update storage info
        this.loadStoredData();
        this.updateStorageInfo();
        
        // Set up ring transform listener for auto-saving
        this.maptoglobe.SetRingTransformListener(() => {
            this.saveRingTransform();
        });
        
        // Set up moon transform listener for auto-saving
        this.maptoglobe.SetMoonTransformListener(() => {
            this.saveMoonTransform();
        });
    },
    methods: {
        validateImageFile(file: File): boolean {
            if (!file) return false;
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, GIF, WebP, BMP, or TIFF)');
                return false;
            }
            
            // Check file size (limit to 10MB)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                alert('Image file is too large. Please select an image smaller than 10MB.');
                return false;
            }
            
            return true;
        },
        
        async setSurfaceImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.planet.SetSurfaceImage(files[0]);
                this.images.surface = true;
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.planet.surface = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save surface texture:', error);
                }
            }
        },
        async setHeightmapImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.planet.SetHeightmapImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.planet.heightmap = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save heightmap texture:', error);
                }
            }
        },
        async setSpecularImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.planet.SetSpecularImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.planet.specular = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save specular texture:', error);
                }
            }
        },
        toggleAxis() {
            this.axisVisible = !this.axisVisible;
            this.maptoglobe.planet.ToggleAxis();
        },
        toggleAtmosphere() {
            //this.maptoglobe.planet.ToggleAtmosphere();
            return;
        },
        async setCloudsImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.planet.SetCloudsImage(files[0]);
                this.images.clouds = true;
                
                // Apply current opacity setting to the newly loaded clouds
                this.maptoglobe.SetCloudOpacity(this.menu.clouds.opacity);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.planet.clouds = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save clouds texture:', error);
                }
            }
        },
        planetShininess(value: number) {
            ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess = value;
            this.saveCurrentState();
        },
        
        // Cloud Opacity Method
        setCloudOpacity(value: number) {
            if (this.images.clouds) {
                this.menu.clouds.opacity = value;
                this.maptoglobe.SetCloudOpacity(value);
                this.saveCurrentState();
            }
        },
        
        getCloudOpacityDescription(opacity: number): string {
            if (opacity === 0) return 'Transparent';
            if (opacity < 0.2) return 'Very Light';
            if (opacity < 0.4) return 'Light';
            if (opacity < 0.6) return 'Medium';
            if (opacity < 0.8) return 'Dense';
            if (opacity < 1) return 'Very Dense';
            return 'Opaque';
        },
        
        // Planet Rotation Method
        setPlanetRotationSpeed(value: number) {
            this.menu.planet.rotationSpeed = value;
            this.maptoglobe.SetPlanetRotationSpeed(value);
            this.saveCurrentState();
        },
        
        getRotationSpeedDescription(speed: number): string {
            if (speed === 0) return 'Stopped';
            if (speed < 1) return 'Slow';
            if (speed < 2) return 'Medium';
            if (speed < 3) return 'Fast';
            if (speed < 4) return 'Very Fast';
            return 'Ultra Fast';
        },
        
        getMoonSizeDescription(scale: number): string {
            if (scale < 0.5) return 'Tiny';
            if (scale < 1) return 'Small';
            if (scale < 1.5) return 'Normal';
            if (scale < 2) return 'Large';
            return 'Huge';
        },
        
        getMoonDistanceDescription(distance: number): string {
            if (distance < 2) return 'Very Close';
            if (distance < 4) return 'Close';
            if (distance < 8) return 'Normal';
            if (distance < 15) return 'Far';
            return 'Very Far';
        },
        
        // Planet Shape Methods
        updatePlanetShape() {
            this.maptoglobe.SetPlanetShape(
                this.menu.planet.shape.scaleX,
                this.menu.planet.shape.scaleY,
                this.menu.planet.shape.scaleZ
            );
            this.saveCurrentState();
        },
        
        resetPlanetShape() {
            this.menu.planet.shape.scaleX = 1.0;
            this.menu.planet.shape.scaleY = 1.0;
            this.menu.planet.shape.scaleZ = 1.0;
            this.updatePlanetShape();
        },
        
        getShapeDescription(axis: string, value: number): string {
            if (value < 0.6) return 'Very Compressed';
            if (value < 0.8) return 'Compressed';
            if (value < 0.95) return 'Slightly Compressed';
            if (value <= 1.05) return 'Normal';
            if (value < 1.2) return 'Slightly Stretched';
            if (value < 1.5) return 'Stretched';
            return 'Very Stretched';
        },
        toggleMoon() {
            this.moonIsVisible = !this.moonIsVisible;
            if (this.moonIsVisible) {
                this.maptoglobe.AddMoon();
            }
            else {
                this.maptoglobe.RemoveMoon();
            }
            this.saveCurrentState();
        },
        async setMoonImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.moon.SetSurfaceImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.moon.surface = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save moon texture:', error);
                }
            }
        },
        toggleRings() {
            this.ringsVisible = !this.ringsVisible;
            this.maptoglobe.ToggleRings();
            
            // If rings are being turned on, apply current configuration
            if (this.ringsVisible) {
                setTimeout(() => {
                    this.maptoglobe.LoadRingSystemType(this.menu.rings.systemType);
                    if (this.menu.rings.systemType === 'custom') {
                        this.maptoglobe.SetRingInnerRadius(this.menu.rings.innerRadius);
                        this.maptoglobe.SetRingOuterRadius(this.menu.rings.outerRadius);
                        this.maptoglobe.SetRingOpacity(this.menu.rings.opacity);
                        this.maptoglobe.SetRingRotationSpeed(this.menu.rings.rotationSpeed);
                        // Apply ring color
                        const numColor = parseInt(this.menu.rings.color.replace('#', ''), 16);
                        this.maptoglobe.SetRingColor(numColor);
                    } else {
                        // For preset types, still apply custom opacity and rotation if they were modified
                        this.maptoglobe.SetRingOpacity(this.menu.rings.opacity);
                        this.maptoglobe.SetRingRotationSpeed(this.menu.rings.rotationSpeed);
                    }
                    
                    // Try to restore any saved transformation state
                    if (StorageManager.hasStoredData()) {
                        const stored = StorageManager.loadState();
                        if (stored.rings?.transform && this.maptoglobe.rings.object) {
                            const transform = stored.rings.transform;
                            this.maptoglobe.rings.object.position.set(
                                transform.position.x,
                                transform.position.y,
                                transform.position.z
                            );
                            this.maptoglobe.rings.object.rotation.set(
                                transform.rotation.x,
                                transform.rotation.y,
                                transform.rotation.z
                            );
                            this.maptoglobe.rings.object.scale.set(
                                transform.scale.x,
                                transform.scale.y,
                                transform.scale.z
                            );
                        }
                    }
                }, 100); // Small delay to ensure rings are fully created
            }
            
            this.saveCurrentState();
        },
        async setRingsImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.rings.SetSurfaceImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.rings.surface = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save rings texture:', error);
                }
            }
        },
        async setRingsTransparency(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.rings.SetTransparencyImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.rings.transparency = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save rings transparency texture:', error);
                }
            }
        },
        
        // NEW RING CONTROL METHODS
        setRingSystemType(type: 'saturn' | 'uranus' | 'jupiter' | 'custom') {
            // Auto-enable rings if they're not visible and user selected a preset
            if (!this.ringsVisible && type !== 'custom') {
                this.ringsVisible = true;
                this.maptoglobe.ToggleRings();
            }
            
            this.menu.rings.systemType = type;
            
            if (this.ringsVisible) {
                this.maptoglobe.LoadRingSystemType(type);
                
                // Update UI values based on the selected system type
                if (type !== 'custom') {
                    const config = this.maptoglobe.GetRingConfig();
                    this.menu.rings.innerRadius = config.innerRadius;
                    this.menu.rings.outerRadius = config.outerRadius;
                    this.menu.rings.thickness = config.outerRadius - config.innerRadius;
                    this.menu.rings.opacity = config.opacity;
                    this.menu.rings.rotationSpeed = config.rotationSpeed;
                    // Update color in UI (convert from hex number to hex string)
                    this.menu.rings.color = '#' + (config.color || 0xffffff).toString(16).padStart(6, '0');
                }
            }
            
            this.saveCurrentState();
        },
        
        updateRingInnerRadius(value: number) {
            this.menu.rings.innerRadius = value;
            this.debounceRingUpdate(() => {
                this.maptoglobe.SetRingInnerRadius(value);
                this.updateRingThicknessFromRadii();
                this.saveCurrentState();
            });
        },
        
        updateRingOuterRadius(value: number) {
            this.menu.rings.outerRadius = value;
            this.debounceRingUpdate(() => {
                this.maptoglobe.SetRingOuterRadius(value);
                this.updateRingThicknessFromRadii();
                this.saveCurrentState();
            });
        },
        
        updateRingThickness(value: number) {
            this.menu.rings.thickness = value;
            this.debounceRingUpdate(() => {
                this.maptoglobe.SetRingThickness(value);
                // Update the UI radii values based on the new thickness
                const config = this.maptoglobe.GetRingConfig();
                this.menu.rings.innerRadius = config.innerRadius;
                this.menu.rings.outerRadius = config.outerRadius;
                this.saveCurrentState();
            });
        },
        
        updateRingThicknessFromRadii() {
            // Helper method to update thickness when radii change
            this.menu.rings.thickness = this.menu.rings.outerRadius - this.menu.rings.innerRadius;
        },
        
        updateRingOpacity(value: number) {
            this.menu.rings.opacity = value;
            this.maptoglobe.SetRingOpacity(value);
            this.saveCurrentState();
        },
        
        updateRingRotationSpeed(value: number) {
            this.menu.rings.rotationSpeed = value;
            this.maptoglobe.SetRingRotationSpeed(value);
            this.saveCurrentState();
        },
        
        updateRingColor(event: Event) {
            const hexColor = (event.target as HTMLInputElement).value;
            this.menu.rings.color = hexColor;
            // Convert hex to integer for Three.js
            const numColor = parseInt(hexColor.replace('#', ''), 16);
            this.maptoglobe.SetRingColor(numColor);
            this.saveCurrentState();
        },
        
        resetRingColor() {
            this.menu.rings.color = '#ffffff';
            this.maptoglobe.SetRingColor(0xffffff);
            this.saveCurrentState();
        },
        

        
        debounceRingUpdate(callback: () => void) {
            if (this.ringUpdateTimeout) {
                clearTimeout(this.ringUpdateTimeout);
            }
            this.ringUpdateTimeout = setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error('Error in ring update:', error);
                }
                this.ringUpdateTimeout = null;
            }, 100); // 100ms debounce
        },

        // Immediate save for ring changes (called on slider input end)
        saveRingState() {
            // Cancel any pending debounced update
            if (this.ringUpdateTimeout) {
                clearTimeout(this.ringUpdateTimeout);
                this.ringUpdateTimeout = null;
            }
            // Immediately save current state
            this.saveCurrentState();
        },

        // Save ring transformation state when visual helper controls are used
        saveRingTransform() {
            if (this.ringsVisible && this.maptoglobe.rings.object) {
                this.saveCurrentState();
            }
        },

        // Save moon transformation state when visual helper controls are used
        saveMoonTransform() {
            this.saveCurrentState();
        },
        setBgBlack() {
            this.menu.background.type = 'black';
            this.maptoglobe.SetBGBlack();
            this.saveCurrentState();
        },
        setBgTransparent() {
            this.menu.background.type = 'transparent';
            this.maptoglobe.SetBGTransparent();
            this.saveCurrentState();
        },
        setBgColor() {
            this.menu.background.type = 'color';
            this.maptoglobe.SetBGColor(this.menu.background.color);
            this.saveCurrentState();
        },
        setBgStarfield() {
            this.menu.background.type = 'starfield';
            this.maptoglobe.SetBGStarfield();
            this.saveCurrentState();
        },
        triggerImageSelect() {
            const fileInput = document.getElementById('imageBG') as HTMLInputElement;
            if (fileInput) {
                fileInput.click();
            }
        },
        async setBgImage(event: Event) {
            const radioButton = document.querySelector("#imageBGRadio") as HTMLInputElement;
            if (radioButton) {
                radioButton.checked = true;
            }
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.menu.background.type = 'custom';
                this.maptoglobe.SetBGImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.background = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save background texture:', error);
                    // Fallback to regular save without texture data
                    this.saveCurrentState();
                }
            }
        },
        toggleControls(event: Event) {
            const target = (event.target as HTMLInputElement).value;
            switch (target) {
                case "planet":
                    this.planetControlsVisible = !this.planetControlsVisible;
                    this.maptoglobe.ToggleControls(this.maptoglobe.planet.object);
                    break;
                case "rings":
                    this.ringControlsVisible = !this.ringControlsVisible;
                    this.maptoglobe.ToggleControls(this.maptoglobe.rings.object);
                    break;
                case "light":
                    this.maptoglobe.ToggleControls(this.maptoglobe.instance.light as THREE.Mesh);
                    break;
                case "orbit":
                    this.maptoglobe.ToggleControls(this.maptoglobe.moon.object as THREE.Mesh);
                    break;
                case "rotation":
                    this.maptoglobe.ToggleControls(this.maptoglobe.moon.moon);
                    break;
                case "clouds":
                    this.cloudControlsVisible = !this.cloudControlsVisible;
                    this.maptoglobe.ToggleControls(this.maptoglobe.planet.object.getObjectByName("clouds") as THREE.Mesh);
                    break;
            }
        },
        moonScale(value: number) {
            this.maptoglobe.moon.Scale(value);
            this.saveCurrentState();
        },
        moonDistance(value: number) {
            this.maptoglobe.moon.Distance(value);
            this.saveCurrentState();
        },
        moonRotationSpeed(value: number) {
            this.menu.moon.rotationSpeed = value;
            this.maptoglobe.SetMoonRotationSpeed(value);
            this.saveCurrentState();
        },
        
        updateLegacyMoonColor(event: Event) {
            const hexColor = (event.target as HTMLInputElement).value;
            this.menu.moon.color = hexColor;
            // Convert hex to integer for Three.js
            const numColor = parseInt(hexColor.replace('#', ''), 16);
            this.maptoglobe.SetLegacyMoonColor(numColor);
            this.saveCurrentState();
        },
        
        resetLegacyMoonColor() {
            this.menu.moon.color = '#cccccc';
            this.maptoglobe.SetLegacyMoonColor(0xcccccc);
            this.saveCurrentState();
        },
        async setLegacyMoonImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.moon.SetSurfaceImage(files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    currentState.textureData.moon.surface = base64;
                    StorageManager.saveState(currentState);
                } catch (error) {
                    console.warn('Failed to save legacy moon texture:', error);
                }
            }
        },
        sunIntensity(value: number) {
            this.maptoglobe.instance.SetSunIntensity(value);
            this.saveCurrentState();
        },
        ambientIntensity(value: number) {
            this.maptoglobe.instance.SetAmbientIntensity(value);
            this.saveCurrentState();
        },
        takeScreenshot() {
            this.maptoglobe.Screenshot(document.getElementById("scene") as CanvasElement);
        },
        
        // Multi-Moon System Methods
        updateMoonSystemInfo() {
            this.moonSystemInfo = this.maptoglobe.GetMoonSystemInfo();
            // Auto-save after moon system changes (with small delay to ensure state is updated)
            // But don't save while we're loading stored data to prevent recursion
            if (!this.isLoadingStoredData) {
                nextTick(() => {
                    this.saveCurrentState();
                });
            }
        },
        
        loadMoonPreset(presetName: 'earth' | 'jupiter' | 'saturn' | 'custom') {
            // First deactivate all transform controls
            this.deactivateAllMoonTransformControls();
            
            this.maptoglobe.LoadMoonPreset(presetName);
            this.updateMoonSystemInfo();
            
            // Initialize moon controls visibility for all moons in the preset
            nextTick(() => {
                this.moonSystemInfo.moons.forEach(moon => {
                    if (!(moon.id in this.moonControlsVisible)) {
                        this.moonControlsVisible[moon.id] = false;
                    }
                    if (!(moon.id in this.moonTransformControlsVisible)) {
                        this.moonTransformControlsVisible[moon.id] = false;
                    }
                    if (!(moon.id in this.moonPositionControlsVisible)) {
                        this.moonPositionControlsVisible[moon.id] = false;
                    }
                    if (!(moon.id in this.moonRotationControlsVisible)) {
                        this.moonRotationControlsVisible[moon.id] = false;
                    }
                    if (!(moon.id in this.moonScaleControlsVisible)) {
                        this.moonScaleControlsVisible[moon.id] = false;
                    }
                });
            });
        },
        
        showAllMoons() {
            this.maptoglobe.ShowAllMoons();
            this.updateMoonSystemInfo();
        },
        
        hideAllMoons() {
            this.maptoglobe.HideAllMoons();
            this.updateMoonSystemInfo();
        },
        
        clearMoonSystem() {
            // First deactivate all transform controls
            this.deactivateAllMoonTransformControls();
            
            this.maptoglobe.ClearMoonSystem();
            // Clear all moon controls visibility states
            this.moonControlsVisible = {};
            this.moonTransformControlsVisible = {};
            this.moonPositionControlsVisible = {};
            this.moonRotationControlsVisible = {};
            this.moonScaleControlsVisible = {};
            this.updateMoonSystemInfo();
        },
        
        toggleMoonVisibility(moonId: string) {
            const moon = this.moonSystemInfo.moons.find(m => m.id === moonId);
            if (moon) {
                if (moon.visible) {
                    this.maptoglobe.HideMoon(moonId);
                    // Detach any active transform controls when hiding a moon
                    this.detachMoonControls(moonId);
                } else {
                    this.maptoglobe.ShowMoon(moonId);
                }
                this.updateMoonSystemInfo();
            }
        },
        
        removeMoon(moonId: string) {
            // Detach any active transform controls before removing the moon
            this.detachMoonControls(moonId);
            
            this.maptoglobe.RemoveMoonFromSystem(moonId);
            // Clean up moon controls visibility state
            delete this.moonControlsVisible[moonId];
            delete this.moonTransformControlsVisible[moonId];
            delete this.moonPositionControlsVisible[moonId];
            delete this.moonRotationControlsVisible[moonId];
            delete this.moonScaleControlsVisible[moonId];
            this.updateMoonSystemInfo();
        },
        
        updateMoonSize(moonId: string, size: number) {
            this.maptoglobe.UpdateMoonSize(moonId, size);
            this.updateMoonSystemInfo();
        },
        
        updateMoonDistance(moonId: string, distance: number) {
            this.maptoglobe.UpdateMoonDistance(moonId, distance);
            this.updateMoonSystemInfo();
        },
        
        updateMoonOrbitSpeed(moonId: string, speed: number) {
            this.maptoglobe.UpdateMoonOrbitSpeed(moonId, speed);
            this.updateMoonSystemInfo();
        },
        
        updateMoonRotationSpeed(moonId: string, speed: number) {
            this.maptoglobe.UpdateMoonRotationSpeed(moonId, speed);
            this.updateMoonSystemInfo();
        },
        
        updateMoonOrbitDirection(moonId: string, retrograde: number) {
            this.maptoglobe.UpdateMoonRetrograde(moonId, retrograde);
            this.updateMoonSystemInfo();
        },
        
        getMoonColor(moonId: string): string {
            const moon = this.moonSystemInfo.moons.find(m => m.id === moonId);
            if (moon && moon.color) {
                return moon.color;
            }
            return '#cccccc'; // Default color
        },
        
        updateMoonColor(moonId: string, event: Event) {
            const hexColor = (event.target as HTMLInputElement).value;
            // Convert hex to integer for Three.js
            const numColor = parseInt(hexColor.replace('#', ''), 16);
            this.maptoglobe.UpdateMoonColor(moonId, numColor);
            
            // Update the moon info with the new color
            const moon = this.moonSystemInfo.moons.find(m => m.id === moonId);
            if (moon) {
                moon.color = hexColor;
            }
            
            this.saveCurrentState();
        },
        
        resetMoonColor(moonId: string) {
            const defaultColor = '#cccccc';
            this.maptoglobe.UpdateMoonColor(moonId, 0xcccccc);
            
            // Update the moon info with the default color
            const moon = this.moonSystemInfo.moons.find(m => m.id === moonId);
            if (moon) {
                moon.color = defaultColor;
            }
            
            this.saveCurrentState();
        },
        
        getOrbitDirection(retrograde: number): string {
            if (retrograde === 0) return 'Clockwise';
            if (retrograde === 180) return 'Counter-Clockwise';
            if (retrograde < 90) return 'Mostly Clockwise';
            if (retrograde > 90) return 'Mostly Counter-Clockwise';
            return 'Perpendicular';
        },
        
        async setMoonTexture(moonId: string, event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null && this.validateImageFile(files[0])) {
                this.maptoglobe.SetMoonTexture(moonId, files[0]);
                
                // Save texture data for persistence
                try {
                    const base64 = await StorageManager.fileToBase64(files[0]);
                    const currentState = StorageManager.loadState();
                    
                    // Find the moon in the current state and update its texture data
                    const moonIndex = currentState.moonSystem.moons.findIndex(moon => moon.id === moonId);
                    if (moonIndex !== -1) {
                        currentState.moonSystem.moons[moonIndex].textureData = base64;
                        StorageManager.saveState(currentState);
                    }
                } catch (error) {
                    console.warn('Failed to save moon texture:', error);
                }
            }
        },
        
        addCustomMoon() {
            const moonId = `custom_${this.customMoonCounter}`;
            const moonConfig = {
                id: moonId,
                name: `Custom Moon ${this.customMoonCounter}`,
                size: 0.3,
                distance: 8 + (this.customMoonCounter * 3),
                orbitSpeed: 1.0,
                rotationSpeed: 1.0,
                retrograde: 0,
                visible: true,
                color: Math.floor(Math.random() * 0xffffff)
            };
            
            this.maptoglobe.AddMoonToSystem(moonConfig);
            this.customMoonCounter++;
            
            // Initialize moon controls as hidden by default
            this.moonControlsVisible[moonId] = false;
            this.moonTransformControlsVisible[moonId] = false;
            this.moonPositionControlsVisible[moonId] = false;
            this.moonRotationControlsVisible[moonId] = false;
            this.moonScaleControlsVisible[moonId] = false;
            
            this.updateMoonSystemInfo();
        },
        makeGif() {
            this.maptoglobe.Gif(document.getElementById("scene") as CanvasElement);
        },
        async Load() {
            // Load functionality removed - no longer supported without Firebase
            // eslint-disable-next-line no-console
            console.warn('Load functionality is not available without Firebase configuration');
        },
        
        // Storage Management Methods
        updateStorageInfo() {
            this.hasStoredData = StorageManager.hasStoredData();
            this.storageInfo = StorageManager.getStorageInfo() as { size: number; timestamp: number | undefined };
        },
        
        saveCurrentState() {
            try {
                // Get fresh moon system info to ensure we have the latest data
                const currentMoonInfo = this.maptoglobe.GetMoonSystemInfo();
                const allMoons = this.maptoglobe.GetAllMoons();
                
                const state: Partial<StoredAppState> = {
                    moonSystem: {
                        moons: currentMoonInfo.moons.map(moon => {
                            const moonObj = allMoons.find(m => m.config.id === moon.id);
                            return {
                                id: moon.id,
                                name: moon.name,
                                size: moon.size,
                                distance: moon.distance,
                                orbitSpeed: moon.orbitSpeed,
                                rotationSpeed: moon.rotationSpeed,
                                retrograde: moon.retrograde,
                                visible: moon.visible,
                                color: moonObj?.config.color,
                                transform: moonObj?.config.transform
                            };
                        }),
                        customMoonCounter: this.customMoonCounter
                    },
                    legacyMoon: {
                        visible: this.moonIsVisible,
                        scale: this.menu.moon.scale,
                        distance: this.menu.moon.distance,
                        rotationSpeed: this.menu.moon.rotationSpeed,
                        color: this.menu.moon.color
                    },
                    planet: {
                        shininess: this.menu.planet.shininess,
                        rotationSpeed: this.menu.planet.rotationSpeed,
                        shape: {
                            scaleX: this.menu.planet.shape.scaleX,
                            scaleY: this.menu.planet.shape.scaleY,
                            scaleZ: this.menu.planet.shape.scaleZ
                        }
                    },
                    clouds: {
                        opacity: this.menu.clouds.opacity
                    },
                    rings: {
                        visible: this.ringsVisible,
                        systemType: this.menu.rings.systemType,
                        innerRadius: this.menu.rings.innerRadius,
                        outerRadius: this.menu.rings.outerRadius,
                        thickness: this.menu.rings.thickness,
                        opacity: this.menu.rings.opacity,
                        rotationSpeed: this.menu.rings.rotationSpeed,

                        // Save 3D transformation state if rings exist
                        transform: this.ringsVisible && this.maptoglobe.rings.object ? {
                            position: {
                                x: this.maptoglobe.rings.object.position.x,
                                y: this.maptoglobe.rings.object.position.y,
                                z: this.maptoglobe.rings.object.position.z
                            },
                            rotation: {
                                x: this.maptoglobe.rings.object.rotation.x,
                                y: this.maptoglobe.rings.object.rotation.y,
                                z: this.maptoglobe.rings.object.rotation.z
                            },
                            scale: {
                                x: this.maptoglobe.rings.object.scale.x,
                                y: this.maptoglobe.rings.object.scale.y,
                                z: this.maptoglobe.rings.object.scale.z
                            }
                        } : undefined
                    },
                    lighting: {
                        sunIntensity: this.menu.light.sunIntensity,
                        ambientIntensity: this.menu.light.ambientIntensity
                    },
                    background: {
                        type: this.menu.background.type,
                        color: this.menu.background.color
                    },
                    atmosphere: {
                        enabled: this.atmosphere.enabled
                    },
                    images: {
                        surface: this.images.surface,
                        clouds: this.images.clouds
                    }
                };
                
                const success = StorageManager.saveState(state);
                if (success) {
                    this.updateStorageInfo();
                }
                return success;
            } catch (error) {
                return false;
            }
        },
        
        loadStoredData() {
            try {
                if (!StorageManager.hasStoredData()) {
                    return;
                }
                
                this.isLoadingStoredData = true; // Prevent auto-save during load
                const stored = StorageManager.loadState();
                
                // Restore moon system
                if (stored.moonSystem.moons.length > 0) {
                    this.maptoglobe.ClearMoonSystem();
                    stored.moonSystem.moons.forEach((moonConfig: StoredMoonConfig) => {
                        this.maptoglobe.AddMoonToSystem(moonConfig);
                        // Initialize moon controls as hidden by default
                        this.moonControlsVisible[moonConfig.id] = false;
                        this.moonTransformControlsVisible[moonConfig.id] = false;
                        this.moonPositionControlsVisible[moonConfig.id] = false;
                        this.moonRotationControlsVisible[moonConfig.id] = false;
                        this.moonScaleControlsVisible[moonConfig.id] = false;
                    });
                }
                this.customMoonCounter = stored.moonSystem.customMoonCounter;
                
                // Restore legacy moon
                if (stored.legacyMoon.visible) {
                    this.moonIsVisible = true;
                    this.maptoglobe.AddMoon();
                    this.menu.moon.scale = stored.legacyMoon.scale;
                    this.menu.moon.distance = stored.legacyMoon.distance;
                    this.menu.moon.rotationSpeed = stored.legacyMoon.rotationSpeed || 0.0;
                    this.menu.moon.color = stored.legacyMoon.color || '#cccccc';
                    this.maptoglobe.moon.Scale(stored.legacyMoon.scale);
                    this.maptoglobe.moon.Distance(stored.legacyMoon.distance);
                    this.maptoglobe.SetMoonRotationSpeed(stored.legacyMoon.rotationSpeed || 0.0);
                    // Apply moon color
                    const numColor = parseInt(this.menu.moon.color.replace('#', ''), 16);
                    this.maptoglobe.SetLegacyMoonColor(numColor);
                }
                
                // Restore planet settings
                this.menu.planet.shininess = stored.planet.shininess;
                this.menu.planet.rotationSpeed = stored.planet.rotationSpeed || 0.0;
                this.menu.planet.shape.scaleX = stored.planet.shape?.scaleX || 1.0;
                this.menu.planet.shape.scaleY = stored.planet.shape?.scaleY || 1.0;
                this.menu.planet.shape.scaleZ = stored.planet.shape?.scaleZ || 1.0;
                ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess = stored.planet.shininess;
                this.maptoglobe.SetPlanetRotationSpeed(this.menu.planet.rotationSpeed);
                this.maptoglobe.SetPlanetShape(this.menu.planet.shape.scaleX, this.menu.planet.shape.scaleY, this.menu.planet.shape.scaleZ);
                
                // Restore cloud settings
                if (stored.clouds) {
                    this.menu.clouds.opacity = stored.clouds.opacity || 1.0;
                    // Note: Cloud opacity restoration will be handled when texture is loaded
                }
                
                // Restore ring settings first
                if (stored.rings) {
                    this.menu.rings.systemType = stored.rings.systemType || 'saturn';
                    // Validate values against slider constraints
                    this.menu.rings.innerRadius = Math.max(0.5, Math.min(8, stored.rings.innerRadius || 3));
                    this.menu.rings.outerRadius = Math.max(1, Math.min(12, stored.rings.outerRadius || 5));
                    this.menu.rings.thickness = Math.max(0.2, Math.min(8, stored.rings.thickness || 2));
                    this.menu.rings.opacity = Math.max(0.1, Math.min(1, stored.rings.opacity || 0.8));
                    this.menu.rings.rotationSpeed = Math.max(0, Math.min(3, stored.rings.rotationSpeed || 0.5));
                    this.menu.rings.color = stored.rings.color || '#ffffff';
                }
                
                // Restore rings visibility and apply configuration
                if (stored.rings?.visible) {
                    this.ringsVisible = true;
                    this.maptoglobe.ToggleRings();
                    
                    // Apply the ring configuration after rings are created
                    setTimeout(() => {
                        this.maptoglobe.LoadRingSystemType(this.menu.rings.systemType);
                        if (this.menu.rings.systemType === 'custom') {
                            this.maptoglobe.SetRingInnerRadius(this.menu.rings.innerRadius);
                            this.maptoglobe.SetRingOuterRadius(this.menu.rings.outerRadius);
                            this.maptoglobe.SetRingOpacity(this.menu.rings.opacity);
                            this.maptoglobe.SetRingRotationSpeed(this.menu.rings.rotationSpeed);
                        } else {
                            // For preset types, still apply custom opacity and rotation if they were modified
                            this.maptoglobe.SetRingOpacity(this.menu.rings.opacity);
                            this.maptoglobe.SetRingRotationSpeed(this.menu.rings.rotationSpeed);
                        }
                        

                        
                        // Restore 3D transformation if it was saved
                        if (stored.rings.transform && this.maptoglobe.rings.object) {
                            const transform = stored.rings.transform;
                            this.maptoglobe.rings.object.position.set(
                                transform.position.x,
                                transform.position.y,
                                transform.position.z
                            );
                            this.maptoglobe.rings.object.rotation.set(
                                transform.rotation.x,
                                transform.rotation.y,
                                transform.rotation.z
                            );
                            this.maptoglobe.rings.object.scale.set(
                                transform.scale.x,
                                transform.scale.y,
                                transform.scale.z
                            );
                        }
                    }, 100); // Small delay to ensure rings are fully created
                }
                
                // Restore lighting
                this.menu.light.sunIntensity = stored.lighting.sunIntensity;
                this.menu.light.ambientIntensity = stored.lighting.ambientIntensity;
                this.maptoglobe.instance.SetSunIntensity(stored.lighting.sunIntensity);
                this.maptoglobe.instance.SetAmbientIntensity(stored.lighting.ambientIntensity);
                
                // Restore background
                if (stored.background) {
                    this.menu.background.type = stored.background.type || 'black';
                    this.menu.background.color = stored.background.color || '#000000';
                    
                    // Apply the background based on type
                    switch (stored.background.type) {
                        case 'black':
                            this.maptoglobe.SetBGBlack();
                            break;
                        case 'transparent':
                            this.maptoglobe.SetBGTransparent();
                            break;
                        case 'color':
                            this.maptoglobe.SetBGColor(stored.background.color || '#000000');
                            break;
                        case 'starfield':
                            this.maptoglobe.SetBGStarfield();
                            break;
                        default:
                            this.maptoglobe.SetBGBlack();
                    }
                }
                
                // Restore other settings
                this.atmosphere.enabled = stored.atmosphere.enabled;
                this.images.surface = stored.images.surface;
                this.images.clouds = stored.images.clouds;
                
                // Restore textures from base64 data
                if (stored.textureData) {
                    this.restoreTextures(stored.textureData);
                }
                
                // Restore individual moon textures
                if (stored.moonSystem && stored.moonSystem.moons) {
                    this.restoreMoonTextures(stored.moonSystem.moons);
                }
                
                this.updateMoonSystemInfo();
            } catch (error) {
                // Error loading stored data - ignore
            } finally {
                this.isLoadingStoredData = false; // Re-enable auto-save
            }
        },
        
        async restoreTextures(textureData: any) {
            try {
                // Restore planet textures
                if (textureData.planet) {
                    if (textureData.planet.surface) {
                        const file = StorageManager.base64ToFile(textureData.planet.surface, 'surface.jpg');
                        this.maptoglobe.planet.SetSurfaceImage(file);
                    }
                    if (textureData.planet.heightmap) {
                        const file = StorageManager.base64ToFile(textureData.planet.heightmap, 'heightmap.jpg');
                        this.maptoglobe.planet.SetHeightmapImage(file);
                    }
                    if (textureData.planet.specular) {
                        const file = StorageManager.base64ToFile(textureData.planet.specular, 'specular.jpg');
                        this.maptoglobe.planet.SetSpecularImage(file);
                    }
                    if (textureData.planet.clouds) {
                        const file = StorageManager.base64ToFile(textureData.planet.clouds, 'clouds.jpg');
                        this.maptoglobe.planet.SetCloudsImage(file);
                        // Apply stored cloud opacity after loading the texture
                        this.maptoglobe.SetCloudOpacity(this.menu.clouds.opacity);
                    }
                }
                
                // Restore moon textures
                if (textureData.moon && textureData.moon.surface) {
                    const file = StorageManager.base64ToFile(textureData.moon.surface, 'moon.jpg');
                    this.maptoglobe.moon.SetSurfaceImage(file);
                }
                
                // Restore rings textures
                if (textureData.rings) {
                    if (textureData.rings.surface) {
                        const file = StorageManager.base64ToFile(textureData.rings.surface, 'rings.jpg');
                        this.maptoglobe.rings.SetSurfaceImage(file);
                    }
                    if (textureData.rings.transparency) {
                        const file = StorageManager.base64ToFile(textureData.rings.transparency, 'rings_transparency.jpg');
                        this.maptoglobe.rings.SetTransparencyImage(file);
                    }
                }
                
                // Restore background texture
                if (textureData.background) {
                    const file = StorageManager.base64ToFile(textureData.background, 'background.jpg');
                    this.maptoglobe.SetBGImage(file);
                }
            } catch (error) {
                console.warn('Failed to restore some textures:', error);
            }
        },
        
        async restoreMoonTextures(moons: any[]) {
            try {
                for (const moon of moons) {
                    if (moon.textureData) {
                        const file = StorageManager.base64ToFile(moon.textureData, `moon_${moon.id}.jpg`);
                        this.maptoglobe.SetMoonTexture(moon.id, file);
                    }
                }
            } catch (error) {
                console.warn('Failed to restore moon textures:', error);
            }
        },
        
        clearCanvas() {
            try {
                // Clear the 3D scene
                this.maptoglobe.ClearMoonSystem();
                this.maptoglobe.RemoveMoon();
                if (this.ringsVisible) {
                    this.maptoglobe.ToggleRings();
                }
                
                // Reset all UI state to defaults
                this.moonIsVisible = false;
                this.ringsVisible = false;
                this.customMoonCounter = 1;
                this.moonControlsVisible = {};
                this.moonTransformControlsVisible = {};
                this.moonPositionControlsVisible = {};
                this.moonRotationControlsVisible = {};
                this.moonScaleControlsVisible = {};
                
                // Reset menu values to defaults
                this.menu.planet.shininess = 60;
                this.menu.planet.rotationSpeed = 0.0;
                this.menu.planet.shape.scaleX = 1.0;
                this.menu.planet.shape.scaleY = 1.0;
                this.menu.planet.shape.scaleZ = 1.0;
                this.menu.moon.scale = 1;
                this.menu.moon.distance = 3;
                this.menu.moon.rotationSpeed = 0.0;
                this.menu.moon.color = '#cccccc';
                this.menu.light.sunIntensity = 0.4;
                this.menu.light.ambientIntensity = 0.6;
                
                // Reset ring values to defaults
                this.menu.rings.systemType = 'saturn';
                this.menu.rings.innerRadius = 2.0;   // Within slider bounds (0.5-8)
                this.menu.rings.outerRadius = 4.0;   // Within slider bounds (1-12)
                this.menu.rings.thickness = 2.0;     // Within slider bounds (0.2-8)
                this.menu.rings.opacity = 0.8;       // Within slider bounds (0.1-1)
                this.menu.rings.rotationSpeed = 0.5; // Within slider bounds (0-3)
                this.menu.rings.color = '#ffffff';   // Default white color

                
                // Reset background to defaults
                this.menu.background.type = 'black';
                this.menu.background.color = '#000000';
                
                // Reset cloud settings
                this.menu.clouds.opacity = 1.0;
                
                // Reset image flags
                this.images.surface = false;
                this.images.clouds = false;
                this.atmosphere.enabled = false;
                
                // Apply default values to the 3D scene
                ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess = 60;
                this.maptoglobe.instance.SetSunIntensity(0.4);
                this.maptoglobe.instance.SetAmbientIntensity(0.6);
                
                // Reset planet rotation and shape
                this.maptoglobe.SetPlanetRotationSpeed(0.0);
                this.maptoglobe.SetPlanetShape(1.0, 1.0, 1.0);
                
                // Reset legacy moon rotation
                this.maptoglobe.SetMoonRotationSpeed(0.0);
                
                // Reset background
                this.maptoglobe.SetBGBlack();
                
                // Clear local storage
                StorageManager.clearState();
                this.updateStorageInfo();
                this.updateMoonSystemInfo();
            } catch (error) {
                // Error clearing canvas - ignore
            }
        },
        toggleNavPanel() {
            this.navPanelVisible = !this.navPanelVisible;
            this.$emit('nav-toggle', this.navPanelVisible);
        },
        
        startEditMoonName(moonId: string, currentName: string) {
            this.editingMoonName = moonId;
            this.editingMoonNameValue = currentName;
            nextTick(() => {
                const input = this.$refs[`moonNameInput_${moonId}`] as HTMLInputElement[];
                if (input && input[0]) {
                    input[0].focus();
                    input[0].select();
                }
            });
        },
        
        saveMoonName(moonId: string) {
            if (this.editingMoonNameValue.trim() && this.editingMoonNameValue.trim() !== '') {
                this.maptoglobe.RenameMoon(moonId, this.editingMoonNameValue.trim());
                this.updateMoonSystemInfo();
                this.saveCurrentState();
            }
            this.cancelEditMoonName();
        },
        
        cancelEditMoonName() {
            this.editingMoonName = null;
            this.editingMoonNameValue = '';
        },
        
        toggleMoonControlsVisibility(moonId: string) {
            this.moonControlsVisible[moonId] = !this.moonControlsVisible[moonId];
        },
        
        toggleMoonTransformControls(moonId: string) {
            this.moonTransformControlsVisible[moonId] = !this.moonTransformControlsVisible[moonId];
        },
        
        resetMoonTransform(moonId: string) {
            this.maptoglobe.UpdateMoonPosition(moonId, 0, 0, 0);
            this.maptoglobe.UpdateMoonRotation(moonId, 0, 0, 0);
            this.maptoglobe.UpdateMoonScale(moonId, 1, 1, 1);
            this.updateMoonSystemInfo();
        },
        toggleMoonControls(event: Event, moonId: string, control: 'position' | 'rotation' | 'scale') {
            const property = `moon${control.charAt(0).toUpperCase() + control.slice(1)}ControlsVisible` as 'moonPositionControlsVisible' | 'moonRotationControlsVisible' | 'moonScaleControlsVisible';
            const isActivating = !this[property][moonId];
            
            // If activating a control, first deactivate ALL other transform controls
            if (isActivating) {
                this.deactivateAllMoonTransformControls();
            }
            
            // Now toggle the specific control
            this[property][moonId] = isActivating;
            
            // Toggle the visual transform controls
            const moon = this.maptoglobe.GetMoonById(moonId);
            
            // Validate that moon exists and is visible before attaching controls
            const moonInfo = this.moonSystemInfo.moons.find(m => m.id === moonId);
            const isMoonVisible = moonInfo?.visible === true;
            
            // Debug logging
            // eslint-disable-next-line no-console
            console.log('Toggle moon controls:', { moonId, control, moon: !!moon, isMoonVisible, isActivating });
            
            if (moon && moon.object && isMoonVisible) {
                if (isActivating) {
                    // Set the transform control mode and attach to moon
                    this.maptoglobe.SetTransformMode(control);
                    this.maptoglobe.ToggleControls(moon.object);
                    // eslint-disable-next-line no-console
                    console.log('Attached controls to moon:', moonId, control);
                } else {
                    // Detach transform controls
                    this.maptoglobe.ToggleControls(moon.object);
                    // eslint-disable-next-line no-console
                    console.log('Detached controls from moon:', moonId, control);
                }
            } else {
                // If moon is not visible or doesn't exist, ensure controls are detached
                // and reset the UI state
                this[property][moonId] = false;
                // eslint-disable-next-line no-console
                console.warn('Moon not available for controls:', { moonId, moon: !!moon, isMoonVisible });
                
                // Try to detach any existing controls
                if (this.maptoglobe.instance.controls.object) {
                    this.maptoglobe.instance.controls.detach();
                }
            }
        },
        
        // Helper method to detach all transform controls for a specific moon
        detachMoonControls(moonId: string) {
            // Reset all control visibility states for this moon
            this.moonPositionControlsVisible[moonId] = false;
            this.moonRotationControlsVisible[moonId] = false;
            this.moonScaleControlsVisible[moonId] = false;
            
            // Get the moon object and detach controls if they're currently attached
            const moon = this.maptoglobe.GetMoonById(moonId);
            if (moon && moon.object) {
                // Check if this moon's object is currently being controlled
                const isCurrentlyControlled = this.maptoglobe.instance.controls.object === moon.object;
                if (isCurrentlyControlled) {
                    this.maptoglobe.ToggleControls(moon.object); // This will detach
                }
            }
        },
        
        // Helper method to deactivate ALL transform controls across all moons
        deactivateAllMoonTransformControls() {
            // Detach any currently active transform controls
            if (this.maptoglobe.instance.controls.object) {
                this.maptoglobe.instance.controls.detach();
            }
            
            // Reset all UI states for all moons
            for (const moonId of Object.keys(this.moonPositionControlsVisible)) {
                this.moonPositionControlsVisible[moonId] = false;
            }
            for (const moonId of Object.keys(this.moonRotationControlsVisible)) {
                this.moonRotationControlsVisible[moonId] = false;
            }
            for (const moonId of Object.keys(this.moonScaleControlsVisible)) {
                this.moonScaleControlsVisible[moonId] = false;
            }
        }
    }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input:checked + svg, input[type=file]:valid + svg, input:checked + div > div > svg {
        display: block;
    }

    .menuCheckbox {
        grid-template-columns: 80% 1fr;
    }

    input:disabled + label, input:disabled + div, input:disabled + div > label, button:disabled {
        opacity: 0.4;
        cursor: default;
    }

    /* Modern toggle switch styles */
    .dot {
        transition: transform 0.3s ease-in-out;
    }

    /* Radio button styles */
    input[type="radio"]:checked + .relative .radio-dot,
    input[type="radio"]:checked + div .radio-dot {
        opacity: 1;
    }

    .radio-dot {
        transition: opacity 0.2s ease-in-out;
    }

    /* Color picker styling */
    input[type="color"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        width: 48px;
        height: 32px;
        border: none;
        cursor: pointer;
    }

    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        border: 2px solid #4b5563;
        border-radius: 4px;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
        border-radius: 2px;
    }

    input[type="color"]::-moz-color-swatch {
        border: 2px solid #4b5563;
        border-radius: 4px;
    }

    /* Smooth animations for collapsible sections */
    [v-show] {
        transition: all 0.3s ease-in-out;
    }
    
    /* Smooth transitions for moon controls */
    .space-y-2 {
        transition: all 0.3s ease-in-out;
    }

    /* Ensure nav background is always solid */
    .nav-container {
        background: linear-gradient(to bottom, #111827, #000000, #111827) !important;
        backdrop-filter: blur(10px);
        width: 320px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
    }
    
    /* Smooth transition for navigation panel */
    .nav-container {
        transition: transform 0.3s ease-in-out;
    }
    
    /* Toggle button positioning */
    .nav-toggle {
        transition: left 0.3s ease-in-out;
    }
    
    /* Improved input styling for moon name editing */
    input[class*="focus:border-purple-400"] {
        transition: border-color 0.2s ease-in-out;
    }
    
    input[class*="focus:border-purple-400"]:focus {
        box-shadow: 0 0 0 1px rgba(147, 51, 234, 0.3);
    }

    /* Custom scrollbar for the navigation */
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(51, 65, 85, 0.3);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(100, 116, 139, 0.5);
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: rgba(100, 116, 139, 0.7);
    }

    /* Rotating planet animation */
    .rotating-planet {
        animation: rotate 20s linear infinite;
        transform-origin: center;
    }

    .rotating-planet .continents {
        animation: rotateContinents 20s linear infinite;
        transform-origin: 50px 50px;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes rotateContinents {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
