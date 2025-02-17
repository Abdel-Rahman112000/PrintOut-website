import { IconButton, Stack } from "@mui/material";

// Icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ProductDetailsImage() {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      {/* images row */}
      <ImagesRow />
      {/* image */}
      <img
        src="https://images.unsplash.com/photo-1514906594387-3f184d228478?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="product image"
        width={500}
        height={580}
      />
    </Stack>
  );
}

const ImagesRow = () => {
  return (
    <Stack spacing={3} alignItems={"center"} justifyContent={"center"}>
      <img
        src="https://images.unsplash.com/photo-1514906594387-3f184d228478?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image101"
        width={68}
        height={68}
        style={{ borderRadius: "9px" }}
      />
      <img
        src="https://images.unsplash.com/photo-1514906594387-3f184d228478?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image101"
        width={68}
        height={68}
        style={{
          borderRadius: "9px",
          border: "1px solid #e74c3c",
          padding: "1px",
        }}
      />
      <img
        src="https://images.unsplash.com/photo-1514906594387-3f184d228478?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image101"
        width={68}
        height={68}
        style={{ borderRadius: "9px" }}
      />
      <Stack alignItems={"center"} justifyContent={"center"}>
        <IconButton>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
