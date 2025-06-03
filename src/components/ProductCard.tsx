import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-800 border-gray-700">
      <CardHeader className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive">Нет в наличии</Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <h3 className="font-semibold text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={`${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviewCount})
          </span>
        </div>

        <ul className="text-sm text-gray-300 mb-4 space-y-1">
          {product.specs.slice(0, 3).map((spec, index) => (
            <li key={index} className="flex items-center">
              <Icon
                name="Check"
                size={12}
                className="text-green-500 mr-2 flex-shrink-0"
              />
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-white">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString("ru-RU")} ₽
              </div>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="bg-red-500 hover:bg-red-600"
          >
            <Icon name="ShoppingCart" size={16} />В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
