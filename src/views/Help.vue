<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <HelpNav />
        <!-- Main content with left margin to account for fixed sidebar -->
        <div class="ml-64 max-w-4xl mx-auto px-6 py-10">
            <!-- Header -->
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-white mb-4">MapToGlobe Help & Documentation</h1>
                <p class="text-xl text-gray-300">Transform images into stunning 3D globes</p>
            </div>

            <!-- Quick Start -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Quick Start</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <ol class="list-decimal list-inside text-gray-300 space-y-3">
                        <li>Click <strong class="text-white">"Surface Texture"</strong> in the Planet section</li>
                        <li>Upload an equirectangular image (width must be 2x height)</li>
                        <li>Use mouse to rotate and scroll to zoom the 3D globe</li>
                        <li>Add optional textures like height maps, clouds, or specular maps</li>
                        <li>Export your creation as a screenshot or animated GIF</li>
                    </ol>
                </div>
            </section>

            <!-- System Requirements -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">System Requirements</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Supported Browsers</h3>
                        <ul class="text-gray-300 space-y-2">
                            <li>• Google Chrome (recommended)</li>
                            <li>• Mozilla Firefox</li>
                            <li>• Microsoft Edge</li>
                            <li>• Safari (limited support)</li>
                        </ul>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Device Requirements</h3>
                        <ul class="text-gray-300 space-y-2">
                            <li>• Desktop/laptop computer</li>
                            <li>• WebGL-compatible graphics</li>
                            <li>• 4GB+ RAM recommended</li>
                            <li>• Mouse for navigation</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Features -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Features & Controls</h2>
                
                <!-- Planet Controls -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">🌍 Planet</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">The main sphere that serves as your canvas. Upload various texture maps to create realistic planetary surfaces.</p>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Texture Types</h4>
                                <ul class="space-y-3 text-gray-300">
                                    <li><strong class="text-white">Surface Texture</strong> - Main image overlaid on the sphere</li>
                                    <li><strong class="text-white">Height Map</strong> - Black/white image for elevation detail</li>
                                    <li><strong class="text-white">Specular Map</strong> - Controls surface reflectivity</li>
                                    <li><strong class="text-white">Cloud Layer</strong> - Atmospheric cloud overlay</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Controls</h4>
                                <ul class="space-y-3 text-gray-300">
                                    <li><strong class="text-white">Toggle Axis</strong> - Show/hide rotation axis</li>
                                    <li><strong class="text-white">Planet Controls</strong> - Independent rotation</li>
                                    <li><strong class="text-white">Cloud Controls</strong> - Separate cloud movement</li>
                                    <li><strong class="text-white">Shininess</strong> - Adjust surface glossiness</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Moon Controls -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">🌙 Moon</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">Add a realistic moon orbiting your planet with customizable properties.</p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Features</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• Toggle moon visibility</li>
                                    <li>• Upload custom surface texture</li>
                                    <li>• Adjustable size and distance</li>
                                    <li>• Independent rotation controls</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Controls</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Scale:</strong> 0.1x to 4x size</li>
                                    <li>• <strong>Distance:</strong> 3 to 20 units</li>
                                    <li>• <strong>Orbit Controls:</strong> Manual positioning</li>
                                    <li>• <strong>Rotation:</strong> Independent spinning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rings Controls -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">🪐 Rings</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">Create Saturn-like rings around your planet with custom textures and transparency.</p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Textures</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Surface:</strong> Main ring appearance</li>
                                    <li>• <strong>Transparency:</strong> Alpha channel map</li>
                                    <li>• Rectangular format required</li>
                                    <li>• Vertical bands represent ring structure</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Properties</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• Toggle ring visibility</li>
                                    <li>• Independent rotation controls</li>
                                    <li>• Customizable transparency patterns</li>
                                    <li>• Realistic lighting effects</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Background Controls -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">🌌 Background</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">Customize the space environment around your celestial objects.</p>
                        <div class="grid md:grid-cols-3 gap-4">
                            <div class="text-center">
                                <h4 class="text-blue-300 font-semibold mb-2">Solid Black</h4>
                                <p class="text-gray-400 text-sm">Classic space background</p>
                            </div>
                            <div class="text-center">
                                <h4 class="text-blue-300 font-semibold mb-2">Transparent</h4>
                                <p class="text-gray-400 text-sm">For overlay purposes</p>
                            </div>
                            <div class="text-center">
                                <h4 class="text-blue-300 font-semibold mb-2">Custom Image</h4>
                                <p class="text-gray-400 text-sm">Upload starfield or nebula</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lighting Controls -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">💡 Lighting</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">Fine-tune the lighting to create the perfect atmosphere.</p>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Light Types</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Sun Intensity:</strong> Directional light strength</li>
                                    <li>• <strong>Ambient:</strong> Overall scene brightness</li>
                                    <li>• Dynamic positioning based on zoom</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">Behavior</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• Zoomed in: Light stays fixed</li>
                                    <li>• Zoomed out: Light rotates with scene</li>
                                    <li>• Realistic shadow casting</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Export Features -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">📤 Export</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-green-400 mb-3">📸 Screenshot</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• High-quality JPG export</li>
                                    <li>• Current viewport capture</li>
                                    <li>• Instant download</li>
                                    <li>• Perfect for sharing</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-orange-400 mb-3">🎬 Animation</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• Rotating GIF creation</li>
                                    <li>• 5-second duration</li>
                                    <li>• Automatic 360° rotation</li>
                                    <li>• WebM format output</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Navigation -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Navigation & Controls</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-xl font-semibold text-green-400 mb-4">Mouse Controls</h3>
                            <ul class="space-y-3 text-gray-300">
                                <li><strong class="text-white">Left Click + Drag:</strong> Rotate camera around scene</li>
                                <li><strong class="text-white">Mouse Wheel:</strong> Zoom in/out</li>
                                <li><strong class="text-white">Right Click + Drag:</strong> Pan camera position</li>
                                <li><strong class="text-white">Middle Click + Drag:</strong> Alternative pan control</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold text-green-400 mb-4">Object Controls</h3>
                            <ul class="space-y-3 text-gray-300">
                                <li><strong class="text-white">Toggle Controls:</strong> Enable independent object rotation</li>
                                <li><strong class="text-white">Transform Gizmo:</strong> Appears when object control is active</li>
                                <li><strong class="text-white">Multiple Objects:</strong> Control planet, moon, clouds separately</li>
                                <li><strong class="text-white">Lighting Adjustment:</strong> Dynamic based on zoom level</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Image Requirements -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Image Requirements</h2>
                <div class="bg-red-900/20 border border-red-700 rounded-lg p-6 mb-6">
                    <div class="flex items-start">
                        <svg class="w-8 h-8 text-red-400 mr-4 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 class="text-red-300 font-semibold mb-2">Important: Equirectangular Format Required</h3>
                            <p class="text-gray-300">All planet and moon textures must be in equirectangular projection format. The image width must be exactly twice the height (2:1 ratio). Images not in this format will appear distorted on the sphere.</p>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Sphere Textures (Planet/Moon)</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li>• <strong>Format:</strong> Equirectangular (2:1 ratio)</li>
                            <li>• <strong>Example:</strong> 4096×2048, 2048×1024</li>
                            <li>• <strong>File Types:</strong> JPG, PNG, WebP</li>
                            <li>• <strong>Size Limit:</strong> Recommended under 10MB</li>
                        </ul>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Ring Textures</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li>• <strong>Format:</strong> Rectangular (any ratio)</li>
                            <li>• <strong>Orientation:</strong> Vertical bands</li>
                            <li>• <strong>Layout:</strong> Inner ring (left) → Outer ring (right)</li>
                            <li>• <strong>Transparency:</strong> Use alpha maps for gaps</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- FAQ -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Frequently Asked Questions</h2>
                <div class="space-y-6">
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-white mb-3">Q: My map looks weird or distorted on the globe</h3>
                        <p class="text-gray-300">A: Your image is likely not in equirectangular projection format. The image must have a 2:1 width-to-height ratio. You can convert your image using tools like <a href="https://en.wikipedia.org/wiki/Equirectangular_projection" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GIMP, Photoshop, or online converters</a>.</p>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-white mb-3">Q: When I upload an image, it appears as solid black or white</h3>
                        <p class="text-gray-300">A: This is usually caused by WebGL limitations on your device. Try uploading a smaller image (under 4MB) or reducing the image resolution. Older graphics cards may have texture size limitations.</p>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-white mb-3">Q: The application is running slowly or freezing</h3>
                        <p class="text-gray-300">A: Performance depends on your computer's graphics capabilities. Try closing other browser tabs, reducing image sizes, or using a computer with better graphics hardware. Chrome typically offers the best WebGL performance.</p>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-white mb-3">Q: Can I save my work for later?</h3>
                        <p class="text-gray-300">A: Currently, MapToGlobe operates as a local application without cloud saving. Use the export features to save screenshots or animations of your creations. You'll need to re-upload your textures if you refresh the page.</p>
                    </div>
                </div>
            </section>

            <!-- Terms of Use -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Terms of Use & Disclaimer</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div class="prose prose-invert max-w-none">
                        <h3 class="text-xl font-semibold text-red-400 mb-4">No Warranty</h3>
                        <p class="text-gray-300 mb-4">
                            MapToGlobe is provided "AS IS" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. The entire risk as to the quality and performance of the software is with you.
                        </p>

                        <h3 class="text-xl font-semibold text-red-400 mb-4">Limitation of Liability</h3>
                        <p class="text-gray-300 mb-4">
                            In no event shall the developers or contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort arising in any way out of the use of this software.
                        </p>

                        <h3 class="text-xl font-semibold text-blue-300 mb-4">Acceptable Use</h3>
                        <ul class="text-gray-300 space-y-2 mb-4">
                            <li>• Use only images you have rights to or that are in the public domain</li>
                            <li>• Do not upload copyrighted material without permission</li>
                            <li>• No offensive, illegal, or harmful content</li>
                            <li>• Respect intellectual property rights</li>
                        </ul>

                        <h3 class="text-xl font-semibold text-blue-300 mb-4">Privacy</h3>
                        <p class="text-gray-300 mb-4">
                            MapToGlobe operates entirely in your browser. No images or data are uploaded to external servers. All processing happens locally on your device. However, exported files (screenshots/animations) are downloaded to your local machine.
                        </p>

                        <h3 class="text-xl font-semibold text-blue-300 mb-4">Open Source License</h3>
                        <p class="text-gray-300">
                            This software is licensed under the Mozilla Public License 2.0 (MPL-2.0). You can view the source code and contribute at <a href="https://github.com/Zeerg/MapToGlobe/tree/master" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GitHub</a>.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Support -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Support & Contributing</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Report Issues</h3>
                        <p class="text-gray-300 mb-4">Found a bug or have a feature request?</p>
                        <a href="https://github.com/Zeerg/MapToGlobe/issues" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" target="_blank" rel="noopener noreferrer">
                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Issues on GitHub
                        </a>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-green-400 mb-4">Contribute</h3>
                        <p class="text-gray-300 mb-4">Help improve MapToGlobe by contributing code or documentation.</p>
                        <a href="https://github.com/Zeerg/MapToGlobe/tree/master" class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors" target="_blank" rel="noopener noreferrer">
                            <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Source Code
                        </a>
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