import { Container } from "@mui/material";
import HeroCards from "./components/hero-cards";
import Slider from "./components/slider";
import PrintTypesCards from "./components/print-types-cards";
import { HomeContextProvider } from "./context";
import TopCategoriesSection from "./components/top-categories";
import TopBrands from "./components/top-brands";
import FeedbackMessages from "./components/feedback-messages";
import CustomPrintSection from "./components/CustomPrint-section";
import GiveawaysProduct from "./components/Giveaways-section";

function HomePage() {
  return (
    <HomeContextProvider>
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
        <GiveawaysProduct />
        <CustomPrintSection />
        <TopCategoriesSection />
        <TopBrands />
        <FeedbackMessages />
      </Container>
    </HomeContextProvider>
  );
}

export default HomePage;
