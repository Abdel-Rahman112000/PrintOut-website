import { Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "../BackButton";

function BackToHomeBtn() {
  return <BackButton href="/" label="Ali Soliman" />;
}

export default BackToHomeBtn;
