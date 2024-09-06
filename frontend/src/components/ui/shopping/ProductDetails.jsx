import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../button";
import { Separator } from "../separator";
import { Avatar, AvatarFallback } from "../avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../input";
import { Badge } from "../badge";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  fetchAllCartItemsAction,
} from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";

const ProductDetails = ({ open, setOpen, productInfo }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = (productId) => {
    console.log(productId);

    dispatch(
      addToCartAction({ userId: user?.id, productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllCartItemsAction(user?.id));
        toast({
          title: "Product added",
        });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productInfo?.image}
              alt={productInfo?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
            {productInfo?.saleprice > 0 ? (
              <Badge
                variant="outline"
                className={
                  "absolute top-2 right-3 border-red-500 text-white bg-red-500"
                }
              >
                Sale
              </Badge>
            ) : null}
          </div>
          <div className="">
            <div>
              <h1 className="font-bold text-3xl">{productInfo?.title}</h1>
              <p className="text-muted-foreground mt-2">
                {productInfo?.description}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-3xl font-bold text-primary">
                {productInfo?.saleprice > 0
                  ? "$" + productInfo?.saleprice
                  : null}
              </p>
              <p
                className={`${
                  productInfo?.saleprice > 0
                    ? "text-sm font-normal line-through"
                    : "text-lg font-bold"
                }   text-primary`}
              >
                ${productInfo?.price}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <span className="text-sm text-muted-foreground pl-2">
                4.5 Stars
              </span>
            </div>

            <div className="mt-5 mb-5">
              <Button
                className="w-full"
                onClick={() => handleAddToCart(productInfo?._id)}
              >
                Add to Cart
              </Button>
            </div>
            <Separator />

            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mt-2 mb-4">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>RB</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Rohit Bisht</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      This is awesome product
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>RB</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Rohit Bisht</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      This is awesome product
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Input
                    type="text"
                    placeholder="Write a review"
                    className=""
                  />
                  <Button>Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
