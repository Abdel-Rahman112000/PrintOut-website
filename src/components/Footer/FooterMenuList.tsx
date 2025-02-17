import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function FooterMenuList() {
  return (
    <Box>
      <Typography variant="body1" fontSize={30} fontWeight={700} color={"#fff"}>
        Need Help
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              sx={{
                "& .MuiTypography-root": { color: "#fff" },
              }}
              primary="Contact Us"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              sx={{
                "& .MuiTypography-root": { color: "#fff" },
              }}
              primary="Track Order"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              sx={{
                "& .MuiTypography-root": { color: "#fff" },
              }}
              primary="Returns & Refunds"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              sx={{
                "& .MuiTypography-root": { color: "#fff" },
              }}
              primary="FAQ's"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText
              sx={{
                "& .MuiTypography-root": { color: "#fff" },
              }}
              primary="Career"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
