import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import produce from "immer";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
  let navigate = useNavigate();
  console.log(
    cartItems?.reduce((pre, curr) => {
      return pre + curr?.price * curr?.qty;
    }, 0)
  );

  const handleReduceQty = (id) => {
    let nextState = produce(cartItems, draftState => {
      let state = draftState.find(item => item.id == id);
      if(state.qty >= 1){
        state.qty--;
      }
    })
    console.log(`The nextState is`, nextState);
    setCartItems(nextState);
  }

  const handleAddQty = (id) => {
    let nextState = produce(cartItems, draftState => {
      let state = draftState.find(item => item.id == id);
      if(state.qty >= 0){
        state.qty++;
      }
    })
    console.log(`The nextState is`, nextState);
    setCartItems(nextState);
  }

  const handleClearCart = () => {
    setCartItems([]);
  }

  const handleCheckOut = () => {
    if(cartItems.length >= 1){
      navigate("/order");
      setCartItems([]);
    }
  }

  return (
    // wrapper stack
    <Stack direction="row" justifyContent="center">
      <Grid container spacing={12} sx={{ width: "80%" }}>
        {/* items grid */}
        <Grid item xs={12} md={7}>
          {cartItems.length <= 0 ? (
            <Typography variant="h5">
              You have no items in your cart!
            </Typography>
          ) : (
            cartItems.map((item) => (
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
                      onClick={() => handleReduceQty(item.id)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1">{item.qty}</Typography>
                    <IconButton
                      aria-label="add"
                      color="warning"
                      size="small"
                      onClick={() => handleAddQty(item.id)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </div>
              </Stack>
            ))
          )}
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
              <Typography variant="h6">
                {
                  cartItems?.reduce((pre, curr) => {
                    return pre + curr?.price * curr?.qty;
                  }, 0)
                }{" "}
                mmks{" "}
              </Typography>
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
              <Typography variant="h6">
              {
                  cartItems?.reduce((pre, curr) => {
                    return pre + curr?.price * curr?.qty;
                  }, 0)
                }{" "}
                mmks{" "}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ marginBottom: "20px", marginTop: "50px" }}
            >
              <Button variant="contained" color="primary" sx={{marginRight: "10px"}} onClick={handleCheckOut}>
                Check out
              </Button>
              <Button variant="contained" color="error" onClick={handleClearCart}>
                Clear cart
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Cart;
