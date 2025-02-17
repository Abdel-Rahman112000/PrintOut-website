import { Stack } from "@mui/material";
import HeroCards from "./components/hero-cards";
import Slider from "./components/slider";
import PrintTypesCards from "./components/print-types-cards";
import { HomeContextProvider } from "./context";
import ProductsSection from "./components/products-section";
import TopCategoriesSection from "./components/top-categories";
import TopBrands from "./components/top-brands";
import FeedbackMessages from "./components/feedback-messages";

function HomePage() {
  return (
    <HomeContextProvider>
      <Slider />
      <Stack spacing={16} mt={16} alignItems="center">
        <HeroCards />
        <PrintTypesCards />
      </Stack>
      <ProductsSection />
      <TopCategoriesSection />
      <TopBrands />
      <FeedbackMessages />
    </HomeContextProvider>
  );
}

export default HomePage;
