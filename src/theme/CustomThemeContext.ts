import { createContext } from "react";
import { ThemeMode } from "./ThemeMode.enum";

export const CustomThemeContext = createContext<CustomThemeContextType>({
  mode: ThemeMode.LIGHT,
  toggleMode(mode) {},
});
export type CustomThemeContextType = {
  mode: ThemeMode;
  toggleMode: (mode?: ThemeMode) => void;
};
