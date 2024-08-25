"use client";   // Esta línea indica que este componente es un Client Component

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

export default function ForgotPasswordPage() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const handleRecoverPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (authContext?.recoverPass) {
            try {
                await authContext.recoverPass(email);
                router.push('/pages/login'); // O cualquier otra ruta a la que quieras redirigir después del login
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message)
                    setError(err.message || 'Error al enviar contraseña temporal verifique su email');
                } else {
                    setError('Error al enviar contraseña temporal');
                }
            }
        } else {
            setError('Error: No se pudo acceder al contexto de autenticación');
        }
    };


  return (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        <Container component="main" maxWidth="xs" sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)", padding: 4, borderRadius: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
            <Typography component="h1" variant="h5">
                Recuperar Contraseña
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRecoverPassword}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"  
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}
                    >
                    Enviar clave de recuperacion
                    </Button>
                </Box>
            </Box>
        </Container>
    </Box>
  );
}


