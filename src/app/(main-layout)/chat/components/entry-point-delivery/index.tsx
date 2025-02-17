// MUI
import { Container, Grid } from "@mui/material";
import ChatsComponent from "../Chats";
import ChatBox from "../ChatBox";

export default function ChatEntryPointDelivery() {
  // States

  //   methods

  // return
  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <Grid container>
        <Grid
          item
          md={4}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <ChatsComponent />
        </Grid>
        <Grid item xs={12} md={8}>
          <ChatBox />
        </Grid>
      </Grid>
    </Container>
  );
}
