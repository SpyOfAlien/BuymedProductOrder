"use client";

import * as React from "react";
import { Product } from "@/lib/types/product";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import ProductItem from "./product-item";

interface ProductListContextValue {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  categories: string[];
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
  products: Product[];
  children: React.ReactNode;
}

function ProductList({ products, children }: ProductListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    return uniqueCategories.sort();
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const value: ProductListContextValue = {
    products,
    filteredProducts,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    categories,
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
  const { filteredProducts } = useProductListContext();

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

