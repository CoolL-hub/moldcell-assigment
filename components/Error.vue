<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="state">
    {{ message || "Something went wrong." }}
  </div>
</template>

<style scoped>
.state {
    padding:3rem;
    text-align:center;
    color:crimson;
}
</style>