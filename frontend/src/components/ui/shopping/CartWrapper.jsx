import { Button } from "../button";
import { SheetContent, SheetHeader, SheetTitle } from "../sheet";
import CartItemsContent from "./CartItemsContent";

const CartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (acc, cur) =>
            acc +
            (cur?.saleprice > 0 ? cur?.saleprice : cur?.price) * cur?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <CartItemsContent key={item?.productId} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
        <Button className="w-full mt-6">Checkout</Button>
      </div>
    </SheetContent>
  );
};

export default CartWrapper;
