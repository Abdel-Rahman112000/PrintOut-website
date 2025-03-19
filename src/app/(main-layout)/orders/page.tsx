import UsersOrdersList from "./components/orders-list/OrdersList";
import { withAuth } from "@/guards/auth.guard";

function OrdersPage() {
  return <UsersOrdersList />;
}

export default withAuth(OrdersPage);
