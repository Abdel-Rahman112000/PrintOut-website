import type { Metadata } from "next";
import "./globals.scss";
import "plyr-react/plyr.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Provider } from "jotai";
import NotiStackProvider from "./SnackbarProvider";
import CustomThemeProvider from "@/theme/theme";
import "@/assets/fonts/include.scss";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import AppProvider from "@/components/AppProvider";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/contexts/AuthProvider";
import { Suspense } from "react";
import 'hover.css/css/hover-min.css'; 
import 'animate.css';

export const metadata: Metadata = {
  title: "Printout",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <CustomThemeProvider>
          <NotiStackProvider>
            <Provider>
              <AuthProvider>
                <body>
                  <NextTopLoader showSpinner={false} />
                  <AppProvider>{children}</AppProvider>
                </body>
              </AuthProvider>
            </Provider>
          </NotiStackProvider>
        </CustomThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
