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
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={cartItemsCount}
        cartItems={cartItems}
        onUpdateCart={setCartItems}
      />
      <ProductCatalog onAddToCart={addToCart} />
    </div>
  );
};

export default Index;
