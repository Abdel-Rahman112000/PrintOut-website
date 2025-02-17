// MUI
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Icons
import VideocamIcon from "@mui/icons-material/Videocam";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context";

export default function ChatBoxHeader() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { chatBoxMessages, loadingChat, chatType, userData, activeDelivery } =
    useContext(ChatContext);

  const useName =
    chatType == "DeliveryMens"
      ? activeDelivery?.user_name
      : userData?.user_name;

  if (isMobile && chatType == "DeliveryMens") return <MobileSelectChat />;
  return (
    <>
      <Stack
        p={3}
        spacing={4}
        direction={"row"}
        alignItems={"center"}
        border={"1px solid lightgray"}
        borderRadius={"0px 8px 0 0"}
        sx={{
          sx: "none",
          md: "flex",
        }}
      >
        <Badge color="success" variant="dot">
          <Avatar>{useName?.slice(0, 1) ?? "A"}</Avatar>
        </Badge>

        {/* info */}
        <Stack
          flexGrow={1}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography variant="body1" fontSize={16}>
              {useName ?? ""}
            </Typography>
            <Typography variant="body2" fontSize={13}>
              {chatType == "DeliveryMens"
                ? "Chat with delivery man."
                : "chat with print out admins."}
            </Typography>
          </Box>
          {/* actions */}
          {chatType == "DeliveryMens" && (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={3}
            >
              <IconButton>
                <VideocamIcon />
              </IconButton>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}

const MobileSelectChat = () => {
  // declare and define component state and variables
  const {
    activeDelivery,
    handleStoreActiveDelivery,
    deliveryMenList,
    chatType,
  } = useContext(ChatContext);
  const [defaultValue, setDefaultValue] = useState(deliveryMenList?.[0]?.id);

  // handle side effects
  useEffect(() => {
    const chat = deliveryMenList?.[0];

    if (chat) {
      setDefaultValue(chat.id);
      handleStoreActiveDelivery(chat);
    }
  }, [chatType]);

  // Methods
  const handleChange = (id: number) => {
    const chat = deliveryMenList?.find((ele) => ele.id == id);

    if (chat) handleStoreActiveDelivery(chat);
  };

  if (deliveryMenList?.length == 0)
    return (
      <Box p={1}>
        <Typography variant="body2">No chats to slect</Typography>
      </Box>
    );
    
  return (
    <Select
      labelId="select-active-chat-label"
      id="select-active-chat"
      value={activeDelivery?.id}
      onChange={(e) => {
        handleChange(+e.target.value);
      }}
      fullWidth
      variant="standard"
      defaultValue={defaultValue}
      className="block md:hidden"
      sx={{
        xs: "flex",
        md: "none",
      }}
    >
      {deliveryMenList?.map((man) => (
        <MenuItem key={man.id} value={man.id}>
          <Stack
            p={3}
            spacing={4}
            direction={"row"}
            alignItems={"center"}
            borderRadius={"0px 8px 0 0"}
            border={"1px solid lightgray"}
          >
            <Badge color="success" variant="dot">
              <Avatar>{man?.user_name?.slice(0, 1) ?? "A"}</Avatar>
            </Badge>
            <Typography variant="body2">{man?.user_name}</Typography>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
};
