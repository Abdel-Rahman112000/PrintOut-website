"use client";

// Hooks
import { useContext, useState } from "react";

// MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { Category } from "@/types/common/Category";
import Loader from "../../products-list/Loader";
function valuetext(value: number) {
  return `${value}$`;
}
export default function ProductsFiltersInWebScreen() {
  const [value, setValue] = useState<number[]>([20, 37]);
  const [expand1, setExpand1] = useState(true);
  const [expand2, setExpand2] = useState(true);

  const { filter, handleChangeSearchParams, searchParams } =
    useContext(ProductsContext);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
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
        minHeight: "100vh",
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
                        Number(searchParams.type_id) === type.id ? '"•"' : '""',
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
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleChangeSearchParams({
                      ...searchParams,
                      category_id: cat.id.toString(),
                    });
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 600,
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
                    {cat.name}
                  </Typography>
                </ListItem>
              </List>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
      <Box sx={{ width: 250, my: 1 }}>
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
      {/* Price */}
      {/* <Accordion
        sx={{
          width: "90%",
          color: "#fff",
          bgcolor: "#40BFAC",
        }}
        expanded={false}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowRightIcon sx={{ color: "#fff" }} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            color={"#fff"}
            variant="body1"
            fontSize={20}
            fontWeight={600}
          >
            Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            width={"100%"}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: "95px",
                height: "30",
                border: "1px solid #807D7E",
                borderRadius: "6px",
              }}
            >
              {price?.[0] ?? 0} $
            </Stack>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                width: "95px",
                height: "30",
                border: "1px solid #807D7E",
                borderRadius: "6px",
              }}
            >
              {price?.[1] ?? 0} $
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion> */}
      {/* Color */}
      {/* <Accordion
        sx={{
          width: "90%",
          color: "#fff",
          bgcolor: "#40BFAC",
        }}
        expanded={false}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowRightIcon sx={{ color: "#fff" }} />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography
            color={"#fff"}
            variant="body1"
            fontSize={20}
            fontWeight={600}
          >
            Color
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            spacing={3}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            flexWrap={"wrap"}
          >
            <Box>
              <Box
                sx={{
                  width: 37,
                  height: 37,
                  borderRadius: "12px",
                  bgcolor: "purple",
                }}
              />
              <Typography variant="body2">purple</Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  width: 37,
                  height: 37,
                  borderRadius: "12px",
                  bgcolor: "purple",
                }}
              />
              <Typography variant="body2">purple</Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  width: 37,
                  height: 37,
                  borderRadius: "12px",
                  bgcolor: "purple",
                }}
              />
              <Typography variant="body2">purple</Typography>
            </Box>

            <Box>
              <Box
                sx={{
                  width: 37,
                  height: 37,
                  borderRadius: "12px",
                  bgcolor: "purple",
                }}
              />
              <Typography variant="body2">purple</Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion> */}
      {/* Can be edited ? */}
      {/* <Accordion
        sx={{
          width: "90%",
          color: "#fff",
          bgcolor: "#40BFAC",
        }}
        expanded={false}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowRightIcon sx={{ color: "#fff" }} />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography
            color={"#fff"}
            variant="body1"
            fontSize={20}
            fontWeight={600}
          >
            Can be edited ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            spacing={3}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            flexWrap={"wrap"}
          >
            <Chip label="yes" variant="outlined" />
            <Chip label="no" variant="outlined" />
          </Stack>
        </AccordionDetails>
      </Accordion> */}
      {/* Style */}
    </Stack>
  );
}

const CategoryItem = ({ cat }: { cat: Category }) => {
  const { searchParams } = useContext(ProductsContext);
  return (
    <Typography
      variant="body1"
      fontSize={18}
      fontWeight={600}
      color={searchParams?.category_id == cat.id.toString() ? "#000" : "#fff"}
    >
      {cat.name}
    </Typography>
  );
};
