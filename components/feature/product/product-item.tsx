import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils";

interface ProductItemProps {
    product: Product;
  }
  
  const  ProductItem = ({ product }: ProductItemProps) => {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            {product.isPrescription && <Badge>Rx</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Category:</span>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price:</span>
              <span className="font-semibold">{formatPrice(product.price)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  export default ProductItem