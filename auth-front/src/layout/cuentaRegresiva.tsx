import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import dayjs from "dayjs";

const CuentaRegresivaBicentenario = () => {
    const objetivo = dayjs("2025-08-06T00:00:00");
    const [tiempoRestante, setTiempoRestante] = useState(getDiferenciaTiempo());

    function getDiferenciaTiempo() {
        const ahora = dayjs();
        const diff = objetivo.diff(ahora, "second");
        if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };

        const dias = objetivo.diff(ahora, "day");
        const horas = objetivo.diff(ahora.add(dias, "day"), "hour");
        const minutos = objetivo.diff(ahora.add(dias, "day").add(horas, "hour"), "minute");
        const segundos = objetivo.diff(
            ahora.add(dias, "day").add(horas, "hour").add(minutos, "minute"),
            "second"
        );

        return { dias, horas, minutos, segundos };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTiempoRestante(getDiferenciaTiempo());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                color: "white",
                py: 4,
                px: 2,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgba(168, 42, 53, 0.7)",
                    borderRadius: 2,
                    paddingTop:"20px",
                    paddingBottom:"20px",
                    boxShadow: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Cuenta regresiva al Bicentenario
                </Typography>

                <Grid container spacing={2} justifyContent="center">
                    {[
                        { label: "Días", value: tiempoRestante.dias },
                        { label: "Horas", value: tiempoRestante.horas },
                        { label: "Minutos", value: tiempoRestante.minutos },
                        { label: "Segundos", value: tiempoRestante.segundos },
                    ].map((item, index) => (
                        <Grid key={index}>
                            <Box
                                sx={{
                                    backgroundColor: "#f6cb79",
                                    color: "black",
                                    borderRadius: 2,
                                    width: 100,
                                    height: 100,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    boxShadow: 2,
                                }}
                            >
                                <Typography variant="h4" fontWeight="bold">
                                    {item.value}
                                </Typography>
                                <Typography variant="subtitle1">{item.label}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default CuentaRegresivaBicentenario;
