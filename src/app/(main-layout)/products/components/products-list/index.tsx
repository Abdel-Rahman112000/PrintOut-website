import { Button, Stack, Typography } from "@mui/material";
import ProductsDataList from "./ProductList";
import { useContext } from "react";
import { ProductsContext } from "../../context";
import Loader from "./Loader";

export default function ProductsList() {
  const {
    brands,
    searchParams,
    loadingProducts,
    products,
    handleChangeSearchParams,
    filter,
  } = useContext(ProductsContext);

  if ((Array.isArray(products) && products.length == 0, loadingProducts))
    return <></>;
  return (
    <Stack>
      {/* brands */}
      <Stack direction={"row"} spacing={2} p={3} overflow={"auto"}>
        {filter?.categories.length != 0 && (
          <Button
            variant="text"
            sx={{
              fontWeight: searchParams?.category_id ? "500" : "800",
              color: "#000",
            }}
            onClick={() =>
              handleChangeSearchParams({ ...searchParams, category_id: "0" })
            }
          >
            All
          </Button>
        )}

        {Array.isArray(filter?.categories) &&
          filter?.categories?.map((cat) => (
            <Button
              key={cat.id}
              variant="text"
              sx={{
                fontWeight:
                  searchParams?.category_id == cat.id.toString()
                    ? "800"
                    : "500",
                color: "#000",
              }}
              onClick={() =>
                handleChangeSearchParams({
                  ...searchParams,
                  category_id: cat.id.toString(),
                })
              }
            >
              {cat?.name}
            </Button>
          ))}
      </Stack>
      {/* products */}
      {loadingProducts ? <Loader /> : <ProductsDataList />}
    </Stack>
  );
}
