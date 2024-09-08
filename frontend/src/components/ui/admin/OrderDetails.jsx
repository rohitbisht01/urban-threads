import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { DialogContent } from "../dialog";
import { Label } from "../label";
import { useState } from "react";
import { Separator } from "../separator";
import Form from "../common/Form";
import {
  fetchAllOrdersForAdminAction,
  fetchOrderDetailForAdminAction,
  updateOrderStatusAction,
} from "@/store/admin/order-slice";

const initialFormData = {
  status: "",
};

const OrderDetails = ({ orderDetails }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatusAction({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchOrderDetailForAdminAction(orderDetails?._id));
        dispatch(fetchAllOrdersForAdminAction());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
        </div>
        <Separator />
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
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shipping Information</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>{user.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
      <div>
        <Form
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inprocess", label: "In Process" },
                { id: "inshipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
};

export default OrderDetails;
