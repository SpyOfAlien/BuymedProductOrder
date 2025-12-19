"use client";

import * as React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import CartItem from "./cart-item";

interface OrderSummaryContextValue {
  updateQuantity: (productId: number, quantity: number) => void;
  total: number;
}

const OrderSummaryContext = React.createContext<OrderSummaryContextValue | null>(
  null
);

function useOrderSummaryContext() {
  const context = React.useContext(OrderSummaryContext);
  if (!context) {
    throw new Error(
      "OrderSummary sub-components must be used within OrderSummary"
    );
  }
  return context;
}

interface OrderSummaryProps {
  children: React.ReactNode;
}

function OrderSummary({ children }: OrderSummaryProps) {
  const { items, updateQuantity, total } = useCart();

  const value: OrderSummaryContextValue = {
    updateQuantity,
    total,
  };

  return (
    <OrderSummaryContext.Provider value={value}>
      {children}
    </OrderSummaryContext.Provider>
  );
}

function OrderSummaryHeader() {
  return (
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
    </CardHeader>
  );
}

function OrderSummaryItems() {
  const { items } = useCart();
  const { updateQuantity } = useOrderSummaryContext();

  if (items.length === 0) {
    return (
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          Your cart is empty
        </p>
      </CardContent>
    );
  }

  return (
    <CardContent className="p-0">
      <div className="px-6 pt-0 pb-4">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onQuantityChange={updateQuantity}
          />
        ))}
      </div>
    </CardContent>
  );
}

function OrderSummaryTotal() {
  const { total } = useOrderSummaryContext();

  return (
    <CardContent className="border-t pt-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-lg font-bold">{formatPrice(total)}</span>
      </div>
    </CardContent>
  );
}

function OrderSummaryContent() {
  return (
    <>
      <OrderSummaryItems />
      <OrderSummaryTotal />
    </>
  );
}


export { OrderSummary, OrderSummaryHeader, OrderSummaryItems, OrderSummaryTotal, OrderSummaryContent };

