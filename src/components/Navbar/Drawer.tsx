"use client";

import { Box, Button, Stack, SwipeableDrawer } from "@mui/material";
import { routes } from "./routes";
import Link from "next/link";
import ActiveLink from "../ActiveLink";

function NavDrawer({ open, setOpen }: Props) {
  return (
    <SwipeableDrawer
      anchor={"right"}
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      open={open}
      PaperProps={{ sx: { backgroundColor: "background.default" } }}
    >
      <Stack width={"280px"} p={4} py={8} spacing={2}>
        {routes.map(({ name, path, icon }) => (
          <ActiveLink
            key={`${name} - ${path}`}
            path={path}
            render={({ isActive, linkProps }) => {
              return (
                <Button
                  fullWidth
                  variant={isActive ? "contained" : "text"}
                  size="large"
                  component={Link}
                  color="primary"
                  className="hvr-float-shadow"
                  sx={{
                    justifyContent: "center",
                  }}
                  onClick={() => setOpen(false)}
                  {...(linkProps as {})}
                >
                  {name}
                </Button>
              );
            }}
          />
        ))}
      </Stack>
    </SwipeableDrawer>
  );
}

type Props = {
  setOpen: (state: boolean) => void;
  open: boolean;
};

export default NavDrawer;
