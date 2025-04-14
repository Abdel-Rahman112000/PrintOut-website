"use client";

import { ReactNode, createContext, useMemo, useState } from "react";
import UploadFileTab from "./tabs/upload-file-tab";
import CustomPrintTab from "./tabs/custom-print-tab";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { getProduct } from "@/utils/api/product/get-product";
import { getOrder } from "@/utils/api/order/get-order";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import ConfirmOrderTab from "./tabs/confirm-order-tab";

type IdType = string | undefined | null;

type ContextType = {
  orderId: IdType;
  setOrderId: (id: IdType) => void;
  orderQuery: UseQueryResult<
    Awaited<ReturnType<typeof getOrder>> | undefined,
    Error
  >;
  productId: IdType;
  setProductId: (id: IdType) => void;
  productQuery: UseQueryResult<
    Awaited<ReturnType<typeof getProduct>> | undefined,
    Error
  >;
};

export const TabsContext = createContext<ContextType>({} as ContextType);

function CustomPrintTabs() {
  const [orderId, setOrderId] = useQueryParam(
    "orderId",
    withDefault(StringParam, "")
  );
  const [productId, setProductId] = useQueryParam(
    "productId",
    withDefault(StringParam, "")
  );

  const productQuery = useQuery({
    queryKey: ["get-product", productId],
    async queryFn() {
      if (!productId) return;
      const headers = await getClientAuthHeaders();
      const res = await getProduct(headers, productId);
      return res;
    },
  });

  const orderQuery = useQuery({
    queryKey: ["get-order", orderId],
    async queryFn() {
      if (!orderId) return;
      const headers = await getClientAuthHeaders();
      const res = await getOrder(headers, orderId);
      return res;
    },
  });

  let view: ReactNode = useMemo(() => {
    if (orderId) {
      if (!orderQuery.data?.data) return;
      else if (!orderQuery.data?.data?.order_details?.length) {
        return <CustomPrintTab />;
      } else {
        return <ConfirmOrderTab order={orderQuery.data.data} />;
      }
    } else return <UploadFileTab />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, productId, orderQuery.data?.data?.order_details?.length]);

  return (
    <TabsContext.Provider
      value={{
        orderId,
        setOrderId,
        productId,
        setProductId,
        productQuery,
        orderQuery,
      }}
    >
      {view}
    </TabsContext.Provider>
  );
}

export default CustomPrintTabs;
