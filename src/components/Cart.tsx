import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { CartItem } from "@/types/product";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateCart: (items: CartItem[]) => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateCart }: CartProps) => {
  if (!isOpen) return null;

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      onUpdateCart(items.filter((item) => item.product.id !== productId));
    } else {
      onUpdateCart(
        items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="fixed right-0 top-0 h-full w-96 bg-gray-800 shadow-xl transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-white">Корзина</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <Icon
                name="ShoppingCart"
                size={48}
                className="mx-auto mb-4 text-gray-400"
              />
              <p className="text-gray-400">Корзина пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg bg-gray-700"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-white">
                      {item.product.name}
                    </h4>
                    <p className="text-red-600 font-semibold">
                      {item.product.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Icon name="Minus" size={12} />
                    </Button>
                    <Badge variant="secondary">{item.quantity}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Icon name="Plus" size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Итого:</span>
              <span className="text-xl font-bold text-red-600">
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
