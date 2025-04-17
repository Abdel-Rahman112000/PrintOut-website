import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function FooterMenuList({ items }: any) {
  return (
    <Box>
      <Typography variant="body1" fontSize={30} fontWeight={600} color={"#fff"}>
        {items?.title}
      </Typography>
      <List>
        {items?.items.map((item: any, index: number) => (
          <ListItem disablePadding key={index}>
            {items?.clickable ? (
              <ListItemButton component={Link} href={item.link}>
                <ListItemText
                  sx={{
                    "& .MuiTypography-root": { color: "#fff" },
                  }}
                  primary={item.text}
                />
              </ListItemButton>
            ) : (
              <Box>
                <ListItemText
                  sx={{
                    mb: 2,
                    ml: 2,
                    "& .MuiTypography-root": { color: "#fff" },
                  }}
                  primary={item.text}
                />
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
