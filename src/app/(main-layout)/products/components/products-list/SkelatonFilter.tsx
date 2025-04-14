import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  List,
  ListItem,
  Skeleton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SideBar from "@/components/SideBar";

export default function SkelatonProductsFilters() {
  return (
    <SideBar>
      <Stack
        p={"1.2rem"}
        width={"100%"}
        spacing={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"2px solid #fff"}
      >
        <TuneIcon />
      </Stack>

      {/* Types Skeleton */}
      <Accordion
        expanded
        sx={{
          width: "95%",
          color: "#fff",
          backgroundColor: "transparent",
          boxShadow: "none",
          my: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: "#fff" }} />}
        ></AccordionSummary>
        <AccordionDetails>
          {[...Array(4)].map((_, index) => (
            <List key={index}>
              <ListItem sx={{ p: 0 }}>
                <Skeleton width={100} height={25} />
              </ListItem>
            </List>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Categories Skeleton */}
      <Accordion
        expanded
        sx={{
          width: "95%",
          color: "#fff",
          backgroundColor: "transparent",
          boxShadow: "none",
          my: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: "#fff" }} />}
        ></AccordionSummary>
        <AccordionDetails>
          {[...Array(3)].map((_, index) => (
            <List key={index}>
              <ListItem sx={{ p: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Skeleton variant="circular">
                    <Avatar />
                  </Skeleton>
                  <Skeleton width={100} height={25} sx={{ ml: 2 }} />
                </Box>
              </ListItem>
            </List>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Price Slider Skeleton */}
      <Box sx={{ width: 200, my: 1 }}>
        <Skeleton height={30} width={"100%"} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={80} height={30} />
          <Skeleton width={80} height={30} />
        </Box>
      </Box>
    </SideBar>
  );
}
