<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <HelpNav />
        <!-- Main content with left margin to account for fixed sidebar -->
        <div class="ml-64 max-w-4xl mx-auto px-6 py-10">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                <p class="text-xl text-gray-300">How your data is handled</p>
            </div>

            <div class="mb-8">
                <div class="bg-green-900/20 border border-green-700 rounded-lg p-6">
                    <div class="flex items-start">
                        <svg class="w-8 h-8 text-green-400 mr-4 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 class="text-green-300 font-semibold mb-2">Privacy-First Design</h3>
                            <p class="text-gray-300"><strong>Last updated: January 2025</strong></p>
                            <p class="text-gray-300 mt-2">MapToGlobe operates entirely in your browser. No personal data, images, or usage information is transmitted to external servers.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Data Collection</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 class="text-xl font-semibold text-green-400 mb-4">What We DON'T Collect</h3>
                    <ul class="text-gray-300 space-y-2 mb-6">
                        <li>• <strong>No images or textures</strong> - All uploads stay in your browser</li>
                        <li>• <strong>No personal information</strong> - No accounts, emails, or profiles</li>
                        <li>• <strong>No usage analytics</strong> - No tracking or behavior monitoring</li>
                        <li>• <strong>No cookies</strong> - No persistent data storage</li>
                        <li>• <strong>No IP addresses</strong> - No server-side logging</li>
                    </ul>

                    <h3 class="text-xl font-semibold text-orange-400 mb-4">Browser Storage</h3>
                    <p class="text-gray-300 mb-4">
                        MapToGlobe may use your browser's local storage to temporarily cache uploaded images during your session. 
                        This data is stored only on your device and is cleared when you close the browser or refresh the page.
                    </p>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">How Your Data is Processed</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-blue-300 mb-3">Local Processing</h3>
                        <p class="text-gray-300">All image processing, 3D rendering, and texture mapping happens entirely within your web browser using WebGL technology. No data leaves your device during normal operation.</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-blue-300 mb-3">Export Downloads</h3>
                        <p class="text-gray-300">When you export screenshots or animations, files are generated locally and downloaded directly to your device. No copies are sent to external servers.</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-blue-300 mb-3">Third-Party Services</h3>
                        <p class="text-gray-300">MapToGlobe does not integrate with any third-party analytics services, advertising networks, or data collection platforms.</p>
                    </div>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Technical Details</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-blue-300 mb-3">WebGL Rendering</h3>
                        <p class="text-gray-300">3D graphics are rendered using your browser's WebGL implementation. This technology accesses your graphics hardware but does not transmit any information externally.</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-blue-300 mb-3">File Access</h3>
                        <p class="text-gray-300">When you upload images, the application accesses files through standard browser APIs. Files are read into memory temporarily and are not stored permanently.</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-blue-300 mb-3">Network Activity</h3>
                        <p class="text-gray-300">The only network activity occurs when initially loading the application. No subsequent requests are made for user data, analytics, or content delivery.</p>
                    </div>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Your Rights</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p class="text-gray-300 mb-4">Since no personal data is collected or stored by MapToGlobe, there are no data retention, deletion, or portability concerns.</p>
                    
                    <h3 class="text-lg font-semibold text-green-400 mb-3">Complete Control</h3>
                    <ul class="text-gray-300 space-y-2">
                        <li>• All your data remains on your device</li>
                        <li>• You can clear browser data at any time</li>
                        <li>• No account deletion process needed</li>
                        <li>• No data subject access requests required</li>
                    </ul>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Changes to This Policy</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p class="text-gray-300 mb-4">
                        This privacy policy may be updated occasionally to reflect changes in the application or legal requirements. 
                        The date of the last update is provided at the top of this page.
                    </p>
                    <p class="text-gray-300">
                        Updates will be posted on this page and in the application's 
                        <a href="https://github.com/Zeerg/MapToGlobe/tree/master" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
                    </p>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Questions or Concerns</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p class="text-gray-300 mb-4">
                        If you have questions about this privacy policy or the application's data handling, you can:
                    </p>
                    <ul class="text-gray-300 space-y-2">
                        <li>• Review the open source code on <a href="https://github.com/Zeerg/MapToGlobe/tree/master" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li>• Submit an issue on the <a href="https://github.com/Zeerg/MapToGlobe/issues" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GitHub Issues page</a></li>
                        <li>• Participate in community discussions</li>
                    </ul>
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