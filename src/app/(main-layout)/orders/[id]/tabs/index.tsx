"use client";

import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useState } from "react";
import MainOrderProducts from "./01.OrderProducts";
import { Order } from "@/types/common/Order";
import TrackingOrder from "./02.TrackingOrder";
import OrderAddresses from "./03.Addresses";

type ActiveTabType = "Products" | "Tracking" | "Addresses";

export default function MainOrderDetailsTabs(props: PropsType) {
  const { mainOrder } = props;
  const [activeTabName, setActiveTabName] = useState<ActiveTabType>("Products");

  const TheRightScreen = () => {
    switch (activeTabName) {
      case "Products":
        return <MainOrderProducts mainOrder={mainOrder} />;
      case "Tracking":
        return <TrackingOrder mainOrder={mainOrder} />;
      case "Addresses":
        return <OrderAddresses mainOrder={mainOrder} />;
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveTabName("Products");
              }}
            >
              <ListItemText
                primary="Products"
                sx={{
                  "& .MuiTypography-root": {
                    padding: 2,
                    color: activeTabName == "Products" ? "#fff" : "#000",
                    bgcolor:
                      activeTabName == "Products" ? "#20b9c9" : undefined,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveTabName("Tracking");
              }}
            >
              <ListItemText
                primary="Track Orders"
                sx={{
                  "& .MuiTypography-root": {
                    padding: 2,
                    color: activeTabName == "Tracking" ? "#fff" : "#000",
                    bgcolor:
                      activeTabName == "Tracking" ? "#20b9c9" : undefined,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveTabName("Addresses");
              }}
            >
              <ListItemText
                primary="Addresses"
                sx={{
                  "& .MuiTypography-root": {
                    padding: 2,
                    color: activeTabName == "Addresses" ? "#fff" : "#000",
                    bgcolor:
                      activeTabName == "Addresses" ? "#20b9c9" : undefined,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={8}>
        <TheRightScreen />
      </Grid>
    </Grid>
  );
}

type PropsType = {
  mainOrder: Order | undefined;
};
