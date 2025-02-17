import { Stack } from "@mui/material";
import BaseLink from "../Base";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ForwardLink({ title, href }: Props) {
  return (
    <BaseLink props={{ href }}>
      <Stack
        gap={0.5}
        direction="row"
        alignItems="center"
        sx={{
          ".link-icon": {
            transition: "transform 200ms ease-out",
          },
          "&:hover": {
            textDecoration: "underline",
            color: "primary.main",
            ".link-icon": {
              transform: "translateX(6px)",
            },
          },
        }}
      >
        {title}
        <ArrowForwardIcon className="link-icon" />
      </Stack>
    </BaseLink>
  );
}

type Props = {
  title: React.ReactNode;
  href: string;
};

export default ForwardLink;
