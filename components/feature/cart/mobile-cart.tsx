"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import CartItem from "@/components/feature/cart/cart-item";

interface MobileCartButtonProps {}

export function MobileCartButton({}: MobileCartButtonProps) {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (itemCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="rounded-full shadow-lg h-14 w-14 p-0 relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full h-6 w-6 text-xs flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
      <MobileCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

interface MobileCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileCartModal({ isOpen, onClose }: MobileCartModalProps) {
  const { items, total, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>

          {/* Cart Items */}
          <div className="space-y-2 mb-4">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Your cart is empty
              </p>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onQuantityChange={updateQuantity}
                />
              ))
            )}
          </div>

          {/* Total */}
          {items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
