import SideBar from "@/components/SideBar";
import { Container, Grid, Stack, Tabs, Typography } from "@mui/material";
import { UserOrdersCxtProvider } from "./context/UserOrdersCxt";
import SideBarLayout from "./components/SideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserOrdersCxtProvider>
      <Container maxWidth="xl">
        {/* orders page header */}

        <Stack spacing={2}>
          <>
            <Grid container>
              <Grid item md={3} xs={12}>
                <SideBarLayout />
              </Grid>
              {children}
            </Grid>
          </>
        </Stack>
      </Container>
    </UserOrdersCxtProvider>
  );
}
