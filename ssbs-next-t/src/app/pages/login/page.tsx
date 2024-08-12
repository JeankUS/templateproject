"use client";  // Esta línea indica que este componente es un Client Component

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { AuthContext } from "../../context/AuthContext"; // Importa el contexto de autenticación

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (authContext?.login) {
            try {
                await authContext.login(email, password);
                router.push('/'); // O cualquier otra ruta a la que quieras redirigir después del login
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message || 'Error al iniciar sesión');
                } else {
                    setError('Error al iniciar sesión');
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
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Inicio de sesión
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 1 }}
                        >
                            Iniciar
                        </Button>
                        <Button
                            component={NextLink} href="/pages/register"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                        >
                            Registrarse
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
