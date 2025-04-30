import * as React from 'react';
import { AuthResponseError, AuthResponse } from "../types/types";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultHeader from "../layout/HeaderDefault";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { Typography, Paper, InputLabel, FormControl, Button, TextField, Box } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            if (response.ok) {
                console.log('Login successful');
                setErrorResponse('');
                const json = (await response.json()) as AuthResponse;

                if (json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                    goTo('/dashboard');
                }

            } else {
                console.log('Something went wrong');
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <DefaultHeader>
            <Box
                sx={{

                    width: '100%',
                    justifyContent: 'center', // Centrado horizontal
                    padding: '56px',          // Espaciado alrededor de los componentes
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0', // Optional: background color for the page
                }}
            >

                <Paper sx={{ padding: '36px', width: '100%', maxWidth: '400px', borderRadius: '8px' }} elevation={3}>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px', // Adds space between fields
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" component="div">
                    Iniciar sesion
                </Typography>
                        <TextField
                            label="Correo"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ "& .MuiInputBase-input": { padding: "15px" } }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                        </FormControl>
                        <Button variant="contained" color="success" type="submit">
                            Iniciar sesión
                        </Button>
                    </form>
                </Paper>
            </Box>
        </DefaultHeader>
    );
}