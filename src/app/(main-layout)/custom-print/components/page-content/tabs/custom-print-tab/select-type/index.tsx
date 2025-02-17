"use client";

import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuList,
  MenuItem,
  Divider,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { ExpandMore } from "@mui/icons-material";
import AddLabelToEl from "@/components/AddLabelToEl";
import RoundedButton from "@/components/RoundedButton";
import { useQuery } from "@tanstack/react-query";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getCategories } from "@/utils/api/category/get-categories";
import { useContext } from "react";
import { TabsContext } from "../../..";
import { $ProductType } from "@/types/common/Product";

const AccordionPlaceholder = () => (
  <div>
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-label="Expand"
        aria-controls="-content"
        id="-header"
      >
        <Typography>Cards</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <MenuList>
          <MenuItem>Bussiness Card</MenuItem>
          <MenuItem>Bussiness Card</MenuItem>
          <MenuItem>Bussiness Card</MenuItem>
        </MenuList>
      </AccordionDetails>
    </Accordion>
  </div>
);

function SelectType() {
  const { setProductId, productId } = useContext(TabsContext);

  const { data, isLoading } = useQuery({
    queryKey: ["get-categories"],
    async queryFn() {
      const headers = await getClientAuthHeaders();
      const res = getCategories(headers, {
        type_id: $ProductType.CUSTOM_PRINT.toString(),
      });
      return res;
    },
  });

  return (
    <Stack spacing={10}>
      <div>
        <Stack direction={"row"} spacing={2}>
          <Typography variant="h6" flexGrow={1}>
            Print Type
          </Typography>
          <TuneIcon />
        </Stack>
        {!data && isLoading && (
          <>
            <Skeleton width={"100%"} height="25px" />
            <Skeleton width={"100%"} height="25px" />
            <Skeleton width={"100%"} height="25px" />
            <Skeleton width={"100%"} height="25px" />
          </>
        )}
        {data?.data?.map((category) => {
          return (
            <div key={category.id}>
              <Accordion
                elevation={0}
                // expanded={
                //   category.category?.findIndex(
                //     (x) => `${x.id}` == productId
                //   ) !== -1
                //     ? true
                //     : undefined
                // }
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <MenuList>
                    {/* {category.category?.map((product) => (
                      <MenuItem
                        key={product.id}
                        onClick={() => setProductId(`${product.id}`)}
                      >
                        <Typography
                          {...(productId == `${product.id}`
                            ? { color: "primary.main", fontWeight: 700 }
                            : undefined)}
                        >
                          {product.name}
                        </Typography>
                      </MenuItem>
                    ))} */}
                  </MenuList>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>

      <RoundedButton fullWidth size="large">
        Get Assistance
      </RoundedButton>
    </Stack>
  );
}

export default SelectType;
