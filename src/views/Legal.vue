<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <HelpNav />
        <!-- Main content with left margin to account for fixed sidebar -->
        <div class="ml-64 max-w-4xl mx-auto px-6 py-10">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-white mb-4">Legal Information</h1>
                <p class="text-xl text-gray-300">Terms, licenses, and legal notices</p>
            </div>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Third-Party Libraries</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p class="text-gray-300 mb-4">MapToGlobe uses many open-source third party libraries. To view the licenses, please visit the <router-link to="/legal/licenses" class="text-blue-400 hover:text-blue-300">Licenses</router-link> page.</p>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">Privacy Policy</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p class="text-gray-300 mb-4">The privacy policy may be viewed <router-link to="/legal/privacy" class="text-blue-400 hover:text-blue-300">here</router-link>.</p>
                </div>
            </section>

            <section class="mb-12">
                <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-2">User Agreement Regarding User-Generated Content</h2>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                    <p class="text-gray-300">MapToGlobe allows users to upload images ("content") to the service.</p>
                    
                    <p class="text-gray-300">When uploading content, you promise that (1) you own or have the right to post such content, and (2) such content does not violate any applicable law, intellectual property, or rights of others.</p>
                    
                    <p class="text-gray-300">MapToGlobe may remove content that violates this agreement.</p>
                    
                    <p class="text-gray-300">MapToGlobe is not responsible for content. You agree that if anyone submits a claim against MapToGlobe or any of its administrators related to content that you post, then you will indemnify and hold MapToGlobe and its administrators harmless from and against all damages, losses, and expenses of any kind (including reasonable attorney's fees) arising out of such claim.</p>
                    
                    <div class="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                        <p class="text-blue-300">
                            <strong>Note:</strong> If you believe that any content infringes your rights, you may report issues through our 
                            <a href="https://github.com/Zeerg/MapToGlobe/issues" class="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>. 
                            Please provide detailed information in your report, including the URL containing the infringing content.
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