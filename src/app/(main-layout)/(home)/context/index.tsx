"use client";

import { createContext, ReactNode } from "react";
import useHomeData, { CoverType, PrintType } from "./useHomeData";
import { Product } from "@/types/common/Product";
import { Category } from "@/types/common/Category";

export const HomeContext = createContext<HomeContextType>({
  covers: undefined,
  printTypes: undefined,
  brands: undefined,
  productsRegularGiveaway: [],
  categoriesRegularGiveaway: [],
} as HomeContextType);

export const HomeContextProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props;

  // fetch data required for home screen
  const homeQuery = useHomeData();

  // ** return component ui
  return (
    <HomeContext.Provider
      value={{
        covers: homeQuery.data?.covers,
        brands: homeQuery.data?.brands,
        printTypes: homeQuery.data?.types,
        productsRegularGiveaway: homeQuery.data?.productsRegularGiveaway,
        categoriesRegularGiveaway: homeQuery.data?.categoriesRegularGiveaway,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

type PropsType = {
  children: ReactNode;
};

type HomeContextType = {
  covers: CoverType[] | undefined;
  brands: CoverType[] | undefined;
  printTypes: PrintType[] | undefined;
  productsRegularGiveaway: Product[] | undefined;
  categoriesRegularGiveaway: Category[] | undefined;
};
