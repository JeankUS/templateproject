// src/app/components/ClientLayout.tsx

"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";

declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      gold: string;
      white: string;
    };
  }

  interface PaletteOptions {
    customColors?: {
      gold?: string;
      white: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f1214", // Header // btns
      dark: "#2c2925",
      contrastText: "#F2EADF", // Texto color crema claro
    },
    secondary: {
      main: "#fff", // no se está usando de
      light: "#fff", // Letra de titulos
      contrastText: "#F2EADF", // Texto color crema claro
    },
    background: {
      paper: "#292622", // Cards
    },
    text: {
      primary: "#0f1214",
      secondary: "#0f1214", // Texto secundario
    },
    customColors: {
      gold: "#f2d263", // Color dorado
      white: "#F2EADF",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 14
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main className="mainFixed">{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
