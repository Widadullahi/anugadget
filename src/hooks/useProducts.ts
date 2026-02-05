import { useEffect, useState } from "react";
import { products as productData, Product } from "@/data/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch for loading states
    const timer = setTimeout(() => {
      setProducts(productData);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { products, isLoading };
};
