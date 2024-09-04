import { Button } from "../button";
import { LogOut, Menu } from "lucide-react";

const AdminHeader = ({ setOpen }) => {
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
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm">
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
