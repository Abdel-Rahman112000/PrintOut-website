"use client";
import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { HomeContext } from "../../context";

export default function TopBrands() {
  const { brands } = useContext(HomeContext);
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Stack
        sx={{
          width: "90%",
          borderRadius: "15px",
          px: 6,
          justifyContent: "center",
          alignItems: "center",
          minHeight: "350px",
          background:
            "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="body1"
          fontSize={40}
          fontWeight={700}
          color={"#fff"}
        >
          Top Brands Deal
        </Typography>
        <Typography variant="body2" color={"#fff"} fontSize={18}>
          Up To
          <b style={{ color: "yellow", margin: "0 5px" }}>60%</b>
          off on brands
        </Typography>
        <Stack
          width={"100%"}
          direction={{
            xs: "column",
            md: "row",
          }}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          mt={4}
          spacing={2}
        >
          {brands?.map((brand) => (
            <img
              key={brand.id}
              src={brand?.media?.[0]?.original_url ?? ""}
              alt="brand image"
              className="hvr-float"
              style={{
                width: "177.52px",
                height: "120px",
                borderRadius: "12px",
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
