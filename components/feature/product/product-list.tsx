"use client";

import * as React from "react";
import { Product } from "@/lib/types/product";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import ProductItem from "./product-item";
import { useDebounce } from "@/hooks/use-debounce";
import { useProducts } from "@/hooks/use-products";

interface ProductListContextValue {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  debouncedSearchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  isLoading: boolean;
  error: Error | null;
}

const ProductListContext = React.createContext<ProductListContextValue | null>(
  null
);

function useProductListContext() {
  const context = React.useContext(ProductListContext);
  if (!context) {
    throw new Error(
      "ProductList sub-components must be used within ProductList"
    );
  }
  return context;
}

interface ProductListProps {
  initialProducts?: Product[];
  children: React.ReactNode;
}

function ProductList({ initialProducts = [], children }: ProductListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Get all categories from initial products for the filter dropdown
  const categories = React.useMemo(() => {
    if (initialProducts.length === 0) return [];
    const uniqueCategories = Array.from(
      new Set(initialProducts.map((p) => p.category))
    );
    return uniqueCategories.sort();
  }, [initialProducts]);

  // Fetch filtered products from API
  const { products: filteredProducts, isLoading, error } = useProducts({
    search: debouncedSearchQuery || undefined,
    category: selectedCategory || undefined,
  });

  const value: ProductListContextValue = {
    products: initialProducts,
    filteredProducts,
    searchQuery,
    debouncedSearchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    categories,
    isLoading,
    error,
  };

  return (
    <ProductListContext.Provider value={value}>
      {children}
    </ProductListContext.Provider>
  );
}

function ProductListSearch() {
  const { searchQuery, setSearchQuery } = useProductListContext();

  return (
    <Input
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

function ProductListFilter() {
  const { selectedCategory, setSelectedCategory, categories } =
    useProductListContext();

  return (
    <Select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="w-48 text-base"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Select>
  );
}

function ProductListContent() {
  const { filteredProducts, isLoading, error } = useProductListContext();

  if (isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}



export { ProductList , ProductListSearch, ProductListFilter, ProductListContent};

