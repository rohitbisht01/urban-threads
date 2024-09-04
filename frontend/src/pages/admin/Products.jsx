import ImageUpload from "@/components/ui/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import Form from "@/components/ui/common/Form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElement } from "@/config";
import { toast } from "@/hooks/use-toast";
import {
  addProductAction,
  fetchAllProductsAction,
} from "@/store/admin/product-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  saleprice: "",
  totalstock: "",
};

const AdminProducts = () => {
  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addProductAction({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setImageFile(null);
        setFormData(initialFormData);
        dispatch(fetchAllProductsAction());
        toast({
          title: "Product added successfully",
        });
        setOpenCreateProducts(false);
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpenCreateProducts(true)}>
          Add new product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProducts}
          onOpenChange={() => {
            setOpenCreateProducts(false);
          }}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-xl">Add a new Product</SheetTitle>
            </SheetHeader>
            <ImageUpload
              file={imageFile}
              setFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
            />
            <div className="py-6">
              <Form
                formData={formData}
                formControls={addProductFormElement}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={"Add Product"}
                imageLoading={imageLoading}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProducts;
