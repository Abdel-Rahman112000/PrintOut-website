"use client";
// Icons
import EastIcon from "@mui/icons-material/East";
// MUI
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";

import { Category } from "@/types/common/Category";
import { useQuery } from "@tanstack/react-query";
import { getTopCategories } from "@/utils/api/top_category/getTopCategory";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";

export default function TopCategoriesSection() {
  const { data: featuredCategories } = useQuery({
    queryKey: [`featured-categories-data`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      const response = await getTopCategories(headers);
      console.log("featuredCategories", response);
      return response;
    },
  });
  return (
    <Stack spacing={6} pt={10}>
      {/* title */}
      <Stack direction={"row"} spacing={5}>
        <Box
          sx={{
            width: "6px",
            height: "30px",
            borderRadius: "10px",
            background:
              "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
          }}
        ></Box>
        <Typography variant="h5" fontWeight={800} fontSize={26}>
          Top Categories
        </Typography>
      </Stack>
      {/* Categories Cards */}
      <Grid container spacing={3}>
        {Array.isArray(featuredCategories) &&
          featuredCategories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
      </Grid>
    </Stack>
  );
}

const CategoryCard = ({ category }: { category: Category }) => {
  const len = category?.name?.length;
  const categoryName =
    len > 20 ? `${category?.name?.slice(0, 18)}..` : category?.name;

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <img
        src={category?.media?.[0]?.original_url ?? ""}
        width={270}
        height={395}
        style={{ borderRadius: "12px", objectFit: "cover" }}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"270px"}
      >
        <Typography variant="h6" fontSize={19} fontWeight={600}>
          {categoryName ?? ""}
        </Typography>
        <IconButton>
          <EastIcon />
        </IconButton>
      </Stack>
    </Grid>
  );
};
