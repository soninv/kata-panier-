

export enum Category {
    medecine = "Medecine",
    food = "Food"
}

export interface IProductAdded {
    id: number;
    productName: string;
    price: number;
    isImported: boolean;
    category: string;
    quantity: number;
}
