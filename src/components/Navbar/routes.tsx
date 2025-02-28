import { ReactNode } from "react";
import LinkIcon from "@mui/icons-material/Link";

//Icons Import
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const createRoute = (
  name: RouteType["name"],
  path: RouteType["path"],
  icon: RouteType["icon"] = <LinkIcon />,
  isPrimary: RouteType["isPrimary"] = true
): RouteType => ({ name, path, icon, isPrimary });

export const routes = [
  createRoute("Home", "/", <HomeIcon />),
  createRoute("Explore", "/products", <GridViewIcon />),
  createRoute("PrintOut", "/custom-print", <QuestionMarkIcon />),
  createRoute("Orders ", "/orders", <AssignmentIcon />),
  createRoute("Terms & Conditions", "/Terms", <AssignmentIcon />),
];

export type RouteType = {
  name: string;
  path: string;
  icon: ReactNode;
  isPrimary: boolean;
};
