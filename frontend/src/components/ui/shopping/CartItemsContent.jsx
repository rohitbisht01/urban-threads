import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";

const CartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleCartItemDelete = (cartItemToDelete) => {
    dispatch(
      deleteCartItemAction({
        userId: user?.id,
        productId: cartItemToDelete?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart Item Deleted",
        });
      }
    });
  };

  const handleUpdateQuantity = (cartItemData, actionType) => {
    dispatch(
      updateCartItemAction({
        userId: user?.id,
        productId: cartItemData?.productId,
        quantity:
          actionType === "plus"
            ? cartItemData?.quantity + 1
            : cartItemData?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart Item Updated",
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span>{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-1 w-5 h-5"
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
};

export default CartItemsContent;
