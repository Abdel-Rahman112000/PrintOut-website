import CartEntryPoint from "./components/entrypoint";
import { CartPageCxtProvider } from "./context/CartPageCxt";

export default async function CartPage() {
  return (
    <CartPageCxtProvider>
      <CartEntryPoint />
    </CartPageCxtProvider>
  );
}
