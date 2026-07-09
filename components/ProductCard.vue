<script setup lang="ts">
import type { ProductType } from '#shared/types.ts'

defineProps<{
  product: ProductType
}>()
</script>

<template>
  <article class="card">
    <NuxtLink :to="`/products/${product.slug}`">
      <img
        :src="product.image"
        :alt="`${product.brand} ${product.model}`"
        loading="lazy"
        class="image"
      />
    </NuxtLink>

    <div class="content">
      <p class="category">
        {{ product.category }}
      </p>
      
      <span class="brand">
        {{ product.brand }}
      </span>

      <h2>
        <NuxtLink :to="`/products/${product.slug}`">
          {{ product.model }}
        </NuxtLink>
      </h2>

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

      <p
        :class="product.inStock ? 'stock in' : 'stock out'"
      >
        {{ product.inStock ? 'In stock' : 'Out of stock' }}
      </p>

      <slot />
    </div>
  </article>
</template>

<style scoped>
.card {
  --card-bg: transparent;
  --border-color: lightgray;

  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: .2s;
}

.card:hover {
  transform: translateY(-2px);
}

.image {
  width: 100%;
  height: 220px;
  object-fit: contain;
  padding: 1rem;
}

.content {
  padding: 1rem;
}

.brand {
  color: gray;
  font-size: .9rem;
}

h2 {
  margin: .4rem 0;
  font-size: 1.1rem;
}

.category {
  background-color: lightblue;
  width: fit-content;
  border-radius: 20px;
  padding: 4px 10px;
  text-transform: capitalize;
}

.price {
  display: flex;
  gap: .6rem;
  align-items: center;
  margin-top: .7rem;
}

.current {
  font-weight: bold;
  color: var(--primary);
}

.old {
  text-decoration: line-through;
  color: gray;
}

.stock {
  margin-top: .7rem;
}

.in {
  color: green;
}

.out {
  color: crimson;
}
</style>