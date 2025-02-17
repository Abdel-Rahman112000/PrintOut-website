import { Stack } from "@mui/material";
import ChatBoxHeader from "./ChatBoxHeader";
import MessagesBox from "./MessagesBox";

export default function ChatBox() {
  return (
    <Stack height={"50rem"} className="w-full">
      <ChatBoxHeader />
      <MessagesBox />
    </Stack>
  );
}
