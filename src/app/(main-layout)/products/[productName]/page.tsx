import { Container } from "@mui/material";
import { getProductsList } from "@/utils/api/product/get-products-list";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { notFound } from "next/navigation";
import { ProductsContextProvider } from "../context";
import ProductsPageEntryPoint from "../components/entrypoint";

export default async function ProductsPage({
  params,
}: {
  params?: { productName?: string };
}) {
  const headers = await getServerAuthHeaders();
  const products = await getProductsList(headers);

  console.log("Product Name from URL:", params?.productName);
  if (!products) {
    notFound();
  }

  return (
    <ProductsContextProvider products={products}>
      <Container maxWidth="xl">
        <ProductsPageEntryPoint productType={params?.productName} />
      </Container>
    </ProductsContextProvider>
  );
}
