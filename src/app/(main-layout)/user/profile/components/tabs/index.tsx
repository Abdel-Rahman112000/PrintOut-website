"use client";

import {
  Container,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
} from "@mui/material";
import { FC, ReactNode, useMemo } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

import AddressManagement from "./address-management";
type TabType = {
  name: ReactNode;
  icon: ReactNode;
  value: string;
  content: FC;
};

const tabs: TabType[] = [
  {
    name: "Profile",
    value: "profile",
    content: () => "User Profile",
    icon: <PersonIcon />,
  },
  {
    name: "Address Management",
    value: "address",
    content: AddressManagement,
    icon: <HomeIcon />,
  },
];

function ProfileTabs() {
  const [tab, setTab] = useQueryParam(
    "tab",
    withDefault(StringParam, "address")
  );

  const current = useMemo(() => {
    const current = tabs.find(({ value }) => value === tab);
    if (current) return <current.content />;
    return null;
  }, [tab]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper elevation={6}>
            <MenuList>
              {tabs.map(({ name, icon, value }) => (
                <MenuItem
                  key={value}
                  onClick={() => setTab(value)}
                  sx={({ palette }) => ({
                    ...(value === tab
                      ? {
                          bgcolor: `${palette.primary.main} !important`,
                          "*": {
                            color: `${palette.primary.contrastText} !important`,
                          },
                        }
                      : {}),
                  })}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Stack>{current}</Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileTabs;
