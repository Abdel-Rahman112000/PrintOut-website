"use client";
import { Container } from "@mui/material";
import Slider from "./components/slider";
import HeroCards from "./components/hero-cards";
import PrintTypesCards from "./components/print-types-cards";
import CustomPrintSection from "./components/CustomPrint-section";
import TopBrands from "./components/top-brands";
import ProductsSection from "./components/Products-section";
import TopCategoriesSection from "./components/top-categories";
import FeedbackMessages from "./components/feedback-messages";
import { useContext } from "react";
import { HomeContext } from "./context";
import useHomeData from "./context/useHomeData";
import Loader from "../products/components/products-list/Loader";

function EntryPoint() {
  const homeQuery = useHomeData();
  const { productsRegularGiveaway, readyMadeGiveaways } =
    useContext(HomeContext);

  if (homeQuery.isLoading) return <Loader />;

  return (
    <>
      <Slider />
      <Container
        sx={{
          maxWidth: {
            xs: "sm",
            sm: "md",
            md: "lg",
            xl: "xl",
          },
        }}
      >
        <HeroCards />
        <PrintTypesCards />
        <ProductsSection
          products={productsRegularGiveaway}
          title={" Customize Your Product"}
        />
        <CustomPrintSection />
        <TopCategoriesSection />
        <TopBrands />
        <ProductsSection
          products={readyMadeGiveaways}
          title={" Ready Made Giveaways"}
        />
        <FeedbackMessages />
      </Container>
    </>
  );
}

export default EntryPoint;
