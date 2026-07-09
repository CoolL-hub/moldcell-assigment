import { productFiltersSchema, type ProductFiltersType } from "~~/shared/schemas/productFiltersSchema";
import { products } from "~~/lib/products";


export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const result = productFiltersSchema.safeParse(query);

    if (!result.success) {
        throw createError({
        statusCode: 400,
        statusMessage: "Invalid filters",
        });
    }

    const filters = result.data;

    let filtered = products.filter((p) => {
        const withinMin =
            filters.minPrice === undefined || p.priceMDL >= filters.minPrice;

        const withinMax =
            filters.maxPrice === undefined || p.priceMDL <= filters.maxPrice;

        const matchesBrand =
            !filters.brands?.length || filters.brands.includes(p.brand);

        return withinMin && withinMax && matchesBrand;
    });

    switch (filters.sort) {
        case "price-asc":
            filtered.sort((a, b) => a.priceMDL - b.priceMDL);
            break;

        case "price-desc":
            filtered.sort((a, b) => b.priceMDL - a.priceMDL);
            break;
    }

    filtered = [...filtered].sort((a, b) => Number(b.inStock) - Number(a.inStock));

    return filtered;
})