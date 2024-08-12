// src/app/components/Footer.tsx

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", p: 2, textAlign: "center" }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </Typography>
    </Box>
  );
}
