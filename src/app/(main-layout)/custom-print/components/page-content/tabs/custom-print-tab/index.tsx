"use client";

import { Container, Grid, Typography } from "@mui/material";
import SelectType from "./select-type";
import CustomPrintForm from "./custom-print-form";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { TabsContext } from "../..";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getProduct } from "@/utils/api/product/get-product";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import ImagesPreview from "./images-preview";

function CustomPrintTab() {
  const {
    productQuery: { data: product, isLoading },
    orderQuery: { data: order, isLoading: IsOrderLoading },
  } = useContext(TabsContext);

  return (
    <>
      <LoadingBackdrop open={isLoading || IsOrderLoading} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <SelectType />
          </Grid>
          <Grid item xs={12} md={4} lg={5}>
            {product?.data && order?.data ? (
              <CustomPrintForm order={order.data} product={product.data} />
            ) : (
              !isLoading && (
                <Typography variant="h4" color="primary.main">
                  Select Print Type to proceed
                </Typography>
              )
            )}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            {order?.data && <ImagesPreview images={order.data.media || []} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CustomPrintTab;
