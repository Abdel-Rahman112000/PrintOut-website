import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";

export default function Custom404() {
  return (
    <Stack
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
      spacing={2}
    >
      <Typography variant="h2">404 - Page Not Found</Typography>
      <Typography variant="h6">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button component={Link} href="/" variant="contained" color="secondary">
        Go Home
      </Button>
    </Stack>
  );
}
