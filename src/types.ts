export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    description: string;
    specs: {
        screen: string;
        ram: string;
        storage: string;
        camera: string;
    };
}

export type CartItem = Product & { quantity: number };
