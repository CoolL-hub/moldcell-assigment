<script setup lang="ts">
import Footer from '~~/components/Footer.vue';

</script>

<template>
  <main>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    
    <slot />

    <Footer></Footer>
  </main>
</template>