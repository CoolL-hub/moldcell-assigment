<script setup lang="ts">
import type { ProductType } from "~~/shared/types";
import ProductCard from "~~/components/ProductCard.vue";
import ProductFilters from "~~/components/ProductFilters.vue";
import Loading from "~~/components/Loading.vue";
import Empty from "~~/components/Empty.vue";
import Error from "~~/components/Error.vue";
import { productFiltersSchema } from "~~/shared/schemas/productFiltersSchema";

definePageMeta({
  keepalive: true,
  layout: "default-layout"
})

const route = useRoute();

const filters = computed(() =>
  productFiltersSchema.parse(route.query)
);

const { data: products, pending, error } = await useFetch<ProductType[]>("/api/devices", {
  query: filters,
});

const filtered = computed(() => products.value ?? []);

</script>

<template>
  <div>
    <h1>Device Catalog</h1>

    <ProductFilters
      v-if="products"
      :products="products"
      @update:filtered="filtered = $event"
    />

    <div style="height: 20px;"></div>

    <Loading v-if="pending" />

    <Error
      v-else-if="error"
      :message="error.message"
    />

    <Empty
      v-else-if="!products?.length"
    />

    <section
      v-else
      class="grid"
    >
      <div class="products-wrapper">
        <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<style>
.products-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
