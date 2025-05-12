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
import SideBar from "@/components/SideBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
    <SideBar>
      {/* title */}
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
          Print Type
        </Typography>
        <TuneIcon />
      </Stack>
      {printFiltersLoading ? (
        <LoadingRendered />
      ) : (
        <div>
          {printFiltersData?.map((category) => (
            <div key={category.id}>
              <Accordion
                // expanded={expand1}
                sx={{
                  width: "95%",
                  color: "#fff",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  my: 2,
                }} // expanded={
                //   category.category?.findIndex(
                //     (x) => x.id == selectedPrintTypeId
                //   ) !== -1
                //     ? true
                //     : undefined
                // }
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon sx={{ color: "#fff" }} />}
                >
                  <Typography fontWeight={900} fontSize={16}>
                    Cards
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
    </SideBar>
  );
}
