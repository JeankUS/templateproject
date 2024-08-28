// src/app/components/Slogan.tsx

"use client";

import { Box, Typography } from "@mui/material";

export default function Slogan() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom color={'gold'} sx={{ fontWeight: 'bold' }}>Santa Street Barber Studio</Typography>
            <Typography variant="body1" color="primary.contrastText" sx={{ textAlign: 'justify' }}>
                En SS Barber Studio, nos especializamos en brindar una experiencia de barbería de lujo
                para caballeros que valoran la calidad, el estilo y la atención al detalle. Nuestro
                equipo de barberos altamente capacitados combina técnicas tradicionales con un enfoque
                moderno para ofrecer cortes de cabello impecables, afeitados al ras, y cuidado de la barba.
                Nos esforzamos por crear un ambiente relajante y sofisticado donde cada cliente se sienta valorado
                y renovado. Ya sea que busques un estilo clásico o una apariencia moderna, en SS Barber Studio
                estamos comprometidos a ayudarte a lucir y sentirte lo mejor posible.
            </Typography>
        </Box>
    )
}