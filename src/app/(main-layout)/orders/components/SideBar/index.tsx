"use client";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SideBar from "@/components/SideBar";
import { Tab, Tabs } from "@mui/material";
import React, { useContext } from "react";
import { UserOrdersCxt } from "../../context/UserOrdersCxt";
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function SideBarLayout() {
  const { orders, value, handleChange, setActiveTabName } =
    useContext(UserOrdersCxt);

  return (
    <SideBar>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{
          width: "100%",
          p: 2,
        }}
      >
        <Tab
          label="Track Order"
          onClick={() => setActiveTabName("Track_Order")}
          icon={<AddLocationIcon />}
          {...a11yProps(0)}
          iconPosition="start"
          sx={{
            color: "#fff",
            borderRadius: "10px",
            mb: "10px",
            backgroundColor: value === 0 ? "#fff" : "transparent",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#20B9C9",
            },
            textTransform: "none",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "500",
          }}
        />
        <Tab
          label="Wishlist"
          icon={<FavoriteBorderIcon />}
          {...a11yProps(1)}
          iconPosition="start"
          sx={{
            color: "#fff",
            borderRadius: "10px",
            mb: "10px",
            backgroundColor: value === 1 ? "#fff" : "transparent",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#20B9C9",
            },
            textTransform: "none",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "500",
          }}
        />
        <Tab
          label="Addresses"
          {...a11yProps(2)}
          iconPosition="start"
          sx={{
            color: "#fff",
            borderRadius: "10px",
            mb: "10px",
            backgroundColor: value === 2 ? "#fff" : "transparent",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#20B9C9",
            },
            textTransform: "none",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "500",
          }}
        />
        <Tab
          label="Browsing History"
          {...a11yProps(3)}
          iconPosition="start"
          sx={{
            color: "#fff",
            borderRadius: "10px",
            mb: "10px",
            backgroundColor: value === 3 ? "#fff" : "transparent",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#20B9C9",
            },
            textTransform: "none",
            justifyContent: "flex-start",
            fontSize: "18px",
            fontWeight: "500",
          }}
        />
      </Tabs>
    </SideBar>
  );
}

export default SideBarLayout;
