import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function SkelatonProductCard() {
  return (
    <Paper
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background:
          "linear-gradient(180deg, rgba(24, 190, 222, 0.5) 66.9%, rgba(90, 191, 139, 0.5) 100%)",
        minHeight: "450px",
        display: "flex",
        width: "320px",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: 5,
      }}
    >
      {/* Image and top actions */}
      <Stack
        sx={{
          p: 2,
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
          height: "280px",
          width: "100%",
          borderStartStartRadius: "12px",
          borderStartEndRadius: "12px",
          position: "relative",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <IconButton sx={{ bgcolor: "#fff" }}>
          <Skeleton variant="circular" width={24} height={24} />
        </IconButton>
        <Chip
          label={<Skeleton width={60} height={20} />}
          sx={{
            bgcolor: "#1ABFDC",
            color: "#fff",
            fontSize: 12,
            height: 24,
          }}
        />
      </Stack>

      {/* Product title and description */}
      <Stack
        sx={{ flexDirection: "row", justifyContent: "space-between", p: 2 }}
      >
        <Box width="100%">
          <Skeleton width="80%" height={24} />
          <Skeleton width="100%" height={18} />
          <Skeleton width="70%" height={18} />
        </Box>
      </Stack>

      {/* Price and Add to Cart */}
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          p: 2,
          alignItems: "end",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          sx={{ borderRadius: 5 }}
        />
        <Skeleton width={60} height={28} />
      </Stack>
    </Paper>
  );
}

export default SkelatonProductCard;
