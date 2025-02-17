import { getMeData } from "@/utils/api/auth/get-me";
import ChatTabs from "./components/tabs";
import { ChatContextProvider } from "./context";
import { getServerAuthHeaders } from "@/libs/auth/getServerAuthHeaders";
import { notFound } from "next/navigation";
import { getDeliveryMenList } from "@/utils/api/delivery/get-delivery-list";
import { withAuth } from "@/guards/auth.guard";

const ChatPage = async () => {
  const headers = await getServerAuthHeaders();
  const { data: userData } = await getMeData(headers);
  const { data: deliveryMenList } = await getDeliveryMenList(headers);

  if (!userData) {
    notFound();
  }

  return (
    <ChatContextProvider userData={userData} deliveryMenList={deliveryMenList}>
      <ChatTabs />
    </ChatContextProvider>
  );
};

export default withAuth(ChatPage);
