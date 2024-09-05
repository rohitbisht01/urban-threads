import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../button";

const adminRoutes = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    id: "products",
    icon: ShoppingCart,
    label: "Products",
    href: "/admin/products",
  },
  {
    id: "orders",
    label: "Orders",
    icon: BadgeCheck,
    href: "/admin/orders",
  },
];

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="mt-6">
            <SheetHeader className="">
              <SheetTitle className="text-2xl pl-5 cursor-pointer ">
                Admin Panel
              </SheetTitle>
              <SidebarItems setOpen={setOpen} />
            </SheetHeader>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <UserCog size={36} />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        <SidebarItems />
      </aside>
    </Fragment>
  );
};

const SidebarItems = ({ setOpen }) => {
  const location = useLocation();

  return (
    <div className="mt-5 text-slate-500 px-4">
      {adminRoutes.map((route) => {
        const Icon = route.icon;
        const isActive = location.pathname.includes(route.href);

        return (
          <div
            key={route.href}
            onClick={() => setOpen((d) => !d)}
            className={`${isActive ? "text-black" : ""}`}
          >
            <Link
              to={route.href}
              className="flex items-center my-2 gap-3 font-medium hover:bg-slate-200 hover:text-black p-2 rounded-md ease-in duration-200"
            >
              <Icon />
              <p className="text-lg">{route.label}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
