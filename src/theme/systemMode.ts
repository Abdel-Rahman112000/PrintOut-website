import { ThemeMode } from "./ThemeMode.enum";

export function getSystemMode(): ThemeMode {
  let systemMode: ThemeMode = ThemeMode.LIGHT;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    systemMode = ThemeMode.DARK;
  }
  return systemMode;
}
