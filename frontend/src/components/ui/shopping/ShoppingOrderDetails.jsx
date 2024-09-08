import { Separator } from "../separator";
import { Label } from "../label";
import { DialogContent } from "../dialog";
import { useSelector } from "react-redux";

const ShoppingOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[700px]">
      <div className="space-y-6">
        {/* Order Summary Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Date:</span>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Total:</span>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Status:</span>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Order Status:</span>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
        </div>

        <Separator />

        {/* Order Details Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Items Ordered</h2>
          <ul className="space-y-3">
            {orderDetails?.cartItems?.map((item) => (
              <li
                key={item?.productId}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  {/* <div className="w-16 h-16 bg-gray-200"> */}
                  <img
                    src={item?.image}
                    className="w-16 h-16 object-cover"
                    alt=""
                  />
                  <div>
                    <p className="font-medium">{item?.title}</p>
                    <p className="text-sm text-gray-500">
                      {item?.quantity} x ${item?.price}
                    </p>
                  </div>
                </div>
                <div className="font-semibold">
                  ${item?.price * item?.quantity}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Shipping Information Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <div className="text-muted-foreground space-y-1">
            <p>{user?.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            <p>{orderDetails?.addressInfo?.notes}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetails;
