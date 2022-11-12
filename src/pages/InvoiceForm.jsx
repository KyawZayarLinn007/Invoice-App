import * as React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { Link } from "react-router-dom";

const InvoiceForm = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      {/* wrapper */}
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: "80%" }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: "30px" }}
          >
            Invoice Form
          </Typography>
          <hr style={{marginBottom: "70px", opacity: "50%"}} />

          {/* main grid container */}
          <Grid container spacing={16}>
            {/* items grid */}
            <Grid item xs={12} md={8}>
              {/* name field */}
              <Stack>
                <TextField
                  color="success"
                  label="Invoice Name"
                  variant="standard"
                  helperText="Optional"
                  sx={{ width: "30%", marginBottom: "40px" }}
                />
              </Stack>

              {/* todelete */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: "40px" }}
              >
                <div>
                  <Typography variant="h6">Coca Cola</Typography>
                  <Typography variant="body2">750 mmks</Typography>
                </div>
                <div>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                      aria-label="reduce"
                      color="warning"
                      size="small"
                      // onClick={() => handleReduceQty(item.id)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1">1</Typography>
                    <IconButton
                      aria-label="add"
                      color="warning"
                      size="small"
                      // onClick={() => handleAddQty(item.id)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </div>
                <div>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="body2">750 mmks</Typography>
                </div>
                <div>
                  <IconButton
                    aria-label="remove"
                    color="error"
                    size="small"
                    // onClick={() => handleAddQty(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBottom: "40px" }}
              >
                <div>
                  <Typography variant="h6">Coca Cola</Typography>
                  <Typography variant="body2">750 mmks</Typography>
                </div>
                <div>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                      aria-label="reduce"
                      color="warning"
                      size="small"
                      // onClick={() => handleReduceQty(item.id)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="body1">1</Typography>
                    <IconButton
                      aria-label="add"
                      color="warning"
                      size="small"
                      // onClick={() => handleAddQty(item.id)}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </div>
                <div>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="body2">750 mmks</Typography>
                </div>
                <div>
                  <IconButton
                    aria-label="remove"
                    color="error"
                    size="small"
                    // onClick={() => handleAddQty(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Stack>

              {/* item select */}
              <Stack direction="row" sx={{ marginBottom: "40px" }}>
                <FormControl sx={{ width: "30%" }} color="success" variant="standard">
                  <InputLabel id="demo-simple-select-label">
                    Select Item
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            {/* total grid */}
            <Grid item xs={12} md={4}>
              {/* subtotal field */}
              <Stack sx={{ marginBottom: "40px" }}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="body2">750 mmks</Typography>
              </Stack>

              {/* tax field */}
              <Stack>
                <FormControl
                  sx={{ width: "70%", marginBottom: "40px" }}
                  color="success"
                >
                  <Input
                    id="standard-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                  <FormHelperText id="standard-weight-helper-text">
                    Tax
                  </FormHelperText>
                </FormControl>
              </Stack>

              {/* total field */}
              <Stack sx={{ marginBottom: "80px" }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="body2">750 mmks</Typography>
              </Stack>

              {/* btns */}
              <Stack sx={{ marginBottom: "40px" }} direction="row" spacing={4}>
                <Link to="/invoices">
                  <Button variant="contained" endIcon={<KeyboardBackspaceIcon />} color="success">
                    Back
                  </Button>
                </Link>
                <Button variant="contained" endIcon={<AddIcon />} color="success">
                  Create
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default InvoiceForm;
