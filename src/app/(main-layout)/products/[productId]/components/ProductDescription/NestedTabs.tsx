"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Chip, Stack, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ color: "#807D7E" }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductDetailsTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab
            label={
              <Stack direction={"row"} spacing={3}>
                <Typography variant="body2">User comments</Typography>
                <Chip
                  label="4"
                  size="small"
                  sx={{
                    color: "#fff",
                    bgcolor: "#FA4A0C",
                    borderRadius: "7px",
                  }}
                />
              </Stack>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <Stack direction={"row"} spacing={3}>
                <Typography variant="body2">Question & Answer</Typography>
                <Chip
                  label="4"
                  size="small"
                  sx={{
                    color: "#fff",
                    bgcolor: "#FA4A0C",
                    borderRadius: "7px",
                  }}
                />
              </Stack>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        100% Premium Ceramic - makes the mug extra durable & glossy. Flexible
        handle design. Precisely printed with no chipping & no fading. Provide
        all-time enjoyment. Anytime, anywhere. Infinite range of matte-finish
        custom prints.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        100% Premium Ceramic - makes the mug extra durable & glossy. Flexible
        handle design. Precisely printed with no chipping & no fading. Provide
        all-time enjoyment. Anytime, anywhere. Infinite range of matte-finish
        custom prints.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        100% Premium Ceramic - makes the mug extra durable & glossy. Flexible
        handle design. Precisely printed with no chipping & no fading. Provide
        all-time enjoyment. Anytime, anywhere. Infinite range of matte-finish
        custom prints.
      </CustomTabPanel>
    </Box>
  );
}
