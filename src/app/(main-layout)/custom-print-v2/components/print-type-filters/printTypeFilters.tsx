'use client';
// React MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

// Icons
import TuneIcon from '@mui/icons-material/Tune';
import QuantityBox from './QuantityBox';
import RoundedButton from '@/components/RoundedButton';
import { useContext, useEffect, useState } from 'react';
import { CustomPrintContext } from '../../context';
import axios from 'axios';
import { api } from '@/constants/api';
import { getClientAuthHeaders } from '@/libs/auth/getClientAuthHeaders';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import SideBar from '@/components/SideBar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const LoadingRendered = () => (
  <>
    <Skeleton width={'100%'} height="29px" />
    <Skeleton width={'100%'} height="29px" />
    <Skeleton width={'100%'} height="29px" />
    <Skeleton width={'100%'} height="29px" />
    <Skeleton width={'100%'} height="29px" />
    <Skeleton width={'100%'} height="29px" />
    <Skeleton width={'100%'} height="99px" />
    <Skeleton width={'100%'} height="55px" sx={{ borderRadius: '15px' }} />
  </>
);

export default function PrintTypeFilters() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);

  const {
    note,
    quantity,
    selectedPage,
    printFiltersLoading,
    generalDocSetting,
    PrintProduct,
    orderData,
    handleSetProcessIsLoading,
    pagesCustomizations,
    handleSetSelectedPrintTypeId,
    selectedPrintTypeId,
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
      .post(api`client/cart/${orderData?.id}`, body, { headers })
      .then((response) => {
        toast.success('print custemization done successfully');
        router.push(`/`);
        // router.push(
        //   `custom-print-confirm-address?orderId=${orderData?.id}&productId=${PrintProduct?.id}`
        // );
      })
      .catch((err) => {
        toast.error('Unexpected Error :(');
      })
      .finally(() => {
        handleSetProcessIsLoading(false);
      });
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(api`client/categories`, {
          params: { type_id: 3 },
        });
        setCategories(response?.data?.data); // adjust if your response has a nested structure
      } catch (err: any) {
        toast.error(err.message || 'Something went wrong');
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <SideBar>
        {/* title */}
        <Stack
          p={'1.2rem'}
          width={'100%'}
          spacing={2}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottom={'2px solid #fff'}
        >
          <Typography
            color={'#fff'}
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
          <div style={{ width: '100%' }}>
            <div>
              <Accordion
                sx={{
                  width: '95%',
                  color: '#fff',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  my: 2,
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon sx={{ color: '#fff' }} />}
                >
                  <Typography fontWeight={900} fontSize={16}>
                    Categories
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider />
                  <MenuList>
                    {categories?.map((category: any) => (
                      <div key={category.id}>
                        <MenuItem>
                          <Typography>{category?.name}</Typography>
                        </MenuItem>
                        {category?.products?.map((product: any) => {
                          return (
                            <MenuItem
                              key={product?.id}
                              onClick={() =>
                                handleSetSelectedPrintTypeId(product?.id)
                              }
                            >
                              <Typography
                                {...(selectedPrintTypeId == product?.id
                                  ? {
                                      color: 'white',
                                      fontWeight: 700,
                                      marginLeft: '1rem',
                                    }
                                  : {
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      width: '100%',
                                      marginLeft: '1rem',
                                    })}
                              >
                                {product?.name}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </div>
                    ))}
                  </MenuList>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        )}
      </SideBar>

      {/* QuantityBox */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <QuantityBox />
      </div>

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
    </>
  );
}
