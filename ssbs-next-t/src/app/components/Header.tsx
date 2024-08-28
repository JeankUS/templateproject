"use client"; // Indica que este archivo es un componente cliente

import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box } from "@mui/material";
import NextLink from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const authContext = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    if (authContext?.logout) {
      authContext.logout();
    }
  };

  return (
    <AppBar position="fixed" className={"logoFixed"}>
      <Box sx={{ width: '80%', margin: '0 auto' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NextLink href="/" passHref>
              <img src="/logoPng.png" alt="Santa Street Barber" className={"logoFixed"} style={{ borderRadius: '15%', cursor: 'pointer' }} />
            </NextLink>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, margin: '0 auto' }}>
            <Button
              color="inherit"
              component={NextLink}
              href="/"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              <HomeIcon />
              Inicio
            </Button>
            <Button
              color="inherit"
              component={NextLink}
              href="/pages/store"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              <StoreIcon />
              Tienda
            </Button>
            <Button
              color="inherit"
              component={NextLink}
              href="/pages/about"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              <InfoIcon />
              ¿Quiénes somos?
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenu}
              sx={{ color: 'text.secondary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchorEl}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
            >
              <MenuItem component={NextLink} href="/" onClick={handleClose}>
                <HomeIcon />
                Inicio
              </MenuItem>
              <MenuItem component={NextLink} href="/pages/store" onClick={handleClose}>
                <StoreIcon />
                Tienda
              </MenuItem>
              <MenuItem component={NextLink} href="/pages/about" onClick={handleClose}>
                <InfoIcon />
                ¿Quiénes somos?
              </MenuItem>
              {authContext?.user ? (
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  Cerrar sesión
                </MenuItem>
              ) : (
                <MenuItem component={NextLink} href="/pages/login" onClick={handleClose}>
                  <LoginIcon />
                  Inicio de sesión
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* User Menu: Always visible if user is logged in */}
          {authContext?.user && (
            <Box sx={{ display: 'flex' }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="cuenta de usuario"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: '#FFFFFF' }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout} sx={{ color: '#fff', fontWeight: 'bold' }}><LogoutIcon />Cerrar sesión</MenuItem>
              </Menu>
            </Box>
          )}

          {/* Login Button: Visible if no user is logged in */}
          {!authContext?.user && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                color="inherit"
                component={NextLink}
                href="/pages/login"
                sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'uppercase' }}
              >
                <LoginIcon />
                Inicio de sesión
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
}
