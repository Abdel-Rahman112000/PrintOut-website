"use client";

// React Imports
import { useRef, useState } from "react";
import type { MouseEvent } from "react";

// Next Imports
import { useParams, useRouter } from "next/navigation";

// MUI Imports
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";

// Third-party Imports
import { signOut, useSession } from "next-auth/react";
import {
  ButtonBase,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import Link from "next/link";

// Styled component for badge content
const BadgeContentSpan = styled("span")({
  width: 8,
  height: 8,
  borderRadius: "50%",
  cursor: "pointer",
  backgroundColor: "var(--mui-palette-success-main)",
  boxShadow: "0 0 0 2px var(--mui-palette-background-paper)",
});

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false);

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null);

  // Hooks
  const router = useRouter();
  const { data: session } = useSession();
  const { lang: locale } = useParams();

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  const handleUserLogout = async () => {
    try {
      // Sign out from the app
      await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
    } catch (error) {
      console.error(error);

      // Show above error in a toast like following
      // toastService.error((err as Error).message)
    }
  };

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap="circular"
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="mis-2"
      >
        <Avatar
          component={ButtonBase as any}
          variant="rounded"
          ref={anchorRef}
          className="hvr-float-shadow"
          alt={session?.user?.name || ""}
          onClick={handleDropdownOpen}
        />
      </Badge>
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        disablePortal
        anchorEl={anchorRef.current}
      >
        <MenuItem sx={{ minWidth: 200 }} component={Link} href="/user/profile">
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <Divider />

        <MenuItem color="error" onClick={() => signOut({ redirect: true })}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
