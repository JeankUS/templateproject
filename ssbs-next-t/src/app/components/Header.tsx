"use client"; // Indica que este archivo es un componente cliente

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import NextLink from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

export default function Header() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext?.logout) {
      authContext.logout();
    }
  };

  return (
    <AppBar position="fixed" >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Santa Street Barber
        </Typography>
        <Button color="inherit" component={NextLink} href="/">
          Inicio
        </Button>
        <Button color="inherit" component={NextLink} href="/pages/about">
          Sobre
        </Button>
        {authContext?.user ? (
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        ) : (
          <Button color="inherit" component={NextLink} href="/pages/login">
            Inicio de sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
