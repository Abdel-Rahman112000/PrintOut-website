"use client";
// React MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

// Icons
import TuneIcon from "@mui/icons-material/Tune";
import { ExpandMore } from "@mui/icons-material";
import QuantityBox from "./QuantityBox";
import RoundedButton from "@/components/RoundedButton";
import { useContext } from "react";
import { CustomPrintContext } from "../../context";
import axios from "axios";
import { api } from "@/constants/api";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoadingRendered = () => (
  <>
    <Skeleton width={"100%"} height="29px" />
    <Skeleton width={"100%"} height="29px" />
    <Skeleton width={"100%"} height="29px" />
    <Skeleton width={"100%"} height="29px" />
    <Skeleton width={"100%"} height="29px" />
    <Skeleton width={"100%"} height="29px" />
    <Skeleton width={"100%"} height="99px" />
    <Skeleton width={"100%"} height="55px" sx={{ borderRadius: "15px" }} />
  </>
);

export default function PrintTypeFilters() {
  // ** declare and define component state and variables
  const router = useRouter();
  const {
    note,
    quantity,
    selectedPage,
    printFiltersLoading,
    printFiltersData,
    selectedPrintTypeId,
    generalDocSetting,
    PrintProduct,
    orderData,
    handleSetProcessIsLoading,
    pagesCustomizations,
    handleSetSelectedPrintTypeId,
  } = useContext(CustomPrintContext);

  // Start send request
  async function handleSendRequest() {
    // prepare body
    handleSetProcessIsLoading(true);
    let body = {
      note,
      order_details: [
        {
          product_id: PrintProduct?.id,
          qty: quantity,
          file: orderData?.media
            ?.map((ele, idx) => idx + 1)
            ?.filter(
              (ele) =>
                !pagesCustomizations?.find((page) => page.pageIndex == ele)
            ),
          height: generalDocSetting?.height ?? selectedPage?.size?.height,
          width: generalDocSetting?.width ?? selectedPage?.size?.width,
          bleed: generalDocSetting?.bleed ?? selectedPage?.size?.bleed,
          color: generalDocSetting?.color ?? "Colored",
          scaling: !generalDocSetting?.scale
            ? "verticale"
            : generalDocSetting?.scale == "Vertical"
            ? "verticale"
            : "horizentale",
          CustomizationChoices: generalDocSetting?.customizationChoices ?? [],
        },
        ...pagesCustomizations?.map((pageStyle) => {
          return {
            product_id: PrintProduct?.id,
            qty: quantity,
            file: [pageStyle.pageIndex],
            height: pageStyle?.height ?? selectedPage?.size?.height,
            width: pageStyle?.width ?? selectedPage?.size?.width,
            bleed: pageStyle?.bleed ?? selectedPage?.size?.bleed,
            color: pageStyle?.color ?? "Colored",
            scaling: !pageStyle?.scale
              ? "verticale"
              : pageStyle?.scale == "Vertical"
              ? "verticale"
              : "horizentale",
            CustomizationChoices: pageStyle?.customizationChoices ?? [],
          };
        }),
      ],
    };
    let headers = await getClientAuthHeaders();
    // send request
    axios
      .post(api`client/cart/${orderData?.id}`, body, { headers })
      .then((response) => {
        toast.success("print custemization done successfully");
        router.push(`/`);
        // router.push(
        //   `custom-print-confirm-address?orderId=${orderData?.id}&productId=${PrintProduct?.id}`
        // );
      })
      .catch((err) => {
        toast.error("Unexpected Error :(");
      })
      .finally(() => {
        handleSetProcessIsLoading(false);
      });
  }

  // ** return compoent ui
  return (
    <Box
      sx={{
        width: "295px",
        height: "470.38px",
        borderRadius: "0px 0px 2px 2px",
        border: "0px 1px 1px 1px",
        opacity: "0.8px",
      }}
    >
      {/* title */}
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Typography variant="body2" fontSize={22} fontWeight={600}>
          Print Type
        </Typography>
        <IconButton>
          <TuneIcon />
        </IconButton>
      </Stack>
      {printFiltersLoading ? (
        <LoadingRendered />
      ) : (
        <div>
          {printFiltersData?.map((category) => (
            <div key={category.id}>
              <Accordion
                elevation={0}
                // expanded={
                //   category.category?.findIndex(
                //     (x) => x.id == selectedPrintTypeId
                //   ) !== -1
                //     ? true
                //     : undefined
                // }
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={900} fontSize={16}>
                    {category.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <MenuList>
                    {/* {category.category?.map((product) => (
                      <MenuItem
                        key={product.id}
                        onClick={() => handleSetSelectedPrintTypeId(product.id)}
                      >
                        <Typography
                          {...(selectedPrintTypeId == product.id
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
          ))}
          {/* QuantityBox */}
          <QuantityBox />
          {/* Get Assistance */}
          <RoundedButton
            fullWidth
            size="large"
            disabled={!Boolean(PrintProduct)}
            onClick={() => {
              handleSendRequest();
            }}
          >
            Submit
          </RoundedButton>
        </div>
      )}
    </Box>
  );
}
