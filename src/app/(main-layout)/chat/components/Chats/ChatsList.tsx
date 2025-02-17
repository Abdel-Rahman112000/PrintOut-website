import {
  Avatar,
  Badge,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context";
import { DeliveryMan } from "@/types/delivery/DeliveryMan";
import Pusher from "pusher-js";
import { MessageType } from "@/types/Chat/Message";

export default function ChatsList() {
  const { deliveryMenList } = useContext(ChatContext);

  return (
    <Stack
      flexGrow={1}
      spacing={3}
      border={"1px solid lightgray"}
      borderRadius={"0px 0px 0px 5px"}
    >
      {deliveryMenList == undefined ? (
        <>
          <SkeletonChatItem />
          <SkeletonChatItem />
          <SkeletonChatItem />
          <SkeletonChatItem />
          <SkeletonChatItem />
        </>
      ) : (
        deliveryMenList?.map((man) => <ChatItem key={man.id} man={man} />)
      )}
    </Stack>
  );
}

const ChatItem = ({ man }: { man: DeliveryMan }) => {
  const { activeDelivery, userData, handleStoreActiveDelivery } =
    useContext(ChatContext);
  const [lastMessage, setLastMessage] = useState<MessageType>();
  const isActive = activeDelivery?.id == man.id;
  const lastMessageBrief = man?.message?.message?.slice(
    0,
    man?.message?.message?.length > 28 ? 28 : man?.message?.message?.length
  );
  const [notificationCounter, setNotificationCounter] = useState(0);

  

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
    });

    const channel = pusher.subscribe(
      `chat-channel_${userData?.global_id}-${man?.global_id}`
    );

    channel.bind("new-message", (data: MessageType) => {
      if (!isActive && data.sender_id != userData?.id)
        setNotificationCounter((prev) => prev + 1);
      else setNotificationCounter(0);

      setLastMessage(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      setNotificationCounter(0);
    }
  }, [isActive]);

  return (
    <Stack
      p={2}
      direction={"row"}
      alignItems={"start"}
      justifyContent={"space-between"}
      sx={{
        cursor: "pointer",
        bgcolor: isActive ? "#20b9c9" : "#fff",
      }}
      onClick={() => {
        handleStoreActiveDelivery(man);
      }}
    >
      <Stack spacing={2} direction={"row"} alignItems={"start"}>
        {/* Image */}
        <Badge color="success" variant="dot">
          <Avatar>{man?.user_name?.slice(0, 1) ?? "A"}</Avatar>
        </Badge>

        {/* info */}
        <Stack>
          <Typography variant="body1" fontSize={16} fontWeight={500}>
            {man?.user_name ?? ""}
          </Typography>
          <Typography variant="body2" fontSize={15}>
            {lastMessage?.message?.slice(
              0,
              lastMessage?.message?.length > 28
                ? 28
                : lastMessage?.message?.length
            ) ?? lastMessageBrief}
          </Typography>
        </Stack>
      </Stack>
      <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="body2" fontSize={14}>
          {man?.message?.created_at
            ? new Date(man?.message?.created_at)?.toLocaleDateString()
            : ""}
        </Typography>
        <Badge color="primary" badgeContent={notificationCounter} />
      </Stack>
    </Stack>
  );
};

const SkeletonChatItem = () => (
  <Skeleton height={75} width={"100%"} variant="rounded" />
);
