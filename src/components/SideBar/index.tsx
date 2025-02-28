import { Stack } from "@mui/material";
import React, { ReactNode } from "react";

function SideBar({ children }: { children: ReactNode }) {
  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
      mt={4}
      p={0}
      sx={{
        background:
          "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
        color: "#fff",
        borderRadius: "15px",
        maxHeight: "80vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          my: 2,
        },
        "&::-webkit-scrollbar-thumb": {
          background:
            "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background:
            "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
        },
      }}
    >
      {children}
    </Stack>
  );
}

export default SideBar;
