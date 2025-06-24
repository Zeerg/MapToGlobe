<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <HelpNav />
        <!-- Main content with left margin to account for fixed sidebar -->
        <div class="ml-64 max-w-4xl mx-auto px-6 py-10">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-white mb-4">Open Source Licenses</h1>
                <p class="text-xl text-gray-300">Licensing information for MapToGlobe and dependencies</p>
            </div>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">MapToGlobe License</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div class="mb-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Mozilla Public License 2.0 (MPL-2.0)</h3>
                        <p class="text-gray-300 mb-4">
                            MapToGlobe is Copyright © Kurt Peters (original work) and Copyright © 2025 Tom Bowyer (modifications and enhancements). The source code is available on 
                            <a href="https://github.com/Zeerg/MapToGlobe/tree/master" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GitHub</a> 
                            and is released under the <a href="https://choosealicense.com/licenses/mpl-2.0/" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">Mozilla Public License 2.0</a>.
                        </p>
                        
                        <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
                            <h4 class="text-blue-300 font-semibold mb-2">What this means:</h4>
                            <ul class="text-gray-300 space-y-1 text-sm">
                                <li>• You can use, modify, and distribute this software</li>
                                <li>• Source code must remain available under MPL-2.0</li>
                                <li>• You can combine with other licenses</li>
                                <li>• Patent rights are granted</li>
                                <li>• No warranty is provided</li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-4">
                        <a href="https://github.com/Zeerg/MapToGlobe/tree/master" 
                           class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" 
                           target="_blank" rel="noopener noreferrer">
                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            View Source Code
                        </a>
                        <a href="https://choosealicense.com/licenses/mpl-2.0/" 
                           class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors" 
                           target="_blank" rel="noopener noreferrer">
                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Read Full License
                        </a>
                    </div>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Third-Party Dependencies</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p class="text-gray-300 mb-6">
                        MapToGlobe uses several open-source libraries and frameworks. Each dependency has its own license terms:
                    </p>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-gray-700 border border-gray-600 rounded-lg p-4">
                            <h3 class="text-lg font-semibold text-blue-300 mb-3">Core Framework</h3>
                            <ul class="space-y-2 text-gray-300 text-sm">
                                <li>• <strong>Vue.js</strong> - MIT License</li>
                                <li>• <strong>Vue Router</strong> - MIT License</li>
                                <li>• <strong>TypeScript</strong> - Apache 2.0</li>
                                <li>• <strong>Vite</strong> - MIT License</li>
                            </ul>
                        </div>

                        <div class="bg-gray-700 border border-gray-600 rounded-lg p-4">
                            <h3 class="text-lg font-semibold text-blue-300 mb-3">3D Graphics</h3>
                            <ul class="space-y-2 text-gray-300 text-sm">
                                <li>• <strong>Three.js</strong> - MIT License</li>
                                <li>• <strong>WebGL</strong> - Browser implementation</li>
                                <li>• <strong>OrbitControls</strong> - MIT License</li>
                                <li>• <strong>TransformControls</strong> - MIT License</li>
                            </ul>
                        </div>

                        <div class="bg-gray-700 border border-gray-600 rounded-lg p-4">
                            <h3 class="text-lg font-semibold text-blue-300 mb-3">UI & Styling</h3>
                            <ul class="space-y-2 text-gray-300 text-sm">
                                <li>• <strong>Tailwind CSS</strong> - MIT License</li>
                                <li>• <strong>PostCSS</strong> - MIT License</li>
                                <li>• <strong>Heroicons</strong> - MIT License</li>
                            </ul>
                        </div>

                        <div class="bg-gray-700 border border-gray-600 rounded-lg p-4">
                            <h3 class="text-lg font-semibold text-blue-300 mb-3">Build Tools</h3>
                            <ul class="space-y-2 text-gray-300 text-sm">
                                <li>• <strong>Node.js</strong> - MIT License</li>
                                <li>• <strong>NPM Packages</strong> - Various licenses</li>
                                <li>• <strong>Babel</strong> - MIT License</li>
                                <li>• <strong>ESLint</strong> - MIT License</li>
                            </ul>
                        </div>
                    </div>

                    <div class="mt-6 bg-orange-900/20 border border-orange-700 rounded-lg p-4">
                        <p class="text-orange-300 text-sm">
                            <strong>Note:</strong> For a complete and up-to-date list of all dependencies and their exact license terms, 
                            please refer to the <code class="bg-gray-600 px-2 py-1 rounded">package.json</code> and 
                            <code class="bg-gray-600 px-2 py-1 rounded">package-lock.json</code> files in the 
                            <a href="https://github.com/Zeerg/MapToGlobe/tree/master" class="text-orange-400 hover:text-orange-300" target="_blank" rel="noopener noreferrer">source repository</a>.
                        </p>
                    </div>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">License Compliance</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 class="text-xl font-semibold text-green-400 mb-4">Attribution Requirements</h3>
                    <p class="text-gray-300 mb-4">
                        All included libraries are used in compliance with their respective license terms. 
                        When redistributing or modifying MapToGlobe, please ensure you:
                    </p>
                    
                    <ul class="text-gray-300 space-y-2 mb-6">
                        <li>• Maintain this license information</li>
                        <li>• Include original copyright notices</li>
                        <li>• Provide access to source code (for MPL-2.0 components)</li>
                        <li>• Respect patent grants and limitations</li>
                    </ul>

                    <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                        <p class="text-blue-300 text-sm">
                            The combination of these licenses allows MapToGlobe to be freely used, modified, and distributed 
                            while maintaining the open-source nature of the project.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="text-center text-gray-400 border-t border-gray-700 pt-8">
                <p>MapToGlobe is open source software licensed under MPL-2.0</p>
                <p class="mt-2">© Kurt Peters (original work) • © 2025 Tom Bowyer (modifications)</p>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
  import HelpNav from '@/components/HelpNav.vue';

  export default ({
    components: { HelpNav }
  })
</script>