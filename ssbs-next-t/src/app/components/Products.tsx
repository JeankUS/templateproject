"use client";

import { Grid, Card, CardContent, Typography, Button, Box, Input, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/products"; // Importa el servicio

interface Product {
    idproduct: number;
    name: string;
    description: string;
    price: string;  // Cambiado a string para coincidir con el backend
    stock: number;
    images: { url: string }[]; // Ajuste para reflejar la estructura de imágenes
}

const PRODUCTS_PER_PAGE = 8; // Número de productos por página

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Añadir manejo de errores
    const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para manejar el término de búsqueda

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(); // Llama al servicio para obtener los productos
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    if (loading) {
        return <Typography variant="h6" align="center">Cargando productos...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" align="center" color="error">{error}</Typography>;
    }

    // Filtrar los productos según el término de búsqueda
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Filtrar los productos que se mostrarán en la página actual
    const displayedProducts = filteredProducts.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    return (
        <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" gutterBottom color={'gold'} sx={{ fontWeight: 'bold' }}>
                        Productos
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
                {displayedProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ borderRadius: "8px", maxHeight: '450px', minHeight: '450px', minWidth: '250px' }}>
                            <Box sx={{ height: "200px", backgroundColor: "#f5f5f5", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                                <img src={product.images[0]?.url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Box>
                            <CardContent sx={{ height: '200px' }}>
                                <Box sx={{ height: '20%' }}>
                                    <Typography variant="h6" component="div" color="primary.contrastText" sx={{ fontWeight: 'bold' }}>
                                        {product.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '60%' }}>
                                    <Typography variant="body2" color="primary.contrastText" sx={{ marginBottom: "10px", overflow: 'hidden' }}>
                                        {product.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: '20%' }}>
                                    <Typography variant="h6" component="div" color="primary.contrastText" sx={{ fontWeight: 'bold', marginBottom: "20px" }}>
                                        {Number(product.price) ? `$${Number(product.price).toFixed(2)}` : 'N/A'}
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
                    count={Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                    className="custom-pagination"
                />
            </Box>
        </Box >
    );
}
