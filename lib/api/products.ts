import { Product } from "@/lib/types/product";
import { products as mockProducts } from "@/lib/mock/products";

interface GetProductsParams {
  search?: string;
  category?: string;
}

// Simulates an API call to fetch products with optional search and filter
export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = [...mockProducts];

      // This should be called to the API with the params to get from DB but for
      // this demo, we will just filter the products in the mock data
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchLower)
        );
      }

      if (params?.category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === params.category
        );
      }

      resolve(filteredProducts);
    }, 300);
  });
}

