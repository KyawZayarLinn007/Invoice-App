import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Order = () => {
    return ( 
        <div>
            <Stack direction="row" justifyContent="center">
                <Box sx={{width: "80%", textAlign: "center"}}>
                    <Typography variant="h5" sx={{marginBottom: "20px"}}>Your order will arrive within a few days!😉</Typography>
                    <Link to="/">
                        <Button variant="contained" color="success">Back to home</Button>
                    </Link>
                </Box>
            </Stack>
        </div>
    );
}
 
export default Order;