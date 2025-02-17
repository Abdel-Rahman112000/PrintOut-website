"use client";

import { Link as MuiLink, Stack } from "@mui/material";
import { routes } from "./routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks() {
  const pathname = usePathname();

  return (
    <Stack
      component={"ul"}
      sx={{ li: { listStyle: "none" } }}
      direction={"row"}
      justifyContent={{ xs: "end", lg: "center" }}
      alignItems={"center"}
      spacing={{
        xs: 1,
        md: 2,
        lg: 4,
        xl: 8,
      }}
    >
      {routes
        .filter((x) => x.isPrimary)
        .map(({ name, path }) => {
          const isActive = path == pathname;
          return (
            <MuiLink
              variant="body1"
              underline="none"
              color={"text.primary"}
              key={`${name}${path}`}
              component={Link}
              sx={{
                fontWeight: isActive ? 700 : 400,
                color: "#fff",
                fontSize: "18px",
                position: "relative", //
                "&:hover, &:active": {
                  color: "#fff",
                  fontWeight: 600,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#fff",
                  transform: "scaleX(0)",
                  transformOrigin: "bottom right",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after, &:active::after": {
                  transform: "scaleX(1)",
                  transformOrigin: "bottom left",
                },
              }}
              href={path}
            >
              {name}
            </MuiLink>
          );
        })}
    </Stack>
  );
}

export default NavLinks;
