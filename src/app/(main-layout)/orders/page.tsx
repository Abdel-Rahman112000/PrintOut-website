import { UserOrdersCxtProvider } from "./context/UserOrdersCxt";
import UsersOrdersList from "./components/orders-list/OrdersList";
import { withAuth } from "@/guards/auth.guard";

function OrdersPage() {
  return (
    <UserOrdersCxtProvider>
      <UsersOrdersList />
    </UserOrdersCxtProvider>
  );
}

export default withAuth(OrdersPage);
