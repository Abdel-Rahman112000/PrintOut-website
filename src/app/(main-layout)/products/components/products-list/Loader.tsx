import { Stack } from "@mui/material";
import "./Loader.scss";

export default function Loader() {
  return (
    <Stack
      width={"100%"}
      height={"90vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <div className="loader"></div>
    </Stack>
  );
}
