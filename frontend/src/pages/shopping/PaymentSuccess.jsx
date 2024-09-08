import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-green-500">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase! Your order has been successfully
          processed.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/shop/home")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mt-4"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/shop/account")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg mt-4 ml-2"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
