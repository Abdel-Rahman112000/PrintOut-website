"use client";

// Hooks
import { useContext, useEffect, useState } from "react";

// MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  List,
  ListItem,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

// Icons
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ProductsContext } from "../../../context";
import { useRouter } from "next/navigation";

function valuetext(value: number) {
  return `${value}$`;
}
export default function ProductsFiltersInWebScreen({
  productType,
}: {
  productType?: string;
}) {
  const [value, setValue] = useState<number[]>([20, 37]);
  const [expand1, setExpand1] = useState(true);
  const [expand2, setExpand2] = useState(true);
  const router = useRouter();
  const { filter, handleChangeSearchParams, searchParams } =
    useContext(ProductsContext);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  useEffect(() => {
    handleChangeSearchParams({ ...searchParams, type_id: productType });
  }, [productType]);
  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
      mt={4}
      sx={{
        background:
          "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
        color: "#fff",
        borderRadius: "15px",
        maxHeight: "80vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          my: 2,
        },
        "&::-webkit-scrollbar-thumb": {
          background:
            "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background:
            "linear-gradient(180deg, rgba(24,190,222,1)  20%,rgba(90,191,139,1)  100%);",
        },
      }}
    >
      <Stack
        p={"1.2rem"}
        width={"100%"}
        spacing={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderBottom={"2px solid #fff"}
      >
        <Typography
          color={"#fff"}
          variant="body1"
          fontSize={25}
          fontWeight={500}
        >
          Filter
        </Typography>
        <TuneIcon />
      </Stack>
      {/* Types */}
      <Accordion
        expanded={expand1}
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
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => setExpand1((prev) => !prev)}
        >
          <Typography
            variant="body1"
            sx={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}
          >
            Types
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Loop through Types */}
          {filter?.data.map((type, index) => (
            <List key={index}>
              <ListItem
                sx={{ cursor: "pointer", p: 0 }}
                onClick={() => {
                  router.push(`${type.id}`);
                  handleChangeSearchParams({
                    ...searchParams,
                    type_id: type.id.toString(),
                  });
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",

                    "&::before": {
                      content:
                        Number(searchParams.type_id || productType) === type.id
                          ? '"•"'
                          : '""',
                      color: "#fff",
                      marginRight: "8px",
                      fontSize: "25px",
                    },
                  }}
                >
                  {type.name}
                </Typography>
              </ListItem>
            </List>
          ))}
        </AccordionDetails>
      </Accordion>
      {/* Categories */}
      {filter?.categories.length != 0 && (
        <Accordion
          expanded={expand2}
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
            aria-controls="panel2-content"
            id="panel2-header"
            onClick={() => setExpand2((prev) => !prev)}
          >
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}
            >
              Category
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Loop through Types */}
            {filter?.categories?.map((cat) => (
              <List key={cat.id}>
                <ListItem
                  sx={{ cursor: "pointer", p: 0 }}
                  onClick={() => {
                    handleChangeSearchParams({
                      ...searchParams,
                      category_id: cat.id.toString(),
                    });
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "&::before": {
                        content:
                          Number(searchParams.category_id) === cat.id
                            ? '"•"'
                            : '""',
                        color: "#fff",
                        marginRight: "8px",
                        fontSize: "25px",
                      },
                    }}
                  >
                    <Avatar
                      alt={cat.name}
                      src={cat?.media[0].original_url}
                      sx={{ width: "30px", height: "30px" }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        px: 2,
                      }}
                    >
                      {cat.name}
                    </Typography>
                  </Box>
                </ListItem>
              </List>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
      <Box sx={{ width: 200, my: 1 }}>
        <Typography
          variant="body1"
          sx={{ color: "#fff", fontSize: "16px", fontWeight: "500", py: 2 }}
        >
          Price
        </Typography>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max={1000}
          sx={{ color: "#fff" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              border: "solid 1px #BEBCBD",
              borderRadius: "10px ",
              px: 3,
              py: 1,
              color: "#fff",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >{`$${value[0]}`}</Typography>
          <Typography
            variant="body1"
            sx={{
              border: "solid 1px #BEBCBD",
              borderRadius: "10px ",
              px: 3,
              py: 1,
              color: "#fff",
              fontWeight: 500,
              fontSize: "16px",
            }}
          >{`$${value[1]}`}</Typography>
        </Box>
      </Box>
    </Stack>
  );
}
