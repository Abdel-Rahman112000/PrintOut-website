import { Box, BoxProps, SxProps, Theme } from "@mui/material";

const styles: SxProps<Theme> = {
  borderRadius: 1,
  border: "1px solid transparent",
  borderStyle: "inset",
  "&, *": {
    transition: "all 100ms ease-in",
  },
  "&:hover": {
    // transform: "scale(1.01)",
    borderTop: "1px solid #FFFFFF33",
    // boxShadow: "-1px -1px 0px  #FFFFFF33",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
    bgcolor: "background.medTransparent",
    backdropFilter: "blur(10px)",
    ".text-color-effect": {
      color: "primary.main",
    },
  },
};

function HoverableBox(props: BoxProps) {
  return <Box {...props} sx={{ ...styles, ...props.sx } as SxProps<Theme>} />;
}

export default HoverableBox;
