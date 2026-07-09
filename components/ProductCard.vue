<script setup lang="ts">
import type { ProductType } from '#shared/types.ts'
import Badge from './ui/Badge.vue';
import StockAvailability from '~~/components/StockAvailability.vue';

defineProps<{
  product: ProductType
}>()

const hue = {
  "smartphone": 220,
  "wearable": 40,
  "accessory": 80
};

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
      <div>
        <span class="brand">
          {{ product.brand }}
        </span>
        <h2>
          <NuxtLink :to="`/products/${product.slug}`">
            {{ product.model }}
          </NuxtLink>
        </h2>
      </div>
      
      <Badge
        :hue="hue[product.category]"
      >
        {{ product.category }}
      </Badge>
      
      <div>
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
        <StockAvailability :in-stock="product.inStock"></StockAvailability>
      </div>

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
  display: flex;
  flex-direction: column;
  gap: 8px;
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