import { CartItem } from "@/lib/types/cart";
import { products } from "./products";

export const mockCartItems: CartItem[] = [
  {
    product: products[0],
    quantity: 2,
  },
  {
    product: products[1],
    quantity: 1,
  },
  {
    product: products[2],
    quantity: 3,
  },
];

