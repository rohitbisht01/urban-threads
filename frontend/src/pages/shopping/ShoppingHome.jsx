import { Button } from "@/components/ui/button";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllShopProducts,
  getproductDetailsAction,
} from "@/store/shop/product-slice";
import UserProductTile from "@/components/ui/shopping/UserProductTile";
import {
  addToCartAction,
  fetchAllCartItemsAction,
} from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetails from "@/components/ui/shopping/ProductDetails";

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);

  const slides = [banner1, banner2, banner3];

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllShopProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDialog(true);
  }, [productDetails]);

  const handleProductDetails = (productId) => {
    dispatch(getproductDetailsAction(productId));
  };

  const handleAddToCart = (productId) => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          size="icon"
          variant="outline"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          size="icon"
          variant="outline"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-2xl md:text-3xl text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((item) => {
                  return (
                    <UserProductTile
                      product={item}
                      key={item._id}
                      handleAddToCart={handleAddToCart}
                      handleProductDetails={handleProductDetails}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDialog}
        setOpen={setOpenDialog}
        productInfo={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
