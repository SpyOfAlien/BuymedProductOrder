import { CartItem as CartItemType } from "@/lib/types/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (productId: number, quantity: number) => void;
}

const CartItem = ({ item, onQuantityChange }: CartItemProps) => {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;
  const { removeFromCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 99) {
      onQuantityChange(product.id, quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(0, Math.min(99, value));
    onQuantityChange(product.id, clampedValue);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1">
          <h4 className="font-medium text-sm">{product.name}</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleDecrease}
            disabled={quantity === 0}
            className="h-8 w-8"
          >
            -
          </Button>
          <input
            type="number"
            min="0"
            max="99"
            value={quantity}
            onChange={handleInputChange}
            className="w-12 h-8 text-center text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={handleIncrease}
            disabled={quantity >= 99}
            className="h-8 w-8"
          >
            +
          </Button>
        </div>
        <div className="text-right min-w-[80px]">
          <p className="font-semibold text-sm">{formatPrice(subtotal)}</p>
        </div>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleRemove}
          className="h-8 w-8"
          title="Remove item"
        >
          ×
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
