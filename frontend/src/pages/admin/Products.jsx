import AdminProductTile from "@/components/ui/admin/AdminProductTile";
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
  deleteProductAction,
  editProductAction,
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
  const [currentEditId, setCurrentEditId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditId !== null
      ? dispatch(
          editProductAction({
            id: currentEditId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProductsAction());
            setFormData(initialFormData);
            setOpenCreateProducts(false);
            setCurrentEditId(null);
          }
        })
      : dispatch(
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

  const handleDelete = (productId) => {
    dispatch(deleteProductAction(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProductsAction());
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
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
            setCurrentEditId(null);
            setFormData(initialFormData);
          }}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-xl">
                {currentEditId !== null ? "Edit Product" : "Add a new Product"}
              </SheetTitle>
            </SheetHeader>
            <ImageUpload
              file={imageFile}
              setFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              currentEditId={currentEditId}
              isEditMode={currentEditId !== null}
            />
            <div className="py-6">
              <Form
                formData={formData}
                formControls={addProductFormElement}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={
                  currentEditId !== null ? "Update Product" : "Add Product"
                }
                imageLoading={imageLoading}
                isButtonDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => {
              return (
                <AdminProductTile
                  key={productList.name}
                  setCurrentEditId={setCurrentEditId}
                  setOpenCreateProducts={setOpenCreateProducts}
                  setFormData={setFormData}
                  product={product}
                  handleDelete={handleDelete}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default AdminProducts;
