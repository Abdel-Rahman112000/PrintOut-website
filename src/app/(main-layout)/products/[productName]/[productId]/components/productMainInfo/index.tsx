"use client";
// Icons
import CommentIcon from "@mui/icons-material/Comment";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

// MUI
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "@/types/common/Product";
import { Controller, useForm } from "react-hook-form";
import { FilePond } from "react-filepond";
import { useState } from "react";

export default function ProductDetailsMainInfo({ product }: PropsType) {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <Stack spacing={3} p={"10px"}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/products">
          Shop
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          {product.type?.name}
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {product.category?.name}
        </Typography>
      </Breadcrumbs>
      <Typography variant="h3" fontWeight={700} fontSize={22}>
        {product.brand?.name}
      </Typography>
      <Typography variant="h4" fontSize={22} fontWeight={700}>
        {product.name}
      </Typography>
      {/* rating & comments */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        spacing={3}
      >
        <Rating name="product-rate" defaultValue={3.5} precision={0.5} />
        <Typography variant="body2" fontSize={16} color={"#807D7E"}>
          3.5
        </Typography>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"start"}
          spacing={2}
          color={"#807D7E"}
        >
          <CommentIcon />
          <Typography variant="body2" fontSize={16}>
            120 comment
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography variant="body2" width={"60%"} sx={{ mb: 8 }}>
          {product.description}
        </Typography>
      </Stack>
      {/* size */}

      {/* Actions */}
      <Stack spacing={4} direction={"row"} alignItems={"center"}>
        <Button
          variant="contained"
          startIcon={<ShoppingCartOutlinedIcon />}
          type="submit"
          onClick={onSubmit}
          sx={{
            color: "#fff",
            bgcolor: "#40BFAC",
            p: "10px",
            borderRadius: "10px",
          }}
        >
          Add to Cart
        </Button>
        {/* {product.type?.id == 1 && ( */}
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          sx={{ p: "10px" }}
        >
          Upload Custom Design
        </Button>

        {/* )} */}
      </Stack>
      <Divider />
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <CreditCardOutlinedIcon />
          </IconButton>
          <Typography variant="body2" fontSize={17} fontWeight={600}>
            Secure payment
          </Typography>
        </Grid>
        <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <LocalShippingOutlinedIcon />
          </IconButton>
          <Typography variant="body2" fontSize={17} fontWeight={600}>
            Free shipping
          </Typography>
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={6} sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <AssignmentReturnOutlinedIcon />
          </IconButton>
          <Typography variant="body2" fontSize={17} fontWeight={600}>
            Free Shipping & Returns
          </Typography>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <Controller
            name="file"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <FilePond
                  files={field.value}
                  onupdatefiles={(files) => {
                    field.onChange(
                      files.map((filepondFile) => filepondFile.file)
                    );
                  }}
                  allowMultiple={true}
                />
                <Typography color="error">
                  {fieldState.error?.message}
                </Typography>
              </>
            )}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => setOpen(false)}>الغاء</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

type PropsType = {
  product: Product;
};
