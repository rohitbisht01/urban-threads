import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePaymentAction } from "@/store/shop/shop-order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      console.log(payerId, payerId);

      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePaymentAction({ paymentId, payerId, orderId })).then(
        (data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }
        }
      );
    }
  }, [payerId, paymentId, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="max-w-sm w-full p-6 text-center shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Processing Payment...
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Please wait while we confirm your payment.
          </p>
        </CardHeader>
        <div className="flex justify-center items-center mt-4">
          {/* Add a loading spinner */}
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </Card>
    </div>
  );
};

export default PaypalReturn;
