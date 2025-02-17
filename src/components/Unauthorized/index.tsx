import { Stack, Typography } from "@mui/material";
import BackToHomeBtn from "../BackToHomeBtn";

function Unauthorized() {
  return (
    <Stack alignItems={"center"} spacing={2}>
      <Typography variant="h4" textAlign={"center"} fontWeight={700}>
        <p>Error Code 401</p>
        You are unauthorized to view this page!!
      </Typography>
      <BackToHomeBtn />
    </Stack>
  );
}

export default Unauthorized;
