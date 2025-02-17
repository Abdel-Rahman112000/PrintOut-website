import { Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton({ href = "/", label = "Back" }: Props) {
  return (
    <Typography
      component={Link}
      href={href}
      fontWeight={700}
      color="primary.main"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.2,
        ".back-icon": {
          transition: "125ms",
        },
        "&:hover .back-icon": {
          transform: "translateX(-5px)",
        },
      }}
    >
      <ArrowBackIcon className="back-icon" sx={{ fontSize: 18 }} />
      {label}
    </Typography>
  );
}

type Props = {
  href?: string;
  label?: string;
};

export default BackButton;
