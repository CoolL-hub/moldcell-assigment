import { productFiltersSchema, type ProductFiltersType } from "~~/shared/schemas/productFiltersSchema";
import { products } from "~~/lib/products";

export default defineEventHandler(async (event) => {
    const params = getRouterParams(event);

    return products.find((item) => item.slug === params.slug);
})