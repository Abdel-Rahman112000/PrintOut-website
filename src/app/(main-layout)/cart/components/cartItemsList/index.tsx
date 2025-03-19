"use client";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { CartPageCxt } from "../../context/CartPageCxt";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem } from "@/types/cart/CartItem";
import axios from "axios";
import { api } from "@/constants/api";
import { SetStateAction } from "jotai";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { CartContext } from "@/contexts/cart/CartContext";

export default function CartItemsList() {
  const { cartItemsQueryData } = useContext(CartPageCxt);

  return (
    <Box>
      <Typography variant="h6" fontSize={22} fontWeight={600}>
        Cart Items
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={3}>
        {cartItemsQueryData?.carts?.length == 0 && (
          <Stack alignItems={"start"} justifyContent={"center"} height={250}>
            <Typography variant="body2" fontSize={22} fontWeight={600}>
              There is No Cart Items
            </Typography>
          </Stack>
        )}
        {Array.isArray(cartItemsQueryData?.carts) &&
          cartItemsQueryData?.carts?.map((cartItem) => (
            <CartProduct key={cartItem.id} cartItem={cartItem} />
          ))}
      </Stack>
    </Box>
  );
}

const CartProduct = ({ cartItem }: { cartItem: CartItem }) => {
  // State
  const [loading, setLoading] = useState(false);
  const { RemoveItemFromCard } = useContext(CartContext);
  const { handleRefreshCartItemsData } = useContext(CartPageCxt);

  // Methods
  const handleRemoveFromCart = async () => {
    setLoading(false);
    const headers = await getClientAuthHeaders();
    axios
      .delete(api`client/cart/${cartItem.id}`, { headers })
      .then((res) => {
        RemoveItemFromCard(cartItem?.id);
        handleRefreshCartItemsData();
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(true);
      });
  };

  // return ui
  return (
    <Stack
      direction={{
        xs: "column",
        md: "row",
      }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        spacing={3}
        alignItems={"center"}
        justifyItems={"start"}
      >
        <img
          src={cartItem?.media?.[0]?.original_url}
          width={170}
          height={70}
          alt="product title"
        />
        <Box>
          <Typography variant="body1" fontSize={"h6"} fontWeight={600}>
            {cartItem?.product_name ?? "_"}
          </Typography>
          {/* <Typography variant="body1" fontSize={"body1"} fontWeight={500}>
            Product Description
          </Typography> */}
          <Typography variant="body1" fontSize={"body2"} fontWeight={400}>
            {cartItem?.total_price ?? "0"} EGP
          </Typography>
        </Box>
      </Stack>

      <Stack direction={"row"} spacing={4} alignItems={"center"}>
        {/* <IconButton>
          <AddIcon />
        </IconButton>

        <Chip label="4" variant="outlined" sx={{ borderRadius: "4px" }} />

        <IconButton>
          <RemoveIcon />
        </IconButton> */}

        <IconButton
          color="error"
          onClick={handleRemoveFromCart}
          disabled={loading}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
