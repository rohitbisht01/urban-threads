import { brandOptionMapping, categoryOptionMapping } from "@/config";
import { Badge } from "../badge";
import { Button } from "../button";
import { Card, CardContent, CardFooter } from "../card";

const UserProductTile = ({
  product,
  handleProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg "
          />
          {product?.saleprice > 0 ? (
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

        <CardContent className="p-4 ">
          <h2 className="font-bold text-lg truncate">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionMapping[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionMapping[product?.brand]}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-lg font-bold">
              {product?.saleprice > 0 ? "$" + product?.saleprice : null}
            </span>
            <span
              className={`${
                product?.saleprice > 0
                  ? "text-sm font-normal line-through"
                  : "text-lg font-bold"
              }   text-primary`}
            >
              ${product?.price}
            </span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-3 -mt-2">
        <Button
          className="w-full"
          onClick={() => handleAddToCart(product?._id)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProductTile;
