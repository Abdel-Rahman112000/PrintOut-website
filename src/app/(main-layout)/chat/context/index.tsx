"use client";

import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { MessageType } from "@/types/Chat/Message";
import { User } from "@/types/common/User";
import { DeliveryMan } from "@/types/delivery/DeliveryMan";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

export const ChatContext = createContext<ChatContextType>({
  loadingChat: false,
  chatBoxMessages: [],
  userData: undefined,
  realTimeMessages: [],
  chatType: "PrintoutAdmins",
  deliveryMenList: undefined,
  activeDelivery: undefined,
  handleStoryChatType: (type: ChatType) => {},
  handleStoreNewRTMessage: (msg: MessageType) => {},
  handleStoreActiveDelivery: (man: DeliveryMan | undefined) => {},
});

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children, userData, deliveryMenList } = props;
  const [chatType, setChatType] = useState<ChatType>("PrintoutAdmins");
  const [activeDelivery, setActiveDelivery] = useState<DeliveryMan>();
  const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([]);

  // chat messages
  const {
    data: chatBoxMessages,
    isLoading: loadingChat,
    refetch,
  } = useQuery({
    queryKey: [`chat-messages`, activeDelivery, chatType],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      const url =
        chatType == "PrintoutAdmins"
          ? api`client/messages/admin`
          : api`client/messages?delivery_id=${activeDelivery?.id}`;
      const response = await axios.get<{ data: MessageType[] }>(url, {
        headers,
      });

      return response.data.data;
    },
  });

  // handle side effects

  // TODO::declare and define helper methods
  function handleStoreNewRTMessage(msg: MessageType) {
    setRealTimeMessages((prev) => [...prev, msg]);
  }
  function handleStoreActiveDelivery(man: DeliveryMan | undefined) {
    setRealTimeMessages([]);
    refetch();
    setActiveDelivery(man);
  }

  function handleStoryChatType(type: ChatType) {
    // setRealTimeMessages([]);
    // refetch();
    // setActiveDelivery(undefined);
    setChatType(type);
  }

  // ** return component ui
  return (
    <ChatContext.Provider
      value={{
        chatType,
        userData,
        loadingChat,
        activeDelivery,
        chatBoxMessages,
        deliveryMenList,
        realTimeMessages,
        handleStoryChatType,
        handleStoreNewRTMessage,
        handleStoreActiveDelivery,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// -- declare and define helper types
type ChatType = "PrintoutAdmins" | "DeliveryMens";
type PropsType = {
  userData: User;
  deliveryMenList: DeliveryMan[] | undefined;
  children: ReactNode;
};

type ChatContextType = {
  chatType: ChatType;
  loadingChat: boolean;
  userData: User | undefined;
  realTimeMessages: MessageType[];
  chatBoxMessages: MessageType[] | undefined;
  handleStoryChatType(type: ChatType): void;
  deliveryMenList: DeliveryMan[] | undefined;
  activeDelivery: DeliveryMan | undefined;
  handleStoreNewRTMessage(msg: MessageType): void;
  handleStoreActiveDelivery(man: DeliveryMan | undefined): void;
};
