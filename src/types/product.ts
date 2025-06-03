export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  specs: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  type?: "component" | "gaming-pc"; // Новый тип для разделения комплектующих и готовых ПК
  performance?: "entry" | "mid" | "high" | "premium"; // Уровень производительности для игровых ПК
}

export interface CartItem {
  product: Product;
  quantity: number;
}
