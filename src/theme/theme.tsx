"use client";
import {
  PaletteColor,
  PaletteColorOptions,
  Shadows,
  SimplePaletteColorOptions,
  ThemeProvider,
  createTheme,
  TypeBackground,
  responsiveFontSizes,
} from "@mui/material/styles";
import { LightPalette } from "./light.palette";
import { DarkPalette } from "./dark.palette";
import { useEffect, useMemo, useState } from "react";
import { ThemeMode } from "./ThemeMode.enum";
import {
  CustomThemeContext,
  CustomThemeContextType,
} from "./CustomThemeContext";
import { getLocalStorageMode } from "./localStorageMode";
import { getSystemMode } from "./systemMode";

// Extend the TypeBackground and PaletteColorOptions interfaces
declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    lightest?: string;
  }

  interface TypeBackground {
    medTransparent?: string;
    darkest: string;
  }
}

// Create the MUI theme

export default function CustomThemeProvider({
  children,
}: CustomThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(ThemeMode.DARK);
  const setMode = (mode: ThemeMode) => {
    localStorage.setItem("theme", mode);
    setModeState(mode);
  };
  const toggleMode: CustomThemeContextType["toggleMode"] = (theme) => {
    if (theme) setMode(theme);
    else setMode(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  useEffect(() => {
    let defaultTheme: ThemeMode;
    const localStorageMode = getLocalStorageMode();
    const systemMode = getSystemMode();
    if (localStorageMode) {
      defaultTheme = localStorageMode;
    } else {
      defaultTheme = systemMode;
    }
    setModeState(defaultTheme);
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      palette: mode === ThemeMode.DARK ? LightPalette : LightPalette,
      shape: {
        borderRadius: 10,
      },
      shadows: [
        ...createTheme({}).shadows.map((shadow, i) =>
          i !== 0
            ? `0 4px ${4 + 4 * (i - 1)}px 0 rgba(75, 75, 75, ${
                0.05 + 0.03 * i
              })`
            : shadow
        ),
      ] as unknown as Shadows,
      typography: {
        fontFamily:
          "Almarai, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true, variant: "contained" },
          styleOverrides: {
            root: {
              fontWeight: 700,
              textTransform: "none",
            },
          },
        },
        MuiLink: {
          defaultProps: { fontFamily: "Almarai" },
        },

        // Must be removed
        MuiTypography: {
          defaultProps: {
            color: "text.primary",
          },
        },
        MuiTable: {
          styleOverrides: {
            root: {
              tableLayout: "fixed",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              verticalAlign: "top",
              border: "none",
            },
          },
        },
      },
    });
  }, [mode]);

  const withResponsiveFontSizes = responsiveFontSizes(theme);

  return (
    <CustomThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={withResponsiveFontSizes}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}
type CustomThemeProviderProps = {
  children: React.ReactNode;
};
