"use client";

import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Slide, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface NewsItem {
    title: string;
    description: string;
    url: string;
}

const news: NewsItem[] = [
    {
        title: "Título de la Noticia 1",
        description: "Resumen breve de la noticia 1. Esta es una descripción corta que da una idea general del contenido.",
        url: "/news_example.png"  // URL relativa a la carpeta `public`
    },
    {
        title: "Título de la Noticia 2",
        description: "Resumen breve de la noticia 2. Esta es una descripción corta que da una idea general del contenido.",
        url: "/news_example.png"  // URL relativa a la carpeta `public`
    },
    {
        title: "Título de la Noticia 3",
        description: "Resumen breve de la noticia 3. Esta es una descripción corta que da una idea general del contenido.",
        url: "/news_example.png"  // URL relativa a la carpeta `public`
    },
    {
        title: "Título de la Noticia 4",
        description: "Resumen breve de la noticia 3. Esta es una descripción corta que da una idea general del contenido.",
        url: "/news_example.png"  // URL relativa a la carpeta `public`
    },

];

export default function News() {
    const [index, setIndex] = useState(0);
    const [slideIn, setSlideIn] = useState(true);
    const [direction, setDirection] = useState<"left" | "right">("right");

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setDirection("left");
        setSlideIn(false);
    };

    const handlePrev = () => {
        setDirection("right");
        setSlideIn(false);
    };

    const handleSlideExit = () => {
        setSlideIn(true);

        setIndex((prevIndex) => {
            if (direction === "left") {
                return (prevIndex + 1) % news.length;
            } else {
                return (prevIndex - 1 + news.length) % news.length;
            }
        });
    };

    return (

        <Box sx={{ maxWidth: "100%", height: "400px", position: "relative", overflow: "hidden", borderRadius: "15px" }}>
            <Typography variant="h4" gutterBottom color={'gold'} sx={{ fontWeight: 'bold' }}>
                Noticias
            </Typography>
            <Slide
                direction={slideIn ? direction : direction === "left" ? "right" : "left"} // Dirección opuesta para entrada/salida
                in={slideIn}
                timeout={500}
                mountOnEnter
                unmountOnExit
                onExited={handleSlideExit}
            >
                <Card sx={{ display: "flex", height: "100%", borderRadius: "15px", overflow: "hidden", position: 'relative', width: '100%' }}>
                    <Box sx={{ flex: "1 1 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={news[index].url} alt="Imagen de la noticia" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                    <CardContent sx={{ flex: "2 1 auto", padding: "32px" }} >
                        <Typography variant="h4" component="div" color="primary.contrastText">
                            {news[index].title}
                        </Typography>
                        <Typography variant="body1" color="primary.contrastText" sx={{ marginTop: "16px" }}>
                            {news[index].description}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: "24px", cursor: "pointer" }}>
                            <a href="#" style={{color:'gold'}}>Leer más</a>
                        </Typography>
                    </CardContent>
                </Card>
            </Slide>

            <IconButton
                onClick={handlePrev}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "16px",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    '&:hover': {
                        backgroundColor: "rgba(0, 0, 0, 0.7)"
                    }
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "16px",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    '&:hover': {
                        backgroundColor: "rgba(0, 0, 0, 0.7)"
                    }
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}