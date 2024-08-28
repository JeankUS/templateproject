// src/app/components/Footer.tsx

"use client";

import { Box, Grid, Typography, Link, Container } from "@mui/material";
import Split from "./Split";

export default function Footer() {
  return (
    <Box>
      <Box sx={{ width: '80%', margin: '0 auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} color={'primary.contrastText'}>
            <Grid item xs={6} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Company</Typography>
              <Link href="#" color="inherit" underline="none">About Us</Link><br />
              <Link href="#" color="inherit" underline="none">Our Team</Link><br />
              <Link href="#" color="inherit" underline="none">Careers</Link><br />
              <Link href="#" color="inherit" underline="none">News</Link>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Products</Typography>
              <Link href="#" color="inherit" underline="none">Gadgets</Link><br />
              <Link href="#" color="inherit" underline="none">Widgets</Link><br />
              <Link href="#" color="inherit" underline="none">Doodads</Link><br />
              <Link href="#" color="inherit" underline="none">Thingamajigs</Link>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Resources</Typography>
              <Link href="#" color="inherit" underline="none">Blog</Link><br />
              <Link href="#" color="inherit" underline="none">Documentation</Link><br />
              <Link href="#" color="inherit" underline="none">Support</Link><br />
              <Link href="#" color="inherit" underline="none">FAQs</Link>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>Contact</Typography>
              <Link href="#" color="inherit" underline="none">Sales</Link><br />
              <Link href="#" color="inherit" underline="none">Support</Link><br />
              <Link href="#" color="inherit" underline="none">Press</Link><br />
              <Link href="#" color="inherit" underline="none">Partnerships</Link>
            </Grid>
          </Grid>
        </Container>
          <Split />
      </Box>

    </Box>
  );
}
