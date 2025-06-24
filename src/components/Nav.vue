<template>
    <div class="h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-y-auto shadow-2xl border-r border-gray-800 relative z-30 nav-container">
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
                        <h4 class="text-gray-400 px-4 py-3 text-sm font-medium border-b border-gray-800">Textures</h4>
                        
                        <div class="p-2 space-y-2">
                            <div>
                                <input type="file" class="hidden" id="surfaceFileSelect" @change="setSurfaceImage">
                                <label for="surfaceFileSelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors">
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                        </svg>
                                        Surface Texture
                                    </span>
                                </label>
                            </div>
                            <div>
                                <input type="file" class="hidden" id="heightmapFileSelect" @change="setHeightmapImage" :disabled="!images.surface">
                                <label for="heightmapFileSelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors">
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                        </svg>
                                        Height Map
                                    </span>
                                </label>
                            </div>
                            <div>
                                <input type="file" class="hidden" id="specularFileSelect" @change="setSpecularImage" :disabled="!images.surface">
                                <label for="specularFileSelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors">
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Specular Map
                                    </span>
                                </label>
                            </div>
                            <div>
                                <input type="file" class="hidden" id="cloudsFileSelect" @change="setCloudsImage" :disabled="!images.surface">
                                <label for="cloudsFileSelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors">
                                    <span class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                        </svg>
                                        Cloud Layer
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div class="border-t border-gray-800 p-2">
                            <h5 class="text-gray-400 px-2 py-2 text-xs font-medium">Controls</h5>
                            <div class="space-y-2">
                                <button type="button" class="cursor-pointer text-left w-full py-2 px-4 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors" @click="toggleAxis">
                                    Toggle Axis
                                </button>
                                <button type="button" class="cursor-pointer text-left w-full py-2 px-4 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors" value="planet" @click="toggleControls">
                                    Toggle Planet Controls
                                </button>
                                <button type="button" class="cursor-pointer text-left w-full py-2 px-4 text-sm text-gray-200 hover:bg-blue-500/20 hover:text-blue-300 rounded transition-colors" value="clouds" @click="toggleControls" :disabled="!images.clouds">
                                    Toggle Cloud Controls
                                </button>
                            </div>
                            
                            <div class="mt-4">
                                <label class="block text-xs text-gray-400 mb-2">Shininess</label>
                                <div class="px-2">
                                    <vue-slider v-model="menu.planet.shininess" :min="0" :max="100" :interval="0.1" :tooltip="'none'" @change="planetShininess"></vue-slider>
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
                        <div class="p-4">
                            <!-- Legacy Single Moon Toggle -->
                            <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
                                <label class="text-sm font-medium text-gray-200">Legacy Moon</label>
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

                            <!-- Moon System Presets -->
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-200 mb-3">Moon System Presets</label>
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

                            <!-- System Controls -->
                            <div class="mb-4 flex gap-2">
                                <button @click="showAllMoons" 
                                        class="flex-1 py-2 px-3 text-xs text-gray-200 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors">
                                    Show All
                                </button>
                                <button @click="hideAllMoons" 
                                        class="flex-1 py-2 px-3 text-xs text-gray-200 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors">
                                    Hide All
                                </button>
                                <button @click="clearMoonSystem" 
                                        class="flex-1 py-2 px-3 text-xs text-gray-200 bg-gray-500/20 hover:bg-gray-500/30 rounded transition-colors">
                                    Clear
                                </button>
                            </div>

                            <!-- Individual Moon Controls -->
                            <div v-if="moonSystemInfo.totalMoons > 0" class="space-y-3">
                                <h4 class="text-sm font-medium text-gray-200 border-t border-gray-700 pt-3">Individual Moons</h4>
                                <div v-for="moon in moonSystemInfo.moons" :key="moon.id" 
                                     class="bg-gray-800/50 rounded-lg p-3 space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-gray-200">{{ moon.name }}</span>
                                        <div class="flex items-center gap-2">
                                            <button @click="toggleMoonVisibility(moon.id)" 
                                                    class="px-2 py-1 text-xs rounded transition-colors"
                                                    :class="moon.visible ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'">
                                                {{ moon.visible ? 'Visible' : 'Hidden' }}
                                            </button>
                                            <button @click="removeMoon(moon.id)" 
                                                    class="px-2 py-1 text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div v-if="moon.visible" class="space-y-2 pl-2 border-l-2 border-purple-500/30">
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
                                            <input type="file" class="hidden" :id="`moonTexture_${moon.id}`" @change="(event) => setMoonTexture(moon.id, event)">
                                            <label :for="`moonTexture_${moon.id}`" class="cursor-pointer py-1 px-2 block text-xs text-gray-200 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors">
                                                <span class="flex items-center">
                                                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                    </svg>
                                                    Custom Texture
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Add Custom Moon -->
                            <div class="mt-4 pt-3 border-t border-gray-700">
                                <button @click="addCustomMoon" 
                                        class="w-full py-2 px-4 text-sm text-gray-200 bg-purple-500/20 hover:bg-purple-500/30 rounded transition-colors flex items-center justify-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Custom Moon
                                </button>
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
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-4">
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

                            <div v-if="ringsVisible" class="space-y-4">
                                <!-- Ring System Type Presets -->
                                <div>
                                    <h4 class="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Ring System Type</h4>
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

                                <!-- Ring Size Controls -->
                                <div v-if="menu.rings.systemType === 'custom'">
                                    <h4 class="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Size & Scale</h4>
                                    <div class="space-y-3">
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Inner Radius: {{ menu.rings.innerRadius.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.innerRadius" :min="0.5" :max="8" :interval="0.1" :tooltip="'none'" @change="updateRingInnerRadius"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Outer Radius: {{ menu.rings.outerRadius.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.outerRadius" :min="1" :max="12" :interval="0.1" :tooltip="'none'" @change="updateRingOuterRadius"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Thickness: {{ menu.rings.thickness.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.thickness" :min="0.2" :max="8" :interval="0.1" :tooltip="'none'" @change="updateRingThickness"></vue-slider>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ring Appearance Controls -->
                                <div>
                                    <h4 class="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Appearance</h4>
                                    <div class="space-y-3">
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Opacity: {{ menu.rings.opacity.toFixed(2) }}</label>
                                            <vue-slider v-model="menu.rings.opacity" :min="0.1" :max="1" :interval="0.01" :tooltip="'none'" @change="updateRingOpacity"></vue-slider>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-1">Rotation Speed: {{ menu.rings.rotationSpeed.toFixed(1) }}</label>
                                            <vue-slider v-model="menu.rings.rotationSpeed" :min="0" :max="3" :interval="0.1" :tooltip="'none'" @change="updateRingRotationSpeed"></vue-slider>
                                        </div>
                                    </div>
                                </div>

                                <!-- Texture Controls -->
                                <div>
                                    <h4 class="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Textures</h4>
                                    <div class="space-y-2">
                                        <div>
                                            <input type="file" class="hidden" id="ringsSurfaceSelect" @change="setRingsImage">
                                            <label for="ringsSurfaceSelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors">
                                                <span class="flex items-center">
                                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                                    </svg>
                                                    Surface Texture
                                                </span>
                                            </label>
                                        </div>
                                        <div>
                                            <input type="file" class="hidden" id="ringsTransparencySelect" @change="setRingsTransparency">
                                            <label for="ringsTransparencySelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors">
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

                                <!-- Controls Toggle -->
                                <div>
                                    <button type="button" class="cursor-pointer text-left w-full py-2 px-4 text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors" value="rings" @click="toggleControls">
                                        Toggle Ring Controls
                                    </button>
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
                            <h4 class="text-gray-400 text-sm font-medium mb-3">Background Type</h4>
                            
                            <div class="space-y-3">
                                <label class="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                                    <input type="radio" name="bgType" class="sr-only" id="blackBG" @change="setBgBlack" checked>
                                    <div class="w-4 h-4 border-2 border-gray-700 rounded-full mr-3 relative">
                                        <div class="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 radio-dot"></div>
                                    </div>
                                    <span class="text-sm text-gray-200">Solid Black</span>
                                </label>
                                
                                <label class="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                                    <input type="radio" name="bgType" class="sr-only" id="transparentBG" @change="setBgTransparent">
                                    <div class="w-4 h-4 border-2 border-gray-700 rounded-full mr-3 relative">
                                        <div class="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 radio-dot"></div>
                                    </div>
                                    <span class="text-sm text-gray-200">Transparent</span>
                                </label>
                                
                                <label class="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                                    <input type="radio" name="bgType" class="sr-only" id="imageBGRadio" @change="triggerImageSelect">
                                    <div class="w-4 h-4 border-2 border-gray-700 rounded-full mr-3 relative">
                                        <div class="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 radio-dot"></div>
                                    </div>
                                    <span class="text-sm text-gray-200">Custom Image</span>
                                    <input type="file" class="hidden" id="imageBG" @change="setBgImage">
                                </label>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueSlider from 'vue-slider-component';
import Loader from '@/components/Loader.vue';
import 'vue-slider-component/theme/antd.css';
import MapToGlobe from '../assets/MapToGlobe/MapToGlobe';
import * as THREE from 'three';
import { StorageManager, StoredAppState, StoredMoonConfig } from '../utils/storage';

interface CanvasElement extends HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
}

export default defineComponent({
    components: {
        VueSlider,
        Loader
    },
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
                    moon: false,
                    rings: false,
                    background: false,
                    lights: false
                },
                planet: {
                    shininess: 60
                },
                moon: {
                    controls: false,
                    scale: 1,
                    distance: 3
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
                    rotationSpeed: 0.5 // Already within bounds (0-3)
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
                }>
            },
            customMoonCounter: 1,
            hasStoredData: false,
            storageInfo: { size: 0, timestamp: undefined as number | undefined },
            isLoadingStoredData: false,
            ringUpdateTimeout: null as number | null
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => { if (this.$route.params.saveId.length > 0) this.Load(this.$route.params.saveId as string) },
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
        
        // Initialize moon system info
        this.updateMoonSystemInfo();
        
        // Load stored data and update storage info
        this.loadStoredData();
        this.updateStorageInfo();
    },
    methods: {
        setSurfaceImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.planet.SetSurfaceImage(files[0]);
                this.images.surface = true;
            }
        },
        setHeightmapImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.planet.SetHeightmapImage(files[0]);
            }
        },
        setSpecularImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.planet.SetSpecularImage(files[0]);
            }
        },
        toggleAxis() {
            this.maptoglobe.planet.ToggleAxis();
        },
        toggleAtmosphere() {
            //this.maptoglobe.planet.ToggleAtmosphere();
            return;
        },
        setCloudsImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.planet.SetCloudsImage(files[0]);
                this.images.clouds = true;
            }
        },
        planetShininess(value: number) {
            ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess = value;
            this.saveCurrentState();
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
        setMoonImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.moon.SetSurfaceImage(files[0]);
            }
        },
        toggleRings() {
            this.ringsVisible = !this.ringsVisible;
            this.maptoglobe.ToggleRings();
            this.saveCurrentState();
        },
        setRingsImage(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.rings.SetSurfaceImage(files[0]);
            }
        },
        setRingsTransparency(event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null)
                this.maptoglobe.rings.SetTransparencyImage(files[0]);
        },
        
        // NEW RING CONTROL METHODS
        setRingSystemType(type: 'saturn' | 'uranus' | 'jupiter' | 'custom') {
            // Auto-enable rings if they're not visible and user selected a preset
            if (!this.ringsVisible && type !== 'custom') {
                this.ringsVisible = true;
                this.maptoglobe.ToggleRings();
            }
            
            this.menu.rings.systemType = type;
            this.maptoglobe.LoadRingSystemType(type);
            
            // Update UI values based on the selected system type
            if (type !== 'custom') {
                const config = this.maptoglobe.GetRingConfig();
                this.menu.rings.innerRadius = config.innerRadius;
                this.menu.rings.outerRadius = config.outerRadius;
                this.menu.rings.thickness = config.outerRadius - config.innerRadius;
                this.menu.rings.opacity = config.opacity;
                this.menu.rings.rotationSpeed = config.rotationSpeed;
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
        
        debounceRingUpdate(callback: () => void) {
            if (this.ringUpdateTimeout) {
                clearTimeout(this.ringUpdateTimeout);
            }
            this.ringUpdateTimeout = setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    console.error('Error in ring update:', error);
                }
                this.ringUpdateTimeout = null;
            }, 100); // 100ms debounce
        },
        setBgBlack() {
            this.maptoglobe.SetBGBlack();
        },
        setBgTransparent() {
            this.maptoglobe.SetBGTransparent();
        },
        triggerImageSelect() {
            const fileInput = document.getElementById('imageBG') as HTMLInputElement;
            if (fileInput) {
                fileInput.click();
            }
        },
        setBgImage(event: Event) {
            const radioButton = document.querySelector("#imageBGRadio") as HTMLInputElement;
            if (radioButton) {
                radioButton.checked = true;
            }
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.SetBGImage(files[0]);
            }
        },
        toggleControls(event: Event) {
            const target = (event.target as HTMLButtonElement).value;
            switch (target) {
                case "planet":
                    this.maptoglobe.ToggleControls(this.maptoglobe.planet.object);
                    break;
                case "rings":
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
                    this.maptoglobe.ToggleControls(this.maptoglobe.planet.object.getObjectByName("clouds") as THREE.Mesh);
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
                this.$nextTick(() => {
                    this.saveCurrentState();
                });
            }
        },
        
        loadMoonPreset(presetName: 'earth' | 'jupiter' | 'saturn' | 'custom') {
            this.maptoglobe.LoadMoonPreset(presetName);
            this.updateMoonSystemInfo();
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
            this.maptoglobe.ClearMoonSystem();
            this.updateMoonSystemInfo();
        },
        
        toggleMoonVisibility(moonId: string) {
            const moon = this.moonSystemInfo.moons.find(m => m.id === moonId);
            if (moon) {
                if (moon.visible) {
                    this.maptoglobe.HideMoon(moonId);
                } else {
                    this.maptoglobe.ShowMoon(moonId);
                }
                this.updateMoonSystemInfo();
            }
        },
        
        removeMoon(moonId: string) {
            this.maptoglobe.RemoveMoonFromSystem(moonId);
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
        
        setMoonTexture(moonId: string, event: Event) {
            const files = (event.target as HTMLInputElement).files;
            if (files !== null) {
                this.maptoglobe.SetMoonTexture(moonId, files[0]);
            }
        },
        
        addCustomMoon() {
            const moonConfig = {
                id: `custom_${this.customMoonCounter}`,
                name: `Custom Moon ${this.customMoonCounter}`,
                size: 0.3,
                distance: 8 + (this.customMoonCounter * 3),
                orbitSpeed: 1.0,
                rotationSpeed: 1.0,
                visible: true,
                color: Math.floor(Math.random() * 0xffffff)
            };
            
            this.maptoglobe.AddMoonToSystem(moonConfig);
            this.customMoonCounter++;
            this.updateMoonSystemInfo();
        },
        makeGif() {
            this.maptoglobe.Gif(document.getElementById("scene") as CanvasElement);
        },
        async Load(item: string) {
            // Load functionality removed - no longer supported without Firebase
            console.warn('Load functionality is not available without Firebase configuration');
        },
        
        // Storage Management Methods
        updateStorageInfo() {
            this.hasStoredData = StorageManager.hasStoredData();
            this.storageInfo = StorageManager.getStorageInfo();
        },
        
        saveCurrentState() {
            try {
                // Get fresh moon system info to ensure we have the latest data
                const currentMoonInfo = this.maptoglobe.GetMoonSystemInfo();
                const allMoons = this.maptoglobe.GetAllMoons();
                
                const state: Partial<StoredAppState> = {
                    moonSystem: {
                        moons: currentMoonInfo.moons.map(moon => ({
                            id: moon.id,
                            name: moon.name,
                            size: moon.size,
                            distance: moon.distance,
                            orbitSpeed: moon.orbitSpeed,
                            rotationSpeed: moon.rotationSpeed,
                            visible: moon.visible,
                            color: allMoons.find(m => m.config.id === moon.id)?.config.color
                        })),
                        customMoonCounter: this.customMoonCounter
                    },
                    legacyMoon: {
                        visible: this.moonIsVisible,
                        scale: this.menu.moon.scale,
                        distance: this.menu.moon.distance
                    },
                    planet: {
                        shininess: this.menu.planet.shininess
                    },
                    rings: {
                        visible: this.ringsVisible,
                        systemType: this.menu.rings.systemType,
                        innerRadius: this.menu.rings.innerRadius,
                        outerRadius: this.menu.rings.outerRadius,
                        thickness: this.menu.rings.thickness,
                        opacity: this.menu.rings.opacity,
                        rotationSpeed: this.menu.rings.rotationSpeed
                    },
                    lighting: {
                        sunIntensity: this.menu.light.sunIntensity,
                        ambientIntensity: this.menu.light.ambientIntensity
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
                } else {
                    console.error('Failed to save state');
                }
                return success;
            } catch (error) {
                console.error('Error saving state:', error);
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
                    stored.moonSystem.moons.forEach(moonConfig => {
                        this.maptoglobe.AddMoonToSystem(moonConfig);
                    });
                }
                this.customMoonCounter = stored.moonSystem.customMoonCounter;
                
                // Restore legacy moon
                if (stored.legacyMoon.visible) {
                    this.moonIsVisible = true;
                    this.maptoglobe.AddMoon();
                    this.menu.moon.scale = stored.legacyMoon.scale;
                    this.menu.moon.distance = stored.legacyMoon.distance;
                    this.maptoglobe.moon.Scale(stored.legacyMoon.scale);
                    this.maptoglobe.moon.Distance(stored.legacyMoon.distance);
                }
                
                // Restore planet settings
                this.menu.planet.shininess = stored.planet.shininess;
                ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess = stored.planet.shininess;
                
                // Restore rings
                if (stored.rings.visible) {
                    this.ringsVisible = true;
                    this.maptoglobe.ToggleRings();
                }
                
                // Restore ring settings (regardless of visibility)
                if (stored.rings.systemType) {
                    this.menu.rings.systemType = stored.rings.systemType;
                    // Validate values against slider constraints
                    this.menu.rings.innerRadius = Math.max(0.5, Math.min(8, stored.rings.innerRadius || 3));
                    this.menu.rings.outerRadius = Math.max(1, Math.min(12, stored.rings.outerRadius || 5));
                    this.menu.rings.thickness = Math.max(0.2, Math.min(8, stored.rings.thickness || 2));
                    this.menu.rings.opacity = Math.max(0.1, Math.min(1, stored.rings.opacity || 0.8));
                    this.menu.rings.rotationSpeed = Math.max(0, Math.min(3, stored.rings.rotationSpeed || 0.5));
                    
                    // Apply the ring configuration
                    this.maptoglobe.LoadRingSystemType(stored.rings.systemType);
                    if (stored.rings.systemType === 'custom') {
                        this.maptoglobe.SetRingInnerRadius(stored.rings.innerRadius);
                        this.maptoglobe.SetRingOuterRadius(stored.rings.outerRadius);
                        this.maptoglobe.SetRingOpacity(stored.rings.opacity);
                        this.maptoglobe.SetRingRotationSpeed(stored.rings.rotationSpeed);
                    }
                }
                
                // Restore lighting
                this.menu.light.sunIntensity = stored.lighting.sunIntensity;
                this.menu.light.ambientIntensity = stored.lighting.ambientIntensity;
                this.maptoglobe.instance.SetSunIntensity(stored.lighting.sunIntensity);
                this.maptoglobe.instance.SetAmbientIntensity(stored.lighting.ambientIntensity);
                
                // Restore other settings
                this.atmosphere.enabled = stored.atmosphere.enabled;
                this.images.surface = stored.images.surface;
                this.images.clouds = stored.images.clouds;
                
                this.updateMoonSystemInfo();
            } catch (error) {
                console.error('Error loading stored data:', error);
            } finally {
                this.isLoadingStoredData = false; // Re-enable auto-save
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
                
                // Reset menu values to defaults
                this.menu.planet.shininess = 60;
                this.menu.moon.scale = 1;
                this.menu.moon.distance = 3;
                this.menu.light.sunIntensity = 0.4;
                this.menu.light.ambientIntensity = 0.6;
                
                // Reset ring values to defaults
                this.menu.rings.systemType = 'saturn';
                this.menu.rings.innerRadius = 2.0;   // Within slider bounds (0.5-8)
                this.menu.rings.outerRadius = 4.0;   // Within slider bounds (1-12)
                this.menu.rings.thickness = 2.0;     // Within slider bounds (0.2-8)
                this.menu.rings.opacity = 0.8;       // Within slider bounds (0.1-1)
                this.menu.rings.rotationSpeed = 0.5; // Within slider bounds (0-3)
                
                // Reset image flags
                this.images.surface = false;
                this.images.clouds = false;
                this.atmosphere.enabled = false;
                
                // Apply default values to the 3D scene
                ((this.maptoglobe.planet.object.material as THREE.Material[])[0] as THREE.MeshPhongMaterial).shininess = 60;
                this.maptoglobe.instance.SetSunIntensity(0.4);
                this.maptoglobe.instance.SetAmbientIntensity(0.6);
                
                // Clear local storage
                StorageManager.clearState();
                this.updateStorageInfo();
                this.updateMoonSystemInfo();
            } catch (error) {
                console.error('Error clearing canvas:', error);
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
    input[type="radio"]:checked + .relative .radio-dot {
        opacity: 1;
    }

    .radio-dot {
        transition: opacity 0.2s ease-in-out;
    }

    /* Smooth animations for collapsible sections */
    [v-show] {
        transition: all 0.3s ease-in-out;
    }

    /* Ensure nav background is always solid */
    .nav-container {
        background: linear-gradient(to bottom, #111827, #000000, #111827) !important;
        backdrop-filter: blur(10px);
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
