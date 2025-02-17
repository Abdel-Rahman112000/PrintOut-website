"use client";
import { ThemeMode } from "./ThemeMode.enum";

export const getLocalStorageMode = (): ThemeMode | null => {
  let localStorageModeString = localStorage.getItem("theme");

  switch (localStorageModeString) {
    case ThemeMode.DARK:
      return ThemeMode.DARK;

    case ThemeMode.LIGHT:
      return ThemeMode.LIGHT;
    default:
      return null;
  }
};
