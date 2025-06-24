<template>
    <aside class="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-700 shadow-xl z-10">
        <!-- Header -->
        <div class="p-6 border-b border-gray-700">
            <router-link to="/" class="flex items-center space-x-3 group">
                <!-- Rotating Planet SVG -->
                <div class="relative">
                    <svg class="w-8 h-8 text-blue-400 animate-spin" style="animation-duration: 20s;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <!-- Planet body -->
                        <defs>
                            <radialGradient id="planetGradient" cx="30%" cy="30%">
                                <stop offset="0%" style="stop-color:#60A5FA"/>
                                <stop offset="70%" style="stop-color:#3B82F6"/>
                                <stop offset="100%" style="stop-color:#1E40AF"/>
                            </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="45" fill="url(#planetGradient)" stroke="#1E40AF" stroke-width="1"/>
                        
                        <!-- Continents -->
                        <path d="M25 35 Q35 25 45 35 Q55 40 65 35 Q75 30 85 40 L85 45 Q75 50 65 45 Q55 50 45 45 Q35 55 25 45 Z" fill="#1E40AF" opacity="0.8"/>
                        <path d="M15 55 Q25 50 35 60 Q45 65 55 60 L55 70 Q45 75 35 70 Q25 80 15 70 Z" fill="#1E40AF" opacity="0.8"/>
                        <ellipse cx="70" cy="65" rx="12" ry="8" fill="#1E40AF" opacity="0.8"/>
                        
                        <!-- Atmosphere glow -->
                        <circle cx="50" cy="50" r="47" fill="none" stroke="#60A5FA" stroke-width="1" opacity="0.3"/>
                    </svg>
                </div>
                <span class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">MapToGlobe</span>
            </router-link>
        </div>

        <!-- Navigation Items -->
        <nav class="p-4">
            <ul class="space-y-2">
                <!-- Help Section -->
                <li>
                    <router-link 
                        to="/help" 
                        class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors group"
                        :class="{ 'bg-gray-800 text-blue-400': $route.path === '/help' }"
                    >
                        <svg class="w-5 h-5 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="font-medium">Help & Documentation</span>
                    </router-link>
                </li>

                <!-- Legal Section -->
                <li>
                    <router-link 
                        to="/legal" 
                        class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors group"
                        :class="{ 'bg-gray-800 text-blue-400': $route.path === '/legal' }"
                    >
                        <svg class="w-5 h-5 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span class="font-medium">Legal & Terms</span>
                    </router-link>
                </li>

                <!-- Privacy Section -->
                <li>
                    <router-link 
                        to="/legal/privacy" 
                        class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors group"
                        :class="{ 'bg-gray-800 text-blue-400': $route.path === '/legal/privacy' }"
                    >
                        <svg class="w-5 h-5 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span class="font-medium">Privacy Policy</span>
                    </router-link>
                </li>

                <!-- Licenses Section -->
                <li>
                    <router-link 
                        to="/legal/licenses" 
                        class="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors group"
                        :class="{ 'bg-gray-800 text-blue-400': $route.path === '/legal/licenses' }"
                    >
                        <svg class="w-5 h-5 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span class="font-medium">Open Source Licenses</span>
                    </router-link>
                </li>
            </ul>
        </nav>

        <!-- Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <a 
                href="https://github.com/Zeerg/MapToGlobe/tree/master" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors group"
            >
                <svg class="w-5 h-5 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span class="font-medium">GitHub Repository</span>
                <svg class="w-4 h-4 ml-auto group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    </aside>
</template>