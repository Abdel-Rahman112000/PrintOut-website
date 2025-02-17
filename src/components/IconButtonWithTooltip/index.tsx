import {
  IconButton,
  IconButtonProps,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
} from "@mui/material";
import Link from "next/link";

function IconButtonWithTooltip({
  title,
  subTitle,
  toolTipProps,
  url,
  inSamePage,
  ...props
}: Props) {
  if (!url) return null;
  return (
    <Tooltip
      arrow
      placement="top"
      slotProps={{
        tooltip: {
          sx: { bgcolor: "background.default" },
        },
        arrow: {
          sx: { color: "background.default" },
        },
      }}
      title={
        <Stack>
          <Typography variant="body2">{title}</Typography>
          {subTitle && (
            <Typography variant="caption" color={"primary.main"}>
              {subTitle}
            </Typography>
          )}
        </Stack>
      }
      {...toolTipProps}
    >
      <IconButton
        color="secondary"
        sx={{ color: "text.primary" }}
        component={Link}
        target={inSamePage ? undefined : "_blank"}
        href={url}
        {...props}
      />
    </Tooltip>
  );
}

type Props = {
  title: string;
  url?: string | null;
  subTitle?: string;
  toolTipProps?: TooltipProps;
  inSamePage?: boolean;
} & IconButtonProps;

export default IconButtonWithTooltip;
