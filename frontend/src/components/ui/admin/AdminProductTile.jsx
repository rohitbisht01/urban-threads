import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const AdminProductTile = ({
  product,
  setCurrentEditId,
  setOpenCreateProducts,
  setFormData,
  handleDelete,
}) => {
  return (
    <div>
      <Card className="w-full max-w-sm mx-auto ">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg "
            />
          </div>
          <CardContent className="mt-2">
            <h2 className="font-bold text-lg">{product?.title}</h2>
            <div className="flex justify-between ">
              <span
                className={`${
                  product?.saleprice > 0 ? "line-through" : ""
                }  text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              <span className="text-lg font-bold">
                {product?.saleprice > 0 ? "$" + product?.saleprice : null}
              </span>
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex justify-between -mt-1">
          <Button
            variant="outline"
            onClick={() => {
              setOpenCreateProducts(true);
              setCurrentEditId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminProductTile;
