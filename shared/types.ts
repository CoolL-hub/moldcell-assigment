interface DevicesSpecs {
    accessory: {
        type: string;
        anc: string;
        battery: string;
    },
    wearable: {
        display: string;
        storage: string;
        battery: string;
    },
    smartphone: {
        display: string;
        storage: string;
        battery: string;
    }
}

interface DeviceType {
    id: string;
    slug: string;
    brand: string;
    model: string;
    priceMDL: number;
    oldPriceMDL: number | null;
    inStock: boolean;
    badge: string | null;
    image: string;
}

type Product<T extends keyof DevicesSpecs = keyof DevicesSpecs> = DeviceType & {
    category: T
    specs: DevicesSpecs[T]
}

export type ProductType = {
  [K in keyof DevicesSpecs]: Product<K>
}[keyof DevicesSpecs];
