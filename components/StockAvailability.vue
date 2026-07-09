<script setup lang="ts">
import Badge from "~~/components/ui/Badge.vue";
defineProps<{
  inStock: boolean
}>();
</script>

<template>
    <Badge v-if="inStock" :hue="160">
        In Stock
    </Badge>
    <Badge v-else :hue="0">
        Out of Stock
    </Badge>
</template>