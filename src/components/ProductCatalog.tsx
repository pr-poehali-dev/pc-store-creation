import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import { Product, CartItem } from "@/types/product";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Intel Core i7-13700K",
    category: "Процессоры",
    price: 45990,
    originalPrice: 52990,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400",
    specs: ["16 ядер, 24 потока", "3.4 - 5.4 GHz", "Socket LGA1700"],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    name: "NVIDIA GeForce RTX 4070",
    category: "Видеокарты",
    price: 89990,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400",
    specs: ["12GB GDDR6X", "Ray Tracing", "DLSS 3.0"],
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "ASUS ROG STRIX Z790-E",
    category: "Материнские платы",
    price: 34990,
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400",
    specs: ["Socket LGA1700", "DDR5, Wi-Fi 6E", "RGB подсветка"],
    inStock: true,
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: "4",
    name: "Corsair Vengeance DDR5 32GB",
    category: "Оперативная память",
    price: 18990,
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=400",
    specs: ["32GB (2x16GB)", "DDR5-5600", "RGB подсветка"],
    inStock: false,
    rating: 4.6,
    reviewCount: 78,
  },
  {
    id: "5",
    name: "Samsung 980 PRO 1TB",
    category: "Накопители",
    price: 12490,
    originalPrice: 15990,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
    specs: ["NVMe PCIe 4.0", "7000 MB/s чтение", "1TB емкость"],
    inStock: true,
    rating: 4.9,
    reviewCount: 201,
  },
  {
    id: "6",
    name: "AMD Ryzen 9 7900X",
    category: "Процессоры",
    price: 52990,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400",
    specs: ["12 ядер, 24 потока", "4.7 - 5.6 GHz", "Socket AM5"],
    inStock: true,
    rating: 4.8,
    reviewCount: 97,
  },
];

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    return Array.from(new Set(mockProducts.map((p) => p.category)));
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return mockProducts;
    return mockProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Каталог товаров
        </h2>
        <p className="text-gray-600">
          Лучшие цены на компьютерные комплектующие
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
