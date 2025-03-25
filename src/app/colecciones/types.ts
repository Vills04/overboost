// types.ts
export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }
  
  export interface Collection {
    id: string;
    name: string;
    products: Product[];
  }
  