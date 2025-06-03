import { useState } from "react";
import Header from "@/components/Header";
import ProductCatalog from "@/components/ProductCatalog";
import { Product, CartItem } from "@/types/product";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Фоновое изображение */}
      <div
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Темный оверлей */}
      <div className="fixed inset-0 z-0 bg-gray-900/80" />

      <div className="relative z-10">
        <Header
          cartItemsCount={cartItemsCount}
          cartItems={cartItems}
          onUpdateCart={setCartItems}
        />
        <ProductCatalog onAddToCart={addToCart} />
      </div>
    </div>
  );
};

export default Index;
