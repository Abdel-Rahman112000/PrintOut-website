import { Box, BoxProps } from "@mui/material";

function DashSeparator({ sx, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        width: "28px",
        height: "7px",
        minHeight: "7px",
        bgcolor: "secondary.main",
        ...sx,
      }}
      {...props}
    />
  );
}

export default DashSeparator;
