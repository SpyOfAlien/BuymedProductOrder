import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          {product.isPrescription && <Badge>Rx</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Category:</span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price:</span>
            <span className="font-semibold">{formatPrice(product.price)}</span>
          </div>
          <Button
            onClick={() => addToCart(product)}
            disabled={quantity >= 99}
            className="w-full"
          >
            {quantity > 0 ? `Add to Cart (${quantity})` : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;