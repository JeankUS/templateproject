"use client";  // Indica que este es un Client Component

import { Box, Button, Container, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function RegisterPage() {
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const authContext = useContext(AuthContext);
    const router = useRouter();

    const validateInputs = (): boolean => {
        if (fullname.length < 10 || fullname.length > 60) {
            setError('El nombre completo debe tener entre 10 y 60 caracteres.');
            return false;
        }
        if (!emailRegex.test(email)) {
            setError('El correo electrónico no es válido.');
            return false;
        }
        if (mobile.length !== 8 || isNaN(Number(mobile))) {
            setError('El número de teléfono debe tener 8 dígitos.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return false;
        }
        return true;
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Elimina cualquier carácter que no sea número
        if (value.length <= 8) {
            setMobile(value);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) {
            setOpen(true);
            return;
        }

        if (authContext?.register) {
            try {
                await authContext.register(fullname, email, mobile, password);
                router.push('/pages/login');
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error al registrarse');
                }
                setOpen(true);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container component="main" maxWidth="xs" sx={{padding: 4, borderRadius: 2 , bgcolor:"#bbb1a0a1"}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" color={"gold"}>
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
                            inputProps={{ minLength: 10, maxLength: 60 }}
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
                            type="text" // Cambia el tipo de input a text
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Teléfono"
                            name="mobile"
                            autoComplete="mobile"
                            value={mobile}
                            onChange={handleMobileChange}
                            inputProps={{ maxLength: 8, inputMode: 'numeric' }}
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
                            inputProps={{ minLength: 8 }}
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
                            inputProps={{ minLength: 8 }}
                        />
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
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Posiciona el Snackbar en la parte inferior derecha
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}
