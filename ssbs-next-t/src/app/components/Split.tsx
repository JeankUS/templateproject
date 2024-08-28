// src/app/components/Slogan.tsx

"use client";

import { Box, Grid } from "@mui/material";

export default function Split() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box sx={{ padding: '40px 0' }}>
                        <Box sx={{ width: '100%', background: '#f2d263', height: '1px' }}>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}