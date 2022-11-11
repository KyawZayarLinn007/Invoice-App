import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Cart = ({ cartItems, items }) => {
  let cartItemDetails = [];

  if (cartItems.length > 0) {
    if (cartItems.length == 1) {
      cartItemDetails = items.filter((item) => item.id == cartItems[0]);
    } else if (cartItems.length > 1) {
      for (let i = 0; i < cartItems.length; i++) {
        cartItemDetails.push(items.filter((item) => item.id == cartItems[i])[0]);
      }
    }
  }

  console.log(cartItemDetails);

  return (
    // wrapper stack
    <Stack direction="row" justifyContent="center">
      <Grid container spacing={12} sx={{ width: "80%" }}>
        {/* items grid */}
        <Grid item xs={12} md={7}>
          {cartItemDetails.length <= 0 ? (
            <Typography variant="h5">
              You have no items in your cart!
            </Typography>
          ) : (
            cartItemDetails.map((item) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: "40px" }}
              >
                <div>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body1">{item.price} mmks</Typography>
                </div>
                <div>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                      aria-label="reduce"
                      color="warning"
                      size="small"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1">1</Typography>
                    <IconButton aria-label="add" color="warning" size="small">
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </div>
              </Stack>
            ))
          )}

          {/* item row */}
          {/* <Stack
            direction="row"
            justifyContent="space-around"
            sx={{ marginBottom: "40px" }}
          >
            <div>
              <Typography variant="h5">Coca Cola</Typography>
              <Typography variant="body1">800 mmks</Typography>
            </div>
            <div>
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton aria-label="reduce" color="warning" size="small">
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography variant="body1">1</Typography>
                <IconButton aria-label="add" color="warning" size="small">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Stack>
            </div>
          </Stack> */}
        </Grid>

        {/* checkout form grid */}
        <Grid item xs={12} md={5}>
          <Box
            className="checkout-form"
            sx={{
              width: "100%",
              backgroundColor: "#25c02d",
              padding: "20px",
              borderRadius: "0.3rem",
              color: "white",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: "20px" }}
            >
              <Typography variant="h6">Subtotal</Typography>
              <Typography variant="h6">0 mmks</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: "20px" }}
            >
              <Typography variant="h6">Tax</Typography>
              <Typography variant="h6">0%</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: "20px" }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">0 mmks</Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ marginBottom: "20px" }}
            >
              <Button variant="outlined" color="info">
                Check out
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Cart;
