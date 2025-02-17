import { Container, Grid } from "@mui/material";
import CartItemsList from "../cartItemsList";
import CartInformation from "../cartInfo";

export default function CartEntryPoint() {
  return (
    <Container maxWidth={"xl"}>
      <Grid container>
        <Grid item xs={12} md={4} p={2}>
          <CartInformation />
        </Grid>
        <Grid item xs={12} md={8} p={2}>
          <CartItemsList />
        </Grid>
      </Grid>
    </Container>
  );
}
