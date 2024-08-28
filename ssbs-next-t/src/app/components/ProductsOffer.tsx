"use client";

import { Grid, Card, CardContent, Typography, Button, Box, Input, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchOffers } from "../services/products"; // Importa la función para obtener ofertas

interface Offer {
    idproduct: number;
    product: {
        name: string;
        description: string;
        price: string;  // Cambiado a string para coincidir con el backend
        images: { url: string }[]; // Ajuste para reflejar la estructura de imágenes
    };
    offer_price: string;
}

const PRODUCTS_PER_PAGE = 4; // Número de productos por página

export default function ProductsOffer() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Añadir manejo de errores
    const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para manejar el término de búsqueda

    useEffect(() => {
        const loadOffers = async () => {
            try {
                const data = await fetchOffers(); // Llama al servicio para obtener los productos en oferta
                setOffers(data);
            } catch (error) {
                console.error("Failed to load offers", error);
                setError("Failed to load offers");
            } finally {
                setLoading(false);
            }
        };

        loadOffers();
    }, []);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    if (loading) {
        return <Typography variant="h6" align="center">Cargando ofertas...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" align="center" color="error">{error}</Typography>;
    }

    // Filtrar las ofertas que se mostrarán en la página actual
    const filteredOffers = offers.filter((offer) =>
        offer.product.name.toLowerCase().includes(searchTerm) ||
        offer.product.description.toLowerCase().includes(searchTerm)
    );

    const displayedOffers = filteredOffers.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    return (
        <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" gutterBottom color={'gold'} sx={{ fontWeight: 'bold' }}>
                        Ofertas
                    </Typography>
                </Box>

                <Box>
                    <Input 
                        placeholder="Buscar productos..."  
                        sx={{ borderRadius: "0", padding: "8px", color:"#F2EADF", borderBottom:'1px solid #F2EADF !important'}} 
                        value={searchTerm}
                        onChange={handleSearchChange} 
                    />
                </Box>
            </Box>

            <Grid container spacing={4}>
                {displayedOffers.map((offer, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: "8px", maxHeight: '450px', minHeight: '450px', minWidth: '250px' }}>
                            <Box sx={{ height: "200px", backgroundColor: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                                <img src={offer.product.images[0]?.url} alt={offer.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Box>
                            <CardContent sx={{ height: '200px' }}>
                                <Box sx={{ height: '20%' }}>
                                    <Typography variant="h6" color="primary.contrastText" component="div" sx={{ fontWeight: 'bold' }}>
                                        {offer.product.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '60%'}}>
                                    <Typography variant="body2" color="primary.contrastText" sx={{ marginBottom: "10px", overflow: 'hidden' }}>
                                        {offer.product.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '20%', display:'flex', gap:'5px'}}>
                                    <Typography variant="body1" component="div" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                                        {`$${Number(offer.product.price).toFixed(2)}`}
                                    </Typography>
                                    <Typography variant="body1" color="primary.contrastText" component="div" sx={{ fontWeight: 'bold'}}>
                                        {`$${Number(offer.offer_price).toFixed(2)}`}
                                    </Typography>
                                </Box>
                                <Button variant="contained" color="primary" fullWidth sx={{ textTransform: "none" }}>
                                    Agregar al carrito
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "40px" }}>
                <Pagination
                    color="primary"
                    count={Math.ceil(filteredOffers.length / PRODUCTS_PER_PAGE)}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    className="custom-pagination"
                />
            </Box>
        </Box>
    );
}
