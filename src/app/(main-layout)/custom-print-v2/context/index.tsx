"use client";

import { getClientAuthHeaders } from "@/libs/auth/getClientAuthHeaders";
import { Types } from "@/types/common/Category";
import { Order } from "@/types/common/Order";
import { CustomizeOptionType, PaperType } from "@/types/common/Order/Paper";
import { $ProductType, Product } from "@/types/common/Product";
import { getCategories } from "@/utils/api/category/get-categories";
import { getOrder } from "@/utils/api/order/get-order";
import { getPapers } from "@/utils/api/paper/get-papers";
import { getProduct } from "@/utils/api/product/get-product";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useState } from "react";

export const CustomPrintContext = createContext<CustomPrintContextType>({
  note: "",
  papers: undefined,
  orderLoading: false,
  orderData: undefined,
  selectedPage: undefined,
  selectedPrintTypeId: -1,
  PrintProduct: undefined,
  PrintProductLoading: false,
  printFiltersLoading: false,
  printFiltersData: undefined,
  generalDocSetting: {
    color: undefined,
    scale: undefined,
    mode: undefined,
  },
  quantity: 1,
  processIsLoading: false,
  pagesCustomizations: [],
  zoomLevel: 1,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  handleStoreNote: (str: string) => {},
  handleSetSelectedPrintTypeId: (id: number) => {},
  handleRemoveFromSpecificPageStyle: (idx: number) => {},
  handleSetProcessIsLoading: (val: boolean) => {},
  handleSetSpecificPageStyle: (style: SpecificPageStyle) => {},
  handleStoreSelectedPage: (page: PaperType | undefined) => {},
  handleChangeGlobelFileStyle: (style: GeneralStyleType) => {},
  handleSetZoomLevel: (value: number) => {},
  customTextValue: "",
  setCustomTextValue: () => {},
});

export const CustomPrintContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // TODO::declare and define component state and variables
  const [note, setNote] = useState("");
  const [processIsLoading, setProcessIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const orderId = searchParams?.get("orderId");
  const [selectedPrintTypeId, setSelectedPrintTypeId] = useState(-1);
  const [generalDocSetting, setGeneralDocSetting] = useState<GeneralStyleType>({
    color: undefined,
    scale: undefined,
    mode: undefined,
  });
  const [customTextValue, setCustomTextValue] = useState("");

  const [pagesCustomizations, setPagesCustomizations] = useState<
    SpecificPageStyle[]
  >([]);
  const [selectedPage, setSelectedPage] = useState<PaperType | undefined>(
    undefined
  );
  const { data: printFiltersData, isLoading: printFiltersLoading } = useQuery({
    queryKey: ["get-categories"],
    async queryFn() {
      const headers = await getClientAuthHeaders();
      const res = getCategories(headers, {
        type_id: $ProductType.CUSTOM_PRINT.toString(),
      });
      return (await res).data;
    },
  });
  // fetch order data according order id
  const { data: orderData, isLoading: orderLoading } = useQuery({
    queryKey: ["get-order", orderId],
    async queryFn() {
      if (!orderId) return;
      const headers = await getClientAuthHeaders();
      const res = await getOrder(headers, orderId);
      return res.data;
    },
  });

  // fetch product data according selected print type
  const { data: PrintProduct, isLoading: PrintProductLoading } = useQuery({
    queryKey: ["get-product", selectedPrintTypeId],
    async queryFn() {
      if (!selectedPrintTypeId) return;
      const headers = await getClientAuthHeaders();
      const res = await getProduct(headers, selectedPrintTypeId);
      return res.data;
    },
  });
  // fetch pages data
  const { data: papers } = useQuery({
    queryKey: ["paper-types"],
    async queryFn() {
      const headers = await getClientAuthHeaders();
      const papers = await getPapers(headers);
      return papers.data;
    },
  });

  const [zoomLevel, setZoomLevel] = useState<number>(1); // New state for zooming

  function handleSetZoomLevel(value: number) {
    setZoomLevel(value);
  }

  // TODO::declare and define helper methods
  function handleStoreNote(str: string) {
    setNote(str);
  }
  function handleSetSelectedPrintTypeId(id: number) {
    setSelectedPrintTypeId(id);
  }

  function handleStoreSelectedPage(page: PaperType | undefined) {
    setSelectedPage(page);
  }

  function handleChangeGlobelFileStyle(style: GeneralStyleType) {
    setGeneralDocSetting(style);
  }

  function handleSetSpecificPageStyle(style: SpecificPageStyle) {
    let index = style?.pageIndex;
    if (index) {
      if (pagesCustomizations?.find((ele) => ele.pageIndex == index))
        setPagesCustomizations((prev) =>
          prev.map((ele) => {
            if (ele.pageIndex == index) return style;
            return ele;
          })
        );
      else setPagesCustomizations((prev) => [...prev, style]);
    }
  }

  function handleRemoveFromSpecificPageStyle(idx: number) {
    setPagesCustomizations((prev) =>
      prev.filter((ele) => ele.pageIndex != idx)
    );
  }

  function increaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    setQuantity((prev) => (prev == 0 ? 0 : prev - 1));
  }

  function handleSetProcessIsLoading(val: boolean) {
    setProcessIsLoading(val);
  }

  // ** return component ui
  return (
    <CustomPrintContext.Provider
      value={{
        note,
        papers,
        quantity,
        orderData,
        orderLoading,
        PrintProduct,
        selectedPage,
        pagesCustomizations,
        printFiltersData,
        generalDocSetting,
        PrintProductLoading,
        printFiltersLoading,
        selectedPrintTypeId,
        increaseQuantity,
        decreaseQuantity,
        handleStoreNote,
        processIsLoading,
        handleSetProcessIsLoading,
        handleRemoveFromSpecificPageStyle,
        handleSetSpecificPageStyle,
        handleStoreSelectedPage,
        handleSetSelectedPrintTypeId,
        handleChangeGlobelFileStyle,
        zoomLevel,
        handleSetZoomLevel,
        customTextValue,
        setCustomTextValue,
      }}
    >
      {children}
    </CustomPrintContext.Provider>
  );
};

type PapersResType =
  | {
      color: CustomizeOptionType[];
      scaling: CustomizeOptionType[];
      size: PaperType[];
    }
  | undefined;

type GeneralStyleType = {
  color: "Colored" | "BlackAndWhite" | undefined;
  scale: "Vertical" | "Horizental" | undefined;
  mode: "Portrait" | "Landscape" | undefined;
  height?: number;
  width?: number;
  bleed?: number;
  customizationChoices?: number[];
};

export type SpecificPageStyle = GeneralStyleType & {
  pageIndex: number | undefined;
  customizationChoices?: number[];
};

type CustomPrintContextType = {
  note: string;
  PrintProductLoading: boolean;
  printFiltersLoading: boolean;
  printFiltersData: Types[] | undefined;
  selectedPrintTypeId: number;
  PrintProduct: Product | undefined;
  papers: PapersResType;
  selectedPage: PaperType | undefined;
  orderData: Order | undefined;
  orderLoading: boolean;
  quantity: number;
  decreaseQuantity(): void;
  increaseQuantity(): void;
  processIsLoading: boolean;
  handleStoreNote(str: string): void;
  handleSetProcessIsLoading(val: boolean): void;
  pagesCustomizations: SpecificPageStyle[];
  generalDocSetting: GeneralStyleType | undefined;
  handleSetSelectedPrintTypeId(id: number): void;
  handleRemoveFromSpecificPageStyle(idx: number): void;
  handleSetSpecificPageStyle(style: SpecificPageStyle): void;
  handleStoreSelectedPage(page: PaperType | undefined): void;
  handleChangeGlobelFileStyle(style: GeneralStyleType): void;
  zoomLevel: number;
  handleSetZoomLevel(value: number): void;
  customTextValue: string;
  setCustomTextValue: (val: string) => void;
};
