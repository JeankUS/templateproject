import Products from "@/app/components/Products";
import Split from "@/app/components/Split";
import { Box, Typography } from "@mui/material";

export default function Store() {
    return (
        <Box>
            <Products />
            <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
                <Split />
            </Box>
        </Box>
    )
}