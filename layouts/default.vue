<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <NavigationBar />

    <main class="container mx-auto p-6">
      <NuxtPage />
    </main>

    <footer class="text-center text-sm text-gray-500 py-4 mt-10 border-t">
      &copy; 2025 BrandCode Creation Recruitment Task
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue'
</script>
