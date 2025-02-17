import { Box, Container, Grid, Paper } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { IMAGE_FIT_STYLES } from "@/constants/image-fit-styles";

function LoginPage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={8}>
        <Grid item xs={12} md={7} lg={6}>
          <LoginForm />
        </Grid>

        <Grid item xs={12} md={5} lg={6}>
          <Box sx={{ height: "100vh", py: 4 }}>
            <Paper
              elevation={10}
              component={"img"}
              src="https://www.microsoft.com/en-us/research/uploads/prod/2022/11/Homepage_banner.jpg"
              style={IMAGE_FIT_STYLES}
            ></Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
