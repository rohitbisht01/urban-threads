import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import { LogOut, Menu } from "lucide-react";
import { logoutUserAction, resetTokenAndCreds } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logoutUserAction());
    dispatch(resetTokenAndCreds());
    sessionStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        variant="ghost"
        className="lg:hidden sm:block"
        onClick={() => setOpen((d) => !d)}
      >
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
