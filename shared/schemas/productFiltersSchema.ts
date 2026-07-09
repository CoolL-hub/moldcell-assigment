import { z } from "zod";

const emptyToUndefined = z.preprocess(
    (value) => value === '' ? undefined : value,
    z.coerce.number().optional()
)

export const productFiltersSchema = z.object({
    minPrice: emptyToUndefined,
    maxPrice: emptyToUndefined,

    sort: z
        .enum(["price-asc", "price-desc"])
        .optional(),

    brands: z
        .union([
            z.string().transform((value) => value.split(",")),
            z.array(z.string()),
        ])
        .optional(),
});

export type ProductFiltersType = z.infer<typeof productFiltersSchema>;