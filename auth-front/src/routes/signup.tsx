import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";
import ReCAPTCHA from "react-google-recaptcha";
import DefaultHeader from "../layout/HeaderDefault";

import "@fontsource/roboto/400.css";
import {
    Select as MuiSelect, MenuItem, InputLabel, FormControl, Card, CardContent
    , Button, TextField, Box, Autocomplete, Typography
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import countries from "world-countries";

const theme = createTheme({
    palette: {
        mode: "dark", // Cambia a "light" para un tema claro
        primary: {
            main: "#1976d2", // Color principal
        },
        secondary: {
            main: "#dc004e", // Color secundario
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif", // Cambia la tipografía
    },
});

export default function Signup() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState<string>("");
    const [password, setPassword] = useState('');


    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    email,
                    birthDate,
                    country,
                    gender,
                    password,
                })
            })
            if (response.ok) {
                console.log('User created');
                setErrorResponse('');

                goTo('/');
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

    // Definir la estructura del país
    interface CountryOption {
        value: string;
        label: string;
    }

    // Formatear los países para el select
    const formattedCountries: CountryOption[] = countries.map((country) => ({
        value: country.cca2, // Código del país (ej. "US", "MX")
        label: country.name.common, // Nombre del país (ej. "United States", "México")
    }));

    const onChangeCaptcha = () => {
        console.log("Captcha value:");
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/index" />;
    }

    return (
        <>
        <DefaultHeader>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* Aplica estilos globales según el tema */}
                <Card variant="outlined">
                    <CardContent>
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column", // Para que los elementos estén en columna
                                alignItems: "center", // Centra horizontalmente
                                justifyContent: "center", // Centra verticalmente (si el padre tiene altura suficiente)
                                '& > :not(style)': { m: 1, width: '35ch' }
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit} // Asegúrate de agregar este prop
                        >
                            <Typography variant="h5" component="div">
                                Registrarse
                            </Typography>
                            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

                            <Box sx={{ display: "flex", gap: 2 }}> {/* Establece display: flex y un espacio entre los campos */}
                                <TextField
                                    id="outlined-basic"
                                    label="Nombres"
                                    variant="outlined"
                                    sx={{ "& .MuiInputBase-input": { padding: "20px" } }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth // Esto asegura que los campos ocupen el mismo tamaño
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Apellidos"
                                    variant="outlined"
                                    sx={{ "& .MuiInputBase-input": { padding: "19px" } }}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    fullWidth // Esto asegura que los campos ocupen el mismo tamaño
                                />
                            </Box>
                            <TextField
                                id="outlined-basic"
                                label="Correo eletronico"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ "& .MuiInputBase-input": { padding: "19px" } }}
                            />
                            
                            <Autocomplete
                                disablePortal
                                options={formattedCountries}
                                value={formattedCountries.find((c) => c.value === country) || null} // Asegúrate de que sea el objeto completo
                                onChange={(_, selectedOption) => setCountry(selectedOption?.value || "")} // Guarda solo el código del país
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Pais" />}
                            />
                            <TextField
                                label="Fecha de nacimiento"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true, // Esto hace que la etiqueta se mueva cuando se selecciona una fecha
                                }}
                                sx={{ width: 300 }} // Ajusta el ancho si es necesario
                            />
                            <FormControl fullWidth>
                                <InputLabel id="gender-select-label">Género</InputLabel>
                                <MuiSelect labelId="gender-select-label" value={gender} onChange={(e) => setGender(e.target.value)} label="Género" >
                                    <MenuItem value="Male">Masculino</MenuItem>
                                    <MenuItem value="Female">Femenino</MenuItem>
                                    <MenuItem value="Other">Otro</MenuItem>
                                    <MenuItem value="Prefer not to say">Prefiero no decirlo</MenuItem>
                                </MuiSelect>
                            </FormControl>

                            <ReCAPTCHA
                                sitekey="6Lc6i_wqAAAAADn9mUgqMjnyTuzaArjzFO_zL9Lb"
                                onChange={onChangeCaptcha}
                            />
                            <TextField
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined" // Puedes elegir entre "outlined", "filled", "standard"
                                sx={{ width: 300 }} // Ajusta el ancho si es necesario
                            />

                            <Button variant="contained" color="success" type="submit">Registrarse</Button>
                        </Box>
                    </CardContent>

                </Card>
            </ThemeProvider>
        </DefaultHeader>
        </>
    );
}