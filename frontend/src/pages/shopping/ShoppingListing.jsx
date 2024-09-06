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
import {
  fetchAllShopProducts,
  getproductDetailsAction,
} from "@/store/shop/product-slice";
import UserProductTile from "@/components/ui/shopping/UserProductTile";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "@/components/ui/shopping/ProductDetails";

const ShoppingListing = () => {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (selectionId, currentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(selectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [selectionId]: [currentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[selectionId].indexOf(currentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[selectionId].push(currentOption);
      } else {
        copyFilters[selectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllShopProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, filters, sort]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  const createSearchParams = (filterParams) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParams(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  const handleProductDetails = (productId) => {
    dispatch(getproductDetailsAction(productId));
  };

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
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
                <UserProductTile
                  product={product}
                  handleProductDetails={handleProductDetails}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
      <ProductDetails
        open={openDialog}
        setOpen={setOpenDialog}
        productInfo={productDetails}
      />
    </div>
  );
};

export default ShoppingListing;
