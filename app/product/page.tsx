"use client";
import { useEffect, useState } from "react";
import React from "react";

export default function ProductList() {
  interface Product {
    category: string;
    title: string;
    id: number;
    price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API or database
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=8");
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <p>This is the product list page.</p>

      {products.map((item) => (
        <div key={item.id}>
          <span>{item.id}</span>
          <h2>{item.title}</h2>
          <p>{item.category}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
}
