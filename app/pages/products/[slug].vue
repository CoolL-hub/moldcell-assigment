<script setup lang="ts">
import { createError, useFetch, useRoute, useSeoMeta } from "nuxt/app";
import type { ProductType } from "~~/shared/types";



const route = useRoute()
const router = useRouter()

console.log(route.params.slug)

const { data: product } = await useFetch<ProductType>(
  `/api/devices/${route.params.slug}`
)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Device not found'
  })
}

useSeoMeta({
  title: `${product.value.brand} ${product.value.model}`,
  description: `${product.value.brand} ${product.value.model} available for ${product.value.priceMDL} MDL`,
  ogTitle: `${product.value.brand} ${product.value.model}`,
  ogDescription: `${product.value.brand} ${product.value.model}`,
  ogImage: product.value.image
})
definePageMeta({
  layout: "default-layout"
})
</script>

<template>
  <main class="container">
    <a @click="router.back()">
      ← Back to catalog
    </a>

    <div v-if="product" class="layout">
      <img
        :src="product.image"
        :alt="`${product.brand} ${product.model}`"
        loading="lazy"
      >

      <section>
        <h1>
          {{ product.brand }} {{ product.model }}
        </h1>

      <div class="price">
        <span class="current">
          {{ product.priceMDL }} MDL
        </span>

        <span
          v-if="product.oldPriceMDL"
          class="old"
        >
          {{ product.oldPriceMDL }} MDL
        </span>
      </div>

        <p>
          Category:
          <strong>{{ product.category }}</strong>
        </p>

        <p>
          Status:
          <strong>
            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
          </strong>
        </p>

        <h2>Specifications</h2>

        <ul>
          <li
            v-for="(value, key) in product.specs"
            :key="key"
          >
            <strong>{{ key }}</strong> :
            {{ value }}
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 2rem 1rem;
}

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
    align-items: start;
  }
}
</style>