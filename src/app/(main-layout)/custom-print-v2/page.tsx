import CustomPrintEntryPoint from "./components/entrypoint";
import { CustomPrintContextProvider } from "./context";

export default function CustomPrintPageV2() {
  return (
    <CustomPrintContextProvider>
      <CustomPrintEntryPoint />
    </CustomPrintContextProvider>
  );
}
