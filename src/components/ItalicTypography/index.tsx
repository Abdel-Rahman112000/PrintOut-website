import { Typography, TypographyProps } from "@mui/material";

function ItalicTypography({ sx, ...props }: TypographyProps) {
  return <Typography {...props} sx={{ fontFamily: "Cinzel", ...sx }} />;
}

export default ItalicTypography;
