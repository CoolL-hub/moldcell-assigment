<script setup lang="ts">
const props = defineProps({
  hue: {
    type: Number,
    default: 220
  }
})
</script>

<template>
    <div class="badge" :style="{ '--hue': props.hue }">
        <slot></slot>
    </div>
</template>

<style>
.badge {
    --hue: 220;
    --color-900: oklch(35% 0.18 var(--hue));
    --color-700: oklch(45% 0.16 var(--hue));
    --color-500: oklch(60% 0.14 var(--hue));
    --color-200: oklch(90% 0.05 var(--hue));
    --color-100: oklch(96% 0.025 var(--hue));

    /* display: inline; */
    width: fit-content;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 14px;
    text-transform: capitalize;

    color: var(--color-700);
    background-color: var(--color-100);
    font-weight: 600;
    letter-spacing: 1px;
}
</style>