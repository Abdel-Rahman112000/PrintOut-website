'use client';
// Hooks
import { useContext, useState } from 'react';

// MUI
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CustomPrintContext } from '../../context';
import { getClientAuthHeaders } from '@/libs/auth/getClientAuthHeaders';
import axios from 'axios';
import { api } from '@/constants/api';

export default function QuantityBox() {
  //   ** seclare and define component state and variables
  const {
    note,
    quantity,
    selectedPage,
    generalDocSetting,
    PrintProduct,
    orderData,
    handleSetProcessIsLoading,
    pagesCustomizations,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CustomPrintContext);
  const [totalPrice, setTotalPrice] = useState('?');

  // Start send request
  async function CalcTotalPrice() {
    // prepare body
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
          color: generalDocSetting?.color ?? 'Colored',
          scaling: !generalDocSetting?.scale
            ? 'verticale'
            : generalDocSetting?.scale == 'Vertical'
            ? 'verticale'
            : 'horizentale',
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
            color: pageStyle?.color ?? 'Colored',
            scaling: !pageStyle?.scale
              ? 'verticale'
              : pageStyle?.scale == 'Vertical'
              ? 'verticale'
              : 'horizentale',
            CustomizationChoices: pageStyle?.customizationChoices ?? [],
          };
        }),
      ],
    };
    let headers = await getClientAuthHeaders();
    // send request
    axios
      .post(api`client/get-total-order`, body, { headers })
      .then((response) => {
        setTotalPrice(response?.data?.total_order + '');
      })
      .catch(() => {});
  }

  return (
    <Box
      sx={{
        py: 5,
        width: '100%',
        padding: '10px',
        gap: '2.98px',
        borderRadius: '10px',
        boxShadow: '0px 8px 18px 0px #0000001A',
        color: '#fff',
      }}
    >
      {/* Stack */}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography
          variant="body1"
          fontWeight={600}
          fontSize={16}
          color={'#000'}
        >
          Quantity
        </Typography>
        {/* counter */}
        <Stack
          direction={'row-reverse'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            width: '135.42px',
            height: '47.8px',
            borderRadius: '9.37px 0px 0px 0px',
            border: '1.17px 0px 0px 0px',
            bgcolor: '#F7F8F9',
          }}
        >
          <IconButton
            onClick={() => {
              increaseQuantity();
            }}
          >
            <AddIcon />
          </IconButton>
          {/* count */}
          <Typography
            variant="body1"
            fontSize={18}
            fontWeight={600}
            color={'primary'}
          >
            {quantity}
          </Typography>
          <IconButton
            onClick={() => {
              decreaseQuantity();
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Stack>
      </Stack>
      {/* calc price */}
      <Stack
        my={3}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Button
          variant="outlined"
          onClick={CalcTotalPrice}
          disabled={!Boolean(PrintProduct)}
        >
          Calc total Price
        </Button>
        {/* counter */}
        <Typography
          variant="body2"
          fontSize={30}
          fontWeight={700}
          color={'#000'}
        >
          $ {totalPrice}
        </Typography>
      </Stack>
    </Box>
  );
}
