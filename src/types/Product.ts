export interface Product {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  price: number;
  cost: number;
  stock: number;
  min_stock: number;
  sku: string;
  model: string | null;
  image: string | null;
}

export type ProductForm = Omit<Product, 'id' | 'business_id'>