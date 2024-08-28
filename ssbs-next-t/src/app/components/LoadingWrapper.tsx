// src/app/components/LoadingWrapper.tsx

"use client";

import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { CircularProgress, Box } from '@mui/material';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) {
    // Muestra un spinner de carga mientras loading es true
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>; // Renderiza el contenido una vez que loading es false
}
