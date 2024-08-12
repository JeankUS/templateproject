// src/app/components/ClientLayout.tsx

"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8C7C69", // Marrón grisáceo
      contrastText: "#F2EADF", // Texto color crema claro
    },
    secondary: {
      main: "#59453E", // Marrón oscuro
      contrastText: "#F2EADF", // Texto color crema claro
    },
    background: {
      paper: "#BFAEA8", // Fondo para elementos elevados como tarjetas, si se necesita
    },
    text: {
      primary: "#0A0A0D", // Texto negro muy oscuro
      secondary: "#8C7C69", // Texto marrón grisáceo
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
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
      <main style={{ marginTop: '64px' }}>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
