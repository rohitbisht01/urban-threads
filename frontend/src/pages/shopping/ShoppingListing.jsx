import ProductFilter from "@/components/ui/shopping/ProductFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { fetchAllShopProducts } from "@/store/shop/product-slice";
import UserProductTile from "@/components/ui/shopping/UserProductTile";

const ShoppingListing = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState(null);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = () => {};

  useEffect(() => {
    dispatch(fetchAllShopProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">All Products</h2>
          <div className="flex items-center gap-4">
            <span>{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      value={item.id}
                      key={item.id}
                      className="font-normal"
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {productList.map((product) => {
            return (
              <Fragment key={product._id}>
                <UserProductTile product={product} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
