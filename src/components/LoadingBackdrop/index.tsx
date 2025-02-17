import {
  Backdrop,
  BackdropProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";

function LoadingBackdrop({ circularProgressProps, sx, ...props }: Props) {
  return (
    <Backdrop {...props} sx={{ zIndex: 111000, m: "0px !important", ...sx }}>
      <CircularProgress {...circularProgressProps} />
    </Backdrop>
  );
}

type Props = {
  circularProgressProps?: CircularProgressProps;
} & BackdropProps;

export default LoadingBackdrop;
