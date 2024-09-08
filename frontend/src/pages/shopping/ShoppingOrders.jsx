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
import { useState } from "react";

const ShoppingOrders = () => {
  const [openDialog, setOpenDialog] = useState(false);

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
              <TableRow>
                <TableCell>1234</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>1234</TableCell>
                <TableCell>
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <Button onClick={() => setOpenDialog(true)}>
                      View Details
                    </Button>
                    <ShoppingOrderDetails />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingOrders;
