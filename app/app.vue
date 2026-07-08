<script setup lang="ts">
import type { ProductType } from "~~/global.types";
import ProductCard from "~~/components/ProductCard.vue";

const { data: products } = await useFetch<ProductType[]>("/api/devices");
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="products-wrapper">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style>
html,
body {
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
}

.products-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
