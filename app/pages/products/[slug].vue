<script setup lang="ts">
import { createError, useFetch, useRoute, useSeoMeta, useAsyncData } from "nuxt/app";
import type { ProductType } from "~~/shared/types";
import Badge from "~~/components/ui/Badge.vue";
import StockAvailability from "~~/components/StockAvailability.vue";

const route = useRoute()
const router = useRouter()

function goBack() {
  if (window.history.state?.back) {
    router.back();
    return;
  }
  router.push("/");
}

const { data: product, pending } = await useAsyncData<ProductType>(
  'product',
  () => $fetch(`/api/devices/${route.params.slug}`)
)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Device not found'
  })
}

useSeoMeta({
  title: () => `${product.value!.brand} ${product.value!.model}`,
  description: () => `${product.value!.brand} ${product.value!.model} available for ${product.value!.priceMDL} MDL`,
  ogTitle: () => `${product.value!.brand} ${product.value!.model}`,
  ogDescription: () => `${product.value!.brand} ${product.value!.model}`,
  ogImage: () => product.value!.image
})

definePageMeta({
  layout: "default-layout"
})
</script>

<template>
  <main class="container">
    <a @click="goBack" class="back-btn">
      ← Back to catalog
    </a>

    <div v-if="product" class="layout">
      <img :src="product.image" :alt="`${product.brand} ${product.model}`" loading="lazy">

      <section>
        <h1>
          {{ product.brand }} {{ product.model }}
        </h1>

        <div class="price">
          <span class="current">
            {{ product.priceMDL }} MDL
          </span>

          <span v-if="product.oldPriceMDL" class="old">
            {{ product.oldPriceMDL }} MDL
          </span>
        </div>

        <div style="display: flex; gap: 5px; align-items: baseline;">
          <div>Category: </div>
          <Badge>{{ product.category }}</Badge>
        </div>

        <div style="display: flex; gap: 5px; align-items: baseline;">
          <div>Status: </div>
          <StockAvailability :inStock="product.inStock"></StockAvailability>
        </div>

        <h2>Specifications</h2>

        <ul>
          <li v-for="(value, key) in product.specs" :key="key">
            <strong>{{ key }}</strong> :
            {{ value }}
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 3rem;
  margin-top: 2rem;
}

img {
  width: 100%;
  max-width: 450px;
  justify-self: center;
}

.back-btn {
  font-weight: 600;
}

.price {
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--primary);
  margin: 1rem 0;
}

ul {
  padding-left: 1rem;
}

li {
  margin-bottom: .5rem;
}

.old {
  text-decoration: line-through;
  color: gray;
  font-size: 18px;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: 400px 1fr;
    gap: 10rem;
    align-items: start;
  }
}
</style>