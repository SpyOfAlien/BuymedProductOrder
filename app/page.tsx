import { ProductList, ProductListContent, ProductListFilter, ProductListSearch } from "@/components/feature/product/product-list";
import { products } from "@/lib/mock/products";

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Product Search & Order</h1>
        
        <ProductList products={products}>
          <div className="flex flex-col gap-4 sm:flex-row mb-6">
            <ProductListSearch />
            <ProductListFilter />
          </div>
          <ProductListContent />
        </ProductList>
      </main>
    </div>
  );
}
