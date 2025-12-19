"use client";

import { ProductList, ProductListContent, ProductListFilter, ProductListSearch } from "@/components/feature/product/product-list";
import { OrderSummary, OrderSummaryHeader, OrderSummaryItems, OrderSummaryTotal } from "@/components/feature/cart/order-summary";
import { CartProvider } from "@/contexts/cart-context";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/mock/products";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen p-4 sm:p-8">
        <main className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Product Search & Order</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProductList products={products}>
                <div className="flex flex-col gap-4 sm:flex-row mb-6">
                  <ProductListSearch />
                  <ProductListFilter />
                </div>
                <ProductListContent />
              </ProductList>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card>
                  <OrderSummary>
                    <OrderSummaryHeader />
                    <OrderSummaryItems />
                    <OrderSummaryTotal />
                  </OrderSummary>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
