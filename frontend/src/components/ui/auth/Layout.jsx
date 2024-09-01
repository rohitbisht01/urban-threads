import { Outlet } from "react-router-dom";
import Logo from "/icon.svg";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-x-6 text-center text-primary-foreground flex flex-col items-center gap-4">
          <div className="h-20 w-20">
            <img src={Logo} alt="Logo" className="" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Urban Threads
          </h1>
          <p className="mt-4 text-lg">
            Explore our latest collections and find your perfect style with
            ease.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
