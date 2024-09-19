import { Product } from "./Product";

export interface ProductWithImageUrl extends Product {
  imageUrl: string;
}
