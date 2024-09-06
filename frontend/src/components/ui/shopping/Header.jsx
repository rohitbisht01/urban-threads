import { Link, useNavigate } from "react-router-dom";
import DarkLogo from "/icon-dark.svg";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../sheet";
import { Button } from "../button";
import { CircleUser, LogOut, Menu, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUserAction } from "@/store/auth-slice";
import { toast } from "@/hooks/use-toast";
import CartWrapper from "./CartWrapper";
import { useEffect, useState } from "react";
import { fetchAllCartItemsAction } from "@/store/shop/cart-slice";

const menuItemsList = [
  {
    id: "home",
    label: "Home",
    href: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    href: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    href: "/shop/listing",
  },
  { id: "women", label: "Women", href: "/shop/listing" },
  { id: "kids", label: "Kids", href: "/shop/listing" },

  { id: "accessories", label: "Accessories", href: "/shop/listing" },
  { id: "search", label: "Search", href: "/shop/listing" },
];

const MenuItems = () => {
  return (
    <div className="flex flex-col mb-3 lg:mb-0 lg:items-center sm:gap-2 gap-6 lg:flex-row">
      {menuItemsList.map((item) => {
        return (
          <Link
            className="sm:text-sm hover:bg-slate-200 sm:rounded-md p-2 font-medium text-sm  ease-in duration-200 "
            key={item.id}
            to={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

const HeaderRightContent = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);

  const [openCartSheet, setOpenCartSheet] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUserAction()).then((data) => {
      toast({
        description: data?.payload?.message,
      });
    });
  };

  useEffect(() => {
    dispatch(fetchAllCartItemsAction(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-3">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart />
          <span className="sr-only">Shopping Cart</span>
        </Button>
        <CartWrapper
          cartItems={
            cartItems && cartItems.items?.length > 0 ? cartItems.items : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/shop/account")}
          >
            <CircleUser className="h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={"/shop/home"} className="flex items-center gap-3">
          <img className="h-10 w-10" src={DarkLogo} alt="logo" />
          <span className="font-bold text-xl">Urban Threads</span>
        </Link>

        {/* menu item for smaller devices */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px]">
            <Link to={"/shop/home"} className="flex items-center gap-3 mb-10">
              <img className="h-10 w-10" src={DarkLogo} alt="logo" />
              <span className="font-bold text-xl">Urban Threads</span>
            </Link>
            <MenuItems />
            <HeaderRightContent user={user} />
          </SheetContent>
        </Sheet>

        {/* menu item for larger devices */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent user={user} />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
