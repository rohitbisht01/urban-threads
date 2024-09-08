import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import ShoppingOrderDetails from "@/components/ui/shopping/ShoppingOrderDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllOrdersByUserIdAction,
  getOrderDetailsAction,
  resetOrderDetails,
} from "@/store/shop/shop-order-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingOrders = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const handleFetchOrderInfo = (orderId) => {
    dispatch(getOrderDetailsAction(orderId));
  };

  useEffect(() => {
    dispatch(getAllOrdersByUserIdAction(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDialog(true);
    }
  }, [orderDetails]);

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl -mb-3">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList &&
                orderList.length > 0 &&
                orderList.map((orderItem) => {
                  return (
                    <TableRow key={orderItem?._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>{orderItem?.orderStatus}</TableCell>
                      <TableCell>{orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDialog}
                          onOpenChange={() => {
                            setOpenDialog(false);
                            dispatch(resetOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() => handleFetchOrderInfo(orderItem?._id)}
                          >
                            View Details
                          </Button>
                          <ShoppingOrderDetails orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingOrders;
