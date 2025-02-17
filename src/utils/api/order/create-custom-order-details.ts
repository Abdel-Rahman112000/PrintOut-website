import axios from "axios";
import { Order } from "@/types/common/Order";
import { AuthHeaders } from "@/types/AuthHeaders";
import { api } from "@/constants/api";

export interface CreateCustomOrderDetailsDto {
  note?: string;
  order_details: OrderDetailDto[];
}

export interface OrderDetailDto {
  product_id: number | string;
  qty: number | string;
  file: (number | string)[];
  height?: number | string;
  width?: number | string;
  bleed?: number | string;
  CustomizationChoices: number[];
}

export const getOrderTotalPrice = async (
  headers: AuthHeaders,
  dto: CreateCustomOrderDetailsDto
) => {
  return (
    await axios.post<{ total_order: number }>(
      api`client/get-total-order`,
      dto,
      {
        headers,
      }
    )
  ).data;
};

export const createCustomOrderDetails = async (
  headers: AuthHeaders,
  orderId: number | string,
  dto: CreateCustomOrderDetailsDto
) => {
  return (
    await axios.post<any>(api`client/cart/${orderId}`, dto, {
      headers,
    })
  ).data;
};
