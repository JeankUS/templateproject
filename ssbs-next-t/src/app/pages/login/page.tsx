"use client";  // Indica que este es un Client Component

import { Box, Button, Container, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { AuthContext } from "../../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const authContext = useContext(AuthContext);
    const router = useRouter();

    const validateInputs = (): boolean => {
        if (!emailRegex.test(email)) {
            setError('El correo electrónico no es válido.');
            setOpen(true);
            return false;
        }
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            setOpen(true);
            return false;
        }
        return true;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        if (authContext?.login) {
            try {
                await authContext.login(email, password);
                console.log(authContext.require_change_password)
                if (authContext.require_change_password) {
                    router.push('/pages/resetpassword');
                } else {
                    router.push('/'); // O cualquier otra ruta a la que quieras redirigir después del login
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message || 'Error al iniciar sesión');
                } else {
                    setError('Error al iniciar sesión');
                }
                setOpen(true);
            }
        } else {
            setError('Error: No se pudo acceder al contexto de autenticación');
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                marginTop: "-80px",
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container component="main" maxWidth="xs" sx={{ padding: 4, borderRadius: 2, bgcolor: '#bbb1a0a1' }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" color={'gold'}>
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
                        <a style={{ textDecoration: 'none', color: '#F2EADF', fontStyle: 'italic' }} href="/pages/forgotpassword">¿Has olvidado tu contraseña?</a>
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Posiciona el Snackbar en la parte inferior derecha
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}