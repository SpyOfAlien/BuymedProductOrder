"use client";

import * as React from "react";
import { CartItem } from "@/lib/types/cart";
import { Product } from "@/lib/types/product";

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  getItemQuantity: (productId: number) => number;
  total: number;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return state.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        );
      }
      return [...state, { product: action.payload, quantity: 1 }];
    }
    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity === 0) {
        return state.filter((item) => item.product.id !== productId);
      }
      return state.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }
    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.product.id !== action.payload.productId);
    }
    default:
      return state;
  }
}

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, dispatch] = React.useReducer(cartReducer, []);

  const addToCart = React.useCallback((product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }, []);

  const updateQuantity = React.useCallback((productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  }, []);

  const removeFromCart = React.useCallback((productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  }, []);

  const getItemQuantity = React.useCallback(
    (productId: number) => {
      const item = items.find((item) => item.product.id === productId);
      return item?.quantity || 0;
    },
    [items]
  );

  const total = React.useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const value: CartContextValue = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    getItemQuantity,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

