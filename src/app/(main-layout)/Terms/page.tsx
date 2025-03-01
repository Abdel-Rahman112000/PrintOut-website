"use client";
import SideBar from "@/components/SideBar";
import {
  Box,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Dashboard } from "@mui/icons-material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PrivacyPage from "./component/PrivacyPage";
import TermsPage from "./component/TermsPage";
import ShippingPage from "./component/ShippingPage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function Term() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Box
        sx={{
          backgroundImage: `url(/assets/images/demo/terms.png)`,
          backgroundPosition: "center 0",
          backgroundRepeat: "no-repeat",
          height: "90vh",
        }}
      ></Box>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={2.5}>
            <SideBar>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{
                  width: "100%",
                }}
              >
                <Tab
                  label="Privacy Policy"
                  {...a11yProps(0)}
                  icon={<Dashboard />}
                  iconPosition="start"
                  sx={{
                    color: "#fff",
                    backgroundColor: value === 0 ? "#fff" : "transparent",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#20B9C9",
                    },
                    padding: "10px 20px",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                />
                <Tab
                  label="Returns & Refund Policy"
                  {...a11yProps(1)}
                  icon={<RestorePageIcon />}
                  iconPosition="start"
                  sx={{
                    color: "#fff",
                    backgroundColor: value === 1 ? "#fff" : "transparent",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#20B9C9",
                    },
                    padding: "10px 20px",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                />
                <Tab
                  label="Terms & Conditions"
                  {...a11yProps(2)}
                  icon={<NoteAltIcon />}
                  iconPosition="start"
                  sx={{
                    color: "#fff",
                    backgroundColor: value === 2 ? "#fff" : "transparent",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#20B9C9",
                    },
                    padding: "10px 20px",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                />
                <Tab
                  label="Shipping Policy"
                  {...a11yProps(3)}
                  icon={<AddBusinessIcon />}
                  iconPosition="start"
                  sx={{
                    color: "#fff",
                    backgroundColor: value === 3 ? "#fff" : "transparent",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#20B9C9",
                    },
                    padding: "10px 20px",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                />
              </Tabs>
            </SideBar>
          </Grid>
          <Grid item xs={9.5}>
            <CustomTabPanel value={value} index={0}>
              <PrivacyPage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <PrivacyPage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <TermsPage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <ShippingPage />
            </CustomTabPanel>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default Term;
