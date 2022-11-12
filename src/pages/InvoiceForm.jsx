import * as React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config.js";
import { useNavigate } from "react-router-dom";

const InvoiceForm = ({ items, setItems }) => {
  const invoicesCollectionRef = collection(db, "invoices");
  let navigate = useNavigate();

  // select item field state
  const [selectItem, setSelectItem] = React.useState("");
  //tax field state
  const [tax, setTax] = React.useState(0);

  //selected items state
  const [selectedItems, setSelectedItems] = React.useState([]);

  //select option items state
  const [fetchSelectItems, setFetchSelectItems] = React.useState(items);

  console.log(`The selected items is`, selectedItems);
  console.log(`The select option is`, fetchSelectItems);

  // select item field onchange
  const handleChange = (event) => {
    setSelectItem(event.target.value);
  };

  // tax field onchange
  const handleTaxChange = (event) => {
    setTax(event.target.value);
  };

  const handleOptionAdd = () => {
    let id = document.querySelector(".MuiSelect-nativeInput").value;
    console.log(id);
    if (id) {
      let selectedItem = items.find((item) => item.id == id);
      selectedItem.qty = 1;
      selectedItem.total = selectedItem.price * selectedItem.qty;

      setSelectedItems([...selectedItems, selectedItem]);

      let filteredFetchSelectItems = fetchSelectItems.filter(
        (fetchSelectItem) => fetchSelectItem.id !== id
      );
      setFetchSelectItems(filteredFetchSelectItems);

      setSelectItem("");
    }
  };

  const handleReduceQty = (id) => {
    let nextState = produce(selectedItems, (draftState) => {
      let state = draftState.find((item) => item.id == id);
      if (state.qty >= 1) {
        state.qty--;
        state.total = state.qty * state.price;
      }
    });

    console.log(`The nextState is`, nextState);
    setSelectedItems(nextState);
  };

  const handleAddQty = (id) => {
    let nextState = produce(selectedItems, (draftState) => {
      let state = draftState.find((item) => item.id == id);
      if (state.qty >= 0) {
        state.qty++;
        state.total = state.qty * state.price;
      }
    });

    console.log(`The nextState is`, nextState);
    setSelectedItems(nextState);
  };

  const handleDeleteSelectedItem = (id) => {
    let newFetchSelectItem = items.find((item) => item.id == id);
    setFetchSelectItems([...fetchSelectItems, newFetchSelectItem]);

    let filteredSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== id
    );
    setSelectedItems(filteredSelectedItems);
  };

  const handleCreateInvoice = () => {
    let name = document.querySelector("#invoice-name").value || uuidv4();
    let total = document.querySelector("#selected-item-total").dataset
      .selectedTotal;
    let tax_value = tax || 0;

    let item_ids = [];
    document.querySelectorAll("#selected-item-id").forEach((item) => {
      console.log(item);
      item_ids.push(item.value);
    });

    let qtys = [];
    document.querySelectorAll("#selected-item-qty").forEach((item) => {
      console.log(item);
      qtys.push(item.value);
    });

    let data = {
      name,
      tax: Number(tax_value),
      total: Number(total),
      tems: item_ids,
      qtys,
    };

    addDoc(invoicesCollectionRef, data)
    .then(data => {
      navigate("/invoices");
    })
    
    console.log(total, name, tax_value, item_ids, qtys);
  };

  const calculateSubTotal = () => {
    return selectedItems.reduce((pre, curr) => pre + curr.total, 0) || 0;
  };

  const calculateTotal = () => {
    return Math.round(
      calculateSubTotal() - calculateSubTotal() * (tax / 100) || 0
    );
  };

  return (
    <>
      {/* wrapper */}
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: "80%" }}>
          {/* main grid container */}
          <Grid container spacing={16}>
            {/* items grid */}
            <Grid item xs={12} md={8}>
              {/* name field */}
              <Stack>
                <TextField
                  id="invoice-name"
                  color="success"
                  label="Invoice Name"
                  variant="standard"
                  helperText="Optional"
                  sx={{ width: "30%", marginBottom: "40px" }}
                />
              </Stack>

              {/* selected item div */}
              {selectedItems.map((selectedItem) => (
                <Grid spacing={4} container sx={{ marginBottom: "40px" }}>
                  <Grid item xs={3} md={4}>
                    <Typography variant="h6">{selectedItem.name}</Typography>
                    <input
                      type="hidden"
                      id="selected-item-id"
                      value={selectedItem.id}
                    />
                    <Typography variant="body2">
                      {selectedItem.price} mmks
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        aria-label="reduce"
                        color="warning"
                        size="small"
                        onClick={() => handleReduceQty(selectedItem.id)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      <Typography variant="body1">
                        {selectedItem.qty}
                      </Typography>
                      <input
                        type="hidden"
                        id="selected-item-qty"
                        value={selectedItem.qty}
                      />
                      <IconButton
                        aria-label="add"
                        color="warning"
                        size="small"
                        onClick={() => handleAddQty(selectedItem.id)}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="body2">
                      {selectedItem.total} mmks
                    </Typography>
                  </Grid>
                  <Grid item xs={3} md={2}>
                    <IconButton
                      aria-label="remove"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteSelectedItem(selectedItem.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              {/* item select */}
              <Stack
                direction="row"
                alignItems="baseline"
                gap={4}
                sx={{ marginBottom: "40px" }}
              >
                <FormControl
                  sx={{ width: "30%" }}
                  color="success"
                  variant="standard"
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Item
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectItem}
                    label="item"
                    onChange={handleChange}
                  >
                    {fetchSelectItems.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  endIcon={<AddIcon />}
                  color="success"
                  size="small"
                  onClick={handleOptionAdd}
                >
                  Add
                </Button>
              </Stack>
            </Grid>

            {/* total grid */}
            <Grid item xs={12} md={4}>
              {/* subtotal field */}
              <Stack sx={{ marginBottom: "40px" }}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="body2">
                  {calculateSubTotal()} mmks
                </Typography>
              </Stack>

              {/* tax field */}
              <Stack>
                <FormControl
                  className="tax-field"
                  sx={{ width: "70%", marginBottom: "40px" }}
                  color="success"
                >
                  <Input
                    id="standard-adornment-weight"
                    value={tax}
                    onChange={handleTaxChange}
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                      min: 0,
                      style: { textAlign: "center" },
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
                <Typography
                  variant="body2"
                  id="selected-item-total"
                  data-selected-total={calculateTotal()}
                >
                  {calculateTotal()} mmks
                </Typography>
              </Stack>

              {/* btns */}
              <Stack sx={{ marginBottom: "40px" }} direction="row" spacing={4}>
                <Link to="/invoices">
                  <Button
                    variant="contained"
                    endIcon={<KeyboardBackspaceIcon />}
                    color="success"
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  endIcon={<AddIcon />}
                  color="success"
                  onClick={handleCreateInvoice}
                >
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
