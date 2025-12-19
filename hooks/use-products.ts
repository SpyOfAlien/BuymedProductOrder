import { useState, useEffect } from "react";
import { Product } from "@/lib/types/product";
import { getProducts } from "@/lib/api/products";

interface UseProductsParams {
  search?: string;
  category?: string;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

// Custom hook to fetch products with optional search and filter
export function useProducts(params?: UseProductsParams): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // In real project, will use react-query or swr to fetch products to avoid race condition
  // and better error handling and caching
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProducts({
          search: params?.search,
          category: params?.category,
        });
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [params?.search, params?.category]);

  return { products, isLoading, error };
}

