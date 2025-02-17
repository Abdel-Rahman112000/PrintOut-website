import { Stack } from "@mui/material";
import ChatsHeader from "./ChatsHeader";
import ChatsList from "./ChatsList";

export default function ChatsComponent() {
  return (
    <Stack height={"50rem"} sx={{ overflowY: "auto" }}>
      <ChatsHeader />
      <ChatsList />
    </Stack>
  );
}
