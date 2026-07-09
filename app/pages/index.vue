<script setup lang="ts">
import { ref } from "vue";
import type { ProductType } from "~~/shared/types";
import ProductCard from "~~/components/ProductCard.vue";
import ProductFilters from "~~/components/ProductFilters.vue";
import Footer from "~~/components/Footer.vue";
import { productFiltersSchema } from "~~/shared/schemas/productFiltersSchema";

definePageMeta({
  keepalive: true
})

const route = useRoute();

const filters = computed(() =>
  productFiltersSchema.parse(route.query)
);

const { data: products } = await useFetch<ProductType[]>("/api/devices", {
  query: filters,
});

const filtered = computed(() => products.value ?? []);

</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <ProductFilters
      v-if="products"
      :products="products"
      @update:filtered="filtered = $event"
    />

    <div style="height: 20px;"></div>

    <div class="products-wrapper">
      <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
    </div>

    <Footer></Footer>
  </div>
</template>

<style>
html,
body {
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
}

input, select {
  height: 2rem;
}

a {
  color: #313131;
  text-decoration: none;
}

.products-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
