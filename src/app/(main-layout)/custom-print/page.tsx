import { Container } from "@mui/material";
import { withAuth } from "@/guards/auth.guard";
import dynamic from "next/dynamic";
const CustomPrintTabs = dynamic(() => import("./components/page-content"), {
  ssr: false,
});

function CustomPrintPage() {
  const render = typeof window !== "undefined";

  return (
    <Container>
      <div>
        <CustomPrintTabs />
      </div>
    </Container>
  );
}

export default withAuth(CustomPrintPage);
