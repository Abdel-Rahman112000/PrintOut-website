"use client";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { useContext } from "react";
import { ProductsContext } from "../../context";
import { ProductCard } from "./ProductList";
import { useParams } from "next/navigation";

export default function ProductsList() {
  const {
    brands,
    searchParams,
    loadingProducts,
    products,
    handleChangeSearchParams,
  } = useContext(ProductsContext);
  const params = useParams();

  return (
    <Stack>
      {/* brands */}
      {params?.productName == "2" && (
        <Stack direction={"row"} spacing={2} p={3} overflow={"auto"}>
          {brands?.length != 0 && (
            <Box>
              <Avatar
                sx={{
                  width: "70px",
                  height: "70px",
                  border:
                    searchParams?.category_id == "0"
                      ? "3px solid #000"
                      : "0px solid #000",
                  bgcolor: "primary.main",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChangeSearchParams({
                    ...searchParams,
                    category_id: "0",
                  })
                }
              >
                All
              </Avatar>
            </Box>
          )}

          {Array.isArray(brands) &&
            brands?.map((brand) => (
              <Stack
                key={brand.id}
                sx={{
                  display: "flex",
                  flexDirection: "col",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={brand?.media?.[0]?.original_url}
                  sx={{
                    width: "70px",
                    height: "70px",
                    border:
                      searchParams?.category_id == brand.id.toString()
                        ? "3px solid #20B9C9"
                        : "0px solid #000",
                  }}
                />
                <Button
                  variant="text"
                  sx={{
                    fontWeight:
                      searchParams?.category_id == brand.id.toString()
                        ? "800"
                        : "500",
                    color:
                      searchParams?.category_id == brand.id.toString()
                        ? "primary.main"
                        : "#000",
                  }}
                  onClick={() =>
                    handleChangeSearchParams({
                      ...searchParams,
                      category_id: brand.id.toString(),
                    })
                  }
                >
                  {brand?.name}
                </Button>
              </Stack>
            ))}
        </Stack>
      )}
      {/* products */}
      <ProductCard />
    </Stack>
  );
}
