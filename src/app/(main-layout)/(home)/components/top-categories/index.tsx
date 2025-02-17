"use client";
// Icons
import EastIcon from "@mui/icons-material/East";
// MUI
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { HomeContext } from "../../context";
import { Category } from "@/types/common/Category";

export default function TopCategoriesSection() {
  const { categoriesRegularGiveaway } = useContext(HomeContext);

  return (
    <Stack my={6} alignItems={"center"} justifyContent={"center"}>
      <Stack
        spacing={6}
        width={{
          xs: "100%",
          md: "90%",
        }}
      >
        {/* title */}
        <Stack direction={"row"} spacing={4}>
          <Box
            sx={{
              width: "6px",
              height: "30px",
              borderRadius: "10px",
              background: "#8A33FD",
            }}
          ></Box>
          <Typography variant="h5" fontWeight={800} fontSize={26}>
            Top Categories
          </Typography>
        </Stack>
        {/* Categories Cards */}
        <Stack direction={"row"} flexWrap={"wrap"} spacing={4}>
          {Array.isArray(categoriesRegularGiveaway) &&
            categoriesRegularGiveaway?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

const LoadingCard = () => (
  <Stack spacing={4} m={5} p={3}>
    <Skeleton
      variant="rectangular"
      width={270}
      height={395}
      sx={{ borderRadius: "12px" }}
    />
    <Skeleton
      variant="rectangular"
      width={270}
      height={45}
      sx={{ borderRadius: "12px" }}
    />
  </Stack>
);

const CategoryCard = ({ category }: { category: Category }) => {
  const len = category?.name?.length;
  const categoryName =
    len > 20 ? `${category?.name?.slice(0, 18)}..` : category?.name;

  return (
    <Stack spacing={4} minWidth={282} p={"15px"}>
      <img
        src={category?.media?.[0]?.original_url ?? ""}
        width={270}
        height={395}
        className="hvr-rotate"
        style={{ borderRadius: "12px", objectFit: "fill" }}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        className="hvr-icon-forward"
        justifyContent={"space-between"}
      >
        <Typography variant="h6" fontSize={19} fontWeight={600}>
          {categoryName ?? ""}
        </Typography>
        <IconButton className="hvr-icon">
          <EastIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
