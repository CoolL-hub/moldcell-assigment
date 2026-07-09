<script setup lang="ts">
import { useRoute, useRouter } from 'nuxt/app'
import type { ProductType } from '#shared/types'

const props = defineProps<{
    products: ProductType[]
}>()

const route = useRoute()
const router = useRouter()

// queries
const { data: brands } = await useFetch("/api/brands")

// states
const priceBounds = computed(() => {
    if (!props.products.length) {
        return {
            min: 0,
            max: 0
        }
    }

    const prices = props.products.map(
        product => product.priceMDL
    )

    return {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices))
    }
})

const selectedBrands = computed<string[]>({
    get() {
        if (!route.query.brands) {
            return []
        }

        return String(route.query.brands)
            .split(',')
            .filter(Boolean)
    },

    set(value) {
        updateQuery({
            brands: value.length
                ? value.join(',')
                : undefined
        })
    }
})

const priceMin = computed<number>({
    get() {
        return route.query.minPrice
            ? Number(route.query.minPrice)
            : priceBounds.value.min
    },

    set(value) {
        updateQuery({
            minPrice:
                value === priceBounds.value.min
                    ? undefined
                    : String(value)
        })
    }
})

const priceMax = computed<number>({
    get() {
        return route.query.maxPrice
            ? Number(route.query.maxPrice)
            : priceBounds.value.max
    },

    set(value) {
        updateQuery({
            maxPrice:
                value === priceBounds.value.max
                    ? undefined
                    : String(value)
        })
    }
})

const sortBy = computed<string>({
    get() {
        return String(
            route.query.sort || 'relevance'
        )
    },

    set(value) {
        updateQuery({
            sort:
                value === 'relevance'
                    ? undefined
                    : value
        })
    }
})

function updateQuery(values: Record<string, string | undefined>) {
    const query = {
        ...route.query,
        ...values
    }

    Object.keys(query).forEach(key => {
        if (
            query[key] === undefined ||
            query[key] === ''
        ) {
            delete query[key]
        }
    })

    router.replace({
        query
    })
}

function toggleBrand(brand: string) {
    const updated = [
        ...selectedBrands.value
    ]

    const index = updated.indexOf(brand)

    if (index === -1) {
        updated.push(brand)
    } else {
        updated.splice(index, 1)
    }

    selectedBrands.value = updated
}

function resetFilters() {
    router.replace({
        query: {}
    })
}

</script>

<template>
    <div class="product-filter">
        <div class="filter-header">
            <h3>Filters</h3>
            <button class="reset-btn" @click="resetFilters">Reset</button>
        </div>

        <section class="filter-group">
            <h4>Price</h4>
            <div class="price-inputs">
                <input
                    type="number"
                    v-model.number="priceMin"
                    :min="priceBounds.min"
                    :max="priceBounds.max"
                    />
                <span>–</span>
                <input
                    type="number"
                    v-model.number="priceMax"
                    :min="priceBounds.min"
                    :max="priceBounds.max"
                />
            </div>
        </section>

        <section class="filter-group">
            <h4>Brand</h4>
            <label v-for="brand in brands" :key="brand" class="checkbox-row">
                <input type="checkbox" :checked="selectedBrands.includes(brand)" @change="toggleBrand(brand)" />
                {{ brand }}
            </label>
        </section>

        <section class="filter-group">
            <h4>Sort by</h4>
            <select v-model="sortBy">
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
            </select>
        </section>

        <p class="result-count">{{ products.length }} products found</p>
    </div>
</template>

<style>
.product-filter {
    padding: 10px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    font-family: inherit;
}

.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.reset-btn {
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    font-size: 0.85rem;
}

.filter-group {
    margin-top: 1rem;
}

.filter-group h4 {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: #666;
}

.price-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.price-inputs input[type='number'] {
    width: 100%;
}

.checkbox-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
}

select {
    width: 100%;
    padding: 0.3rem;
}

.result-count {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #888;
}
</style>