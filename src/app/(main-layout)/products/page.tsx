import { Container } from "@mui/material";
import ProductsPageEntryPoint from "./components/entrypoint";
import { getProductsList } from "@/utils/api/product/get-products-list";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { notFound } from "next/navigation";
import { ProductsContextProvider } from "./context";

export default async function ProductsPage() {
  const headers = await getServerAuthHeaders();
  const products = await getProductsList(headers);

  if (!products) {
    notFound();
  }

  return (
    <ProductsContextProvider products={products}>
      <Container maxWidth="xl">
        <ProductsPageEntryPoint />
      </Container>
    </ProductsContextProvider>
  );
}
