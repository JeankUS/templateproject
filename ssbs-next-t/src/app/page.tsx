import News from "./components/News";
import { Box, Grid, LinearProgress, Stack, Button } from "@mui/material";
import Slogan from "./components/Slogan";
import Split from "./components/Split";
import ProductsOffer from "./components/ProductsOffer";

export default function HomePage() {
  return (
    <Box>
      <Box >
        {/* Sección de Noticias */}
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '80%', margin: '0 auto' }}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Box >
                <Slogan />
              </Box>
              <Split />
              <Box >
                <News />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Spliter */}
        <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
          <Split />
        </Box>
        {/* Sección de Productos */}
        <Box>
          <ProductsOffer />
        </Box>
        <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
          <Split />
        </Box>
      </Box>
    </Box>
  );
}
