import Form from "@/components/ui/common/Form";
import { loginFormControls } from "@/config";
import { toast } from "@/hooks/use-toast";
import { loginUserAction } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          description: data?.payload?.message,
        });
      } else {
        toast({
          description: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login to Urban Threads
        </h1>
        <p className="mt-2">
          Don&apos;t have an account.{" "}
          <Link
            className="font-medium hover:underline text-blue-600"
            to={"/auth/register"}
          >
            Register
          </Link>
        </p>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText={"Log In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
