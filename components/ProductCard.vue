<script setup lang="ts">
import type { ProductType } from '~~/global.types.ts'

const props = defineProps<{
    product: ProductType
}>();
console.log(props);
</script>

<template>
    <div class="product-card">
        <img :src="product.image" :alt="product.model">

        <h3>{{ product.brand }} {{ product.model }}</h3>

        <div>
            <span v-if="product.category === 'accessory'">
                ANC: {{ product.specs.anc }}
            </span>
            <span v-if="product.category === 'wearable'">
                Display: {{ product.specs.display }}
            </span>
            <span v-if="product.category === 'smartphone'">
                Display: {{ product.specs.display }}
            </span>
        </div>

        <div class="price">
            <button v-if="product.inStock" class="buy-btn">
                <span class="old-price">{{ product.oldPriceMDL ?? "" }}</span>
                <span class="current-price">{{ product.priceMDL }} MDL</span>
            </button>
            <div v-else class="no-stock">
                Not in stock
            </div>
        </div>
    </div>
</template>

<style>
.product-card {
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding: 1rem;
}

img {
    height: 190px;
    object-fit: contain;
}

.price {
    align-self: end;
    margin-top: 10px;
}

.buy-btn {
    width: fit-content;
    outline: none;
    background: none;
    border: none;
    padding: 0.2em 1em;
    display: flex;
    align-items: baseline;
    gap: 10px;
}

.no-stock {
    background-color: rgb(201, 201, 201);
    border-radius: 20px;
    padding: 0.5em 1em;
}

.old-price {
    text-decoration: line-through;
}

.current-price {
    font-size: 20px;
}
</style>