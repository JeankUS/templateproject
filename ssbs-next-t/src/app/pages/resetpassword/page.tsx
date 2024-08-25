"use client";   // Esta línea indica que este componente es un Client Component

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";


export default function ResetPasswordPage() {

    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (authContext?.resetPass) {
            if (newPassword !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
            try {
                await authContext.resetPass(newPassword);
                router.push('/'); 
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error al cambiar contraseña');
                }
            }
        }
    }
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
                Cambio de contraseña
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleResetPassword} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="newPassword"
                        label="Nueva Contraseña"
                        name="newPassword"
                        autoComplete="newPassword"
                        autoFocus
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirmar contraseña"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        autoFocus
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"  
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 1 }}
                    >
                    Cambiar contraseña
                    </Button>
                </Box>
            </Box>
        </Container>
    </Box>
    );
  }
  