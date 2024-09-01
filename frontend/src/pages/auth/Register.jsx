import Form from "@/components/ui/common/Form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUserAction } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAction(formData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account.{" "}
          <Link
            className="font-medium text-primary hover:underline text-blue-600"
            to={"/auth/login"}
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
