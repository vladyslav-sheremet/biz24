<script setup lang='ts'>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-layout>

    <v-app-bar color='primary' density='compact'>
      <template v-slot:prepend>
        <RouterLink to='/'>
          <v-icon color='white'>mdi-home-variant-outline</v-icon>
        </RouterLink>
      </template>

      <v-app-bar-title>Store Application</v-app-bar-title>
    </v-app-bar>
    <v-main style='width: 1000px'>
      <RouterView />
    </v-main>
  </v-layout>
</template>