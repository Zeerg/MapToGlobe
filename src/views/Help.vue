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

                <!-- Multi-Moon System -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">🌙 Multi-Moon System</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">Create complex moon systems with multiple orbiting satellites, realistic presets, and individual control over each moon's properties.</p>
                        
                        <!-- Preset Systems -->
                        <div class="mb-6">
                            <h4 class="text-lg font-semibold text-purple-300 mb-3">🌍 Preset Moon Systems</h4>
                            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                                    <div class="text-2xl mb-2">🌍</div>
                                    <h5 class="text-blue-300 font-semibold">Earth</h5>
                                    <p class="text-xs text-gray-400">Single Luna moon with realistic proportions</p>
                                </div>
                                <div class="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                                    <div class="text-2xl mb-2">🪐</div>
                                    <h5 class="text-orange-300 font-semibold">Jupiter</h5>
                                    <p class="text-xs text-gray-400">Io, Europa, Ganymede, Callisto</p>
                                </div>
                                <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                                    <div class="text-2xl mb-2">🪐</div>
                                    <h5 class="text-yellow-300 font-semibold">Saturn</h5>
                                    <p class="text-xs text-gray-400">Mimas, Titan, Iapetus</p>
                                </div>
                                <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                                    <div class="text-2xl mb-2">✨</div>
                                    <h5 class="text-purple-300 font-semibold">Custom</h5>
                                    <p class="text-xs text-gray-400">Three colorful example moons</p>
                                </div>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">🎮 Individual Moon Controls</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Size:</strong> 0.1x to 2x scale per moon</li>
                                    <li>• <strong>Distance:</strong> 3 to 50 units orbital radius</li>
                                    <li>• <strong>Orbit Speed:</strong> 0.0 to 5x (0.0 = paused)</li>
                                    <li>• <strong>Rotation Speed:</strong> 0.0 to 5x (0.0 = paused)</li>
                                    <li>• <strong>Custom Textures:</strong> Individual texture per moon</li>
                                    <li>• <strong>Visibility Toggle:</strong> Show/hide each moon</li>
                                    <li>• <strong>Color Variants:</strong> Random colors for new moons</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">🔧 System Management</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Add Custom Moons:</strong> Unlimited moon creation</li>
                                    <li>• <strong>Remove Individual:</strong> Delete specific moons</li>
                                    <li>• <strong>Show/Hide All:</strong> Bulk visibility controls</li>
                                    <li>• <strong>Clear System:</strong> Remove all moons at once</li>
                                    <li>• <strong>Real-time Counter:</strong> Active moon display</li>
                                    <li>• <strong>Legacy Support:</strong> Original single moon still works</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Advanced Features -->
                        <div class="mt-6 bg-gray-700/30 rounded-lg p-4">
                            <h4 class="text-lg font-semibold text-green-300 mb-3">⚡ Advanced Features</h4>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h5 class="text-yellow-300 font-medium mb-2">Realistic Physics</h5>
                                    <ul class="text-sm text-gray-300 space-y-1">
                                        <li>• Independent orbital mechanics per moon</li>
                                        <li>• Realistic shadow casting and lighting</li>
                                        <li>• Random starting positions for variety</li>
                                        <li>• Smooth orbital animations</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="text-yellow-300 font-medium mb-2">Pause & Control</h5>
                                    <ul class="text-sm text-gray-300 space-y-1">
                                        <li>• Set speeds to 0.0 to pause motion</li>
                                        <li>• Create tidally locked moons</li>
                                        <li>• Stationary reference points</li>
                                        <li>• Educational step-by-step observation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Rings System -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">🪐 Advanced Ring System</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-6">Create realistic planetary ring systems with multiple presets and full customization control. From Saturn's majestic rings to Jupiter's subtle dust bands.</p>
                        
                        <!-- Ring Presets -->
                        <div class="mb-6">
                            <h4 class="text-lg font-semibold text-amber-400 mb-3">🎯 Ring System Presets</h4>
                            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="bg-gray-700/30 rounded-lg p-3 text-center">
                                    <div class="text-yellow-400 font-medium mb-1">Saturn</div>
                                    <div class="text-xs text-gray-300">Large golden rings</div>
                                    <div class="text-xs text-gray-400">Classic appearance</div>
                                </div>
                                <div class="bg-gray-700/30 rounded-lg p-3 text-center">
                                    <div class="text-blue-400 font-medium mb-1">Uranus</div>
                                    <div class="text-xs text-gray-300">Narrow blue rings</div>
                                    <div class="text-xs text-gray-400">Subtle & vertical</div>
                                </div>
                                <div class="bg-gray-700/30 rounded-lg p-3 text-center">
                                    <div class="text-orange-400 font-medium mb-1">Jupiter</div>
                                    <div class="text-xs text-gray-300">Thin brown rings</div>
                                    <div class="text-xs text-gray-400">Dust-like bands</div>
                                </div>
                                <div class="bg-gray-700/30 rounded-lg p-3 text-center">
                                    <div class="text-purple-400 font-medium mb-1">Custom</div>
                                    <div class="text-xs text-gray-300">Full control</div>
                                    <div class="text-xs text-gray-400">Your design</div>
                                </div>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-6">
                            <!-- Size & Scale Controls -->
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">📏 Size & Scale (Custom Mode)</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Inner Radius:</strong> 0.5 - 8.0 units</li>
                                    <li>• <strong>Outer Radius:</strong> 1.0 - 12.0 units</li>
                                    <li>• <strong>Thickness:</strong> 0.2 - 8.0 units</li>
                                    <li>• <strong>Real-time Preview:</strong> Instant geometry updates</li>
                                    <li>• <strong>Auto-calculations:</strong> Thickness syncs with radii</li>
                                </ul>
                            </div>

                            <!-- Appearance Controls -->
                            <div>
                                <h4 class="text-lg font-semibold text-blue-300 mb-3">🎨 Appearance & Animation</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Opacity:</strong> 0.1 - 1.0 transparency control</li>
                                    <li>• <strong>Rotation Speed:</strong> 0.0 - 3.0x animation</li>
                                    <li>• <strong>Preset Colors:</strong> Realistic tinting per type</li>
                                    <li>• <strong>Dynamic Lighting:</strong> Responds to scene lighting</li>
                                    <li>• <strong>Auto-Enable:</strong> Rings appear when preset selected</li>
                                </ul>
                            </div>

                            <!-- Texture System -->
                            <div>
                                <h4 class="text-lg font-semibold text-green-400 mb-3">🖼️ Texture System</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Surface Texture:</strong> Main ring appearance</li>
                                    <li>• <strong>Transparency Map:</strong> Alpha channel for gaps</li>
                                    <li>• <strong>Format:</strong> Rectangular images (any ratio)</li>
                                    <li>• <strong>Orientation:</strong> Vertical bands = ring structure</li>
                                    <li>• <strong>Mapping:</strong> Auto UV-mapping from inner to outer</li>
                                </ul>
                            </div>

                            <!-- Advanced Features -->
                            <div>
                                <h4 class="text-lg font-semibold text-purple-400 mb-3">⚡ Advanced Features</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Memory Efficient:</strong> Smart resource management</li>
                                    <li>• <strong>Smooth Updates:</strong> Debounced slider interactions</li>
                                    <li>• <strong>Error Recovery:</strong> Graceful handling of failures</li>
                                    <li>• <strong>Persistent State:</strong> Settings saved automatically</li>
                                    <li>• <strong>Transform Controls:</strong> Independent ring rotation</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Usage Instructions -->
                        <div class="mt-6 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                            <h5 class="text-blue-300 font-semibold mb-3">🎮 How to Use</h5>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h6 class="text-yellow-300 font-medium mb-2">Quick Start</h6>
                                    <ol class="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                                        <li>Click any preset button (Saturn recommended)</li>
                                        <li>Rings auto-appear with realistic settings</li>
                                        <li>Upload textures for custom appearance</li>
                                        <li>Switch to Custom for full control</li>
                                    </ol>
                                </div>
                                <div>
                                    <h6 class="text-yellow-300 font-medium mb-2">Advanced Customization</h6>
                                    <ol class="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                                        <li>Select "Custom" preset</li>
                                        <li>Adjust size sliders in real-time</li>
                                        <li>Fine-tune opacity and rotation</li>
                                        <li>Add surface and transparency textures</li>
                                    </ol>
                                </div>
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

                <!-- Local Storage System -->
                <div class="mb-8">
                    <h3 class="text-2xl font-semibold text-white mb-4">💾 Local Storage & Persistence</h3>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <p class="text-gray-300 mb-4">MapToGlobe automatically saves your work locally in your browser, so you never lose your progress. All data is stored on your device - nothing is sent to external servers.</p>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="text-lg font-semibold text-purple-400 mb-3">🔄 Auto-Save Features</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Complete Moon Systems:</strong> All moons with individual properties</li>
                                    <li>• <strong>Planet Settings:</strong> Shininess, texture states, controls</li>
                                    <li>• <strong>Lighting Configuration:</strong> Sun and ambient intensity</li>
                                    <li>• <strong>Advanced Ring System:</strong> Type, size, opacity, rotation, and visibility</li>
                                    <li>• <strong>Legacy Moon:</strong> Original moon system compatibility</li>
                                    <li>• <strong>Atmosphere Settings:</strong> All environmental properties</li>
                                </ul>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-purple-400 mb-3">🎮 Storage Controls</h4>
                                <ul class="space-y-2 text-gray-300">
                                    <li>• <strong>Save State:</strong> Manual save trigger (also auto-saves)</li>
                                    <li>• <strong>Storage Info:</strong> View saved data size and timestamp</li>
                                    <li>• <strong>Clear Canvas:</strong> Reset everything and clear storage</li>
                                    <li>• <strong>Saved Indicator:</strong> Green badge shows when data exists</li>
                                    <li>• <strong>Auto-Load:</strong> Restores your work when you return</li>
                                    <li>• <strong>Error Handling:</strong> Graceful fallbacks if storage fails</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Technical Details -->
                        <div class="mt-6 bg-gray-700/30 rounded-lg p-4">
                            <h4 class="text-lg font-semibold text-blue-300 mb-3">🔧 Technical Details</h4>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h5 class="text-yellow-300 font-medium mb-2">Storage Technology</h5>
                                    <ul class="text-sm text-gray-300 space-y-1">
                                        <li>• Browser Local Storage API</li>
                                        <li>• JSON serialization for complex data</li>
                                        <li>• Versioned storage format</li>
                                        <li>• Automatic compression for efficiency</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="text-yellow-300 font-medium mb-2">Privacy & Security</h5>
                                    <ul class="text-sm text-gray-300 space-y-1">
                                        <li>• All data stays on your device</li>
                                        <li>• No cloud synchronization</li>
                                        <li>• Per-browser storage isolation</li>
                                        <li>• Cleared when you clear browser data</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- Storage Limitations -->
                        <div class="mt-4 bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                            <div class="flex items-start">
                                <svg class="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h5 class="text-yellow-300 font-semibold mb-2">Storage Limitations</h5>
                                    <ul class="text-gray-300 space-y-1 text-sm">
                                        <li>• <strong>Browser-Specific:</strong> Settings don't transfer between different browsers</li>
                                        <li>• <strong>Device-Specific:</strong> Data doesn't sync across devices</li>
                                        <li>• <strong>Texture Files:</strong> Uploaded images are not stored (only settings)</li>
                                        <li>• <strong>Storage Quota:</strong> Limited by browser's local storage limits (~5-10MB)</li>
                                        <li>• <strong>Incognito Mode:</strong> Data is cleared when private browsing session ends</li>
                                    </ul>
                                </div>
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
                        <p class="text-gray-300">A: Yes! MapToGlobe automatically saves your complete configuration to your browser's local storage. This includes all moon systems, planet settings, lighting, and ring configurations. Your work will be restored when you return to the application. However, uploaded texture files are not stored - you'll need to re-upload images if you clear your browser data or switch devices.</p>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-white mb-3">Q: Will my settings sync across different devices or browsers?</h3>
                        <p class="text-gray-300">A: No, the local storage is specific to each browser on each device. Settings saved in Chrome won't appear in Firefox, and settings on your laptop won't appear on your phone. This is by design to keep all your data private and local to your device.</p>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-white mb-3">Q: How do I clear my saved data?</h3>
                        <p class="text-gray-300">A: Use the "Clear Canvas" button in the Storage section to reset all settings and clear your saved data. Alternatively, clearing your browser's local storage or browsing data will also remove MapToGlobe's saved settings.</p>
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