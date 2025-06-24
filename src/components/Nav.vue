<template>
    <div class="h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-y-auto shadow-2xl border-r border-gray-800">
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
                <h3 class="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center">
                    <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Objects
                </h3>
                
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

                <!-- Moon -->
                <div class="mb-4">
                    <button @click="menu.open.moon = !menu.open.moon" 
                            class="w-full flex justify-between items-center py-3 px-4 text-gray-100 cursor-pointer hover:bg-gray-800/50 focus:outline-none rounded-lg transition-all duration-200 hover:shadow-lg group">
                        <span class="flex items-center">
                            <div class="p-2 bg-purple-500/20 rounded-lg mr-3 group-hover:bg-purple-500/30 transition-colors">
                                <svg class="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <span class="font-medium">Moon</span>
                        </span>
                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.open.moon }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>

                    <div v-show="menu.open.moon" class="bg-gray-900/50 rounded-lg mt-2 overflow-hidden">
                        <div class="p-4">
                            <div class="flex items-center justify-between mb-4">
                                <label class="text-sm font-medium text-gray-200">Show Moon</label>
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

                            <div class="space-y-3">
                                <div>
                                    <input type="file" class="hidden" id="moonSurfaceSelect" @change="setMoonImage" :disabled="!moonIsVisible">
                                    <label for="moonSurfaceSelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors">
                                        <span class="flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                            </svg>
                                            Surface Texture
                                        </span>
                                    </label>
                                </div>

                                <div v-if="moonIsVisible">
                                    <button @click="menu.moon.controls = !menu.moon.controls" 
                                            class="w-full flex justify-between items-center py-2 px-4 text-gray-200 text-sm hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors">
                                        <span>Controls</span>
                                        <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-90': menu.moon.controls }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </button>

                                    <div v-show="menu.moon.controls" class="mt-3 space-y-3 pl-4">
                                        <button type="button" class="cursor-pointer text-left w-full py-2 px-3 text-xs text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors" value="orbit" @click="toggleControls">
                                            Orbit Controls
                                        </button>
                                        <button type="button" class="cursor-pointer text-left w-full py-2 px-3 text-xs text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 rounded transition-colors" value="rotation" @click="toggleControls">
                                            Rotation Controls
                                        </button>
                                        
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">Scale: {{ menu.moon.scale }}</label>
                                            <vue-slider v-model="menu.moon.scale" :min="0.1" :max="4" :interval="0.1" :tooltip="'none'" @change="moonScale"></vue-slider>
                                        </div>
                                        
                                        <div>
                                            <label class="block text-xs text-gray-400 mb-2">Distance: {{ menu.moon.distance }}</label>
                                            <vue-slider v-model="menu.moon.distance" :min="3" :max="20" :interval="0.1" :tooltip="'none'" @change="moonDistance"></vue-slider>
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

                            <div class="space-y-3">
                                <div>
                                    <input type="file" class="hidden" id="ringsSurfaceSelect" @change="setRingsImage" :disabled="!ringsVisible">
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
                                    <input type="file" class="hidden" id="ringsTransparencySelect" @change="setRingsTransparency" :disabled="!ringsVisible">
                                    <label for="ringsTransparencySelect" class="cursor-pointer py-2 px-4 block text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors">
                                        <span class="flex items-center">
                                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                            </svg>
                                            Transparency Map
                                        </span>
                                    </label>
                                </div>

                                <div v-if="ringsVisible">
                                    <button type="button" class="cursor-pointer text-left w-full py-2 px-4 text-sm text-gray-200 hover:bg-amber-500/20 hover:text-amber-300 rounded transition-colors" value="rings" @click="toggleControls">
                                        Toggle Controls
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
                                
                                <div class="cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                                    <input type="file" class="hidden" id="imageBG" @change="setBgImage">
                                    <label for="imageBG" class="flex items-center cursor-pointer">
                                        <div class="w-4 h-4 border-2 border-gray-700 rounded-full mr-3"></div>
                                        <span class="text-sm text-gray-200">Custom Image</span>
                                    </label>
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

            <!-- Export Section -->
            <div class="mb-6">
                <h3 class="text-gray-400 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center">
                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Export
                </h3>
                
                <div class="space-y-2">
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
            maptoglobe: {} as MapToGlobe
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
        },
        toggleMoon() {
            this.moonIsVisible = !this.moonIsVisible;
            if (this.moonIsVisible) {
                this.maptoglobe.AddMoon();
            }
            else {
                this.maptoglobe.RemoveMoon();
            }
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
        setBgBlack() {
            this.maptoglobe.SetBGBlack();
        },
        setBgTransparent() {
            this.maptoglobe.SetBGTransparent();
        },
        setBgImage(event: Event) {
            (document.querySelector("#imageBG + input") as HTMLInputElement).checked = true;
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
        },
        moonDistance(value: number) {
            this.maptoglobe.moon.Distance(value);
        },
        sunIntensity(value: number) {
            this.maptoglobe.instance.SetSunIntensity(value);
        },
        ambientIntensity(value: number) {
            this.maptoglobe.instance.SetAmbientIntensity(value);
        },
        takeScreenshot() {
            this.maptoglobe.Screenshot(document.getElementById("scene") as CanvasElement);
        },
        makeGif() {
            this.maptoglobe.Gif(document.getElementById("scene") as CanvasElement);
        },
        async Load(item: string) {
            // Load functionality removed - no longer supported without Firebase
            console.warn('Load functionality is not available without Firebase configuration');
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
