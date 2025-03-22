import { Container, Grid, Stack } from "@mui/material";
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

        <Stack spacing={4}>
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
