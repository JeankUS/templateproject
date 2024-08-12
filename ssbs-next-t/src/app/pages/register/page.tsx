"use client";  // Indica que este es un Client Component

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext"; // Importa el contexto de autenticación y el tipo

export default function RegisterPage() {
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const authContext = useContext(AuthContext); // Asegúrate de tipar el contexto correctamente
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (authContext?.register) {
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
            try {
                await authContext.register(fullname, email, mobile,password); // Llama a la función de registro del servicio
                router.push('/pages/login'); // Redirige al inicio de sesión después del registro
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error al registrarse');
                }
            }
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
                        Registrarse
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleRegister}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullname"
                            label="Nombre completo"
                            name="fullname"
                            autoFocus
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Teléfono"
                            name="mobile"
                            autoComplete="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarse
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
