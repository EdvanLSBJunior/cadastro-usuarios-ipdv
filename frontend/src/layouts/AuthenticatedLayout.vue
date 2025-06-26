<template>
  <v-app>
    <AppBar />
    <v-main class="pa-6">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
</script>