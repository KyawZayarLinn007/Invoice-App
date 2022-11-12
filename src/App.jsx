import * as React from "react";
import Navbar from "./components/Navbar";
import Toolbar from '@mui/material/Toolbar';
import { Route, Routes } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceForm from "./pages/InvoiceForm";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Box from '@mui/material/Box';

const App = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [items, setItems] = React.useState([]);

  return ( 
    <div>
      <Navbar cartItems={cartItems} />
      <Toolbar />
      <Box 
        sx={{marginTop: "50px"}}
      />
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/items" element={<ItemsPage items={items} setItems={setItems} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/create" element={<InvoiceForm />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} items={items} />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
  );
}
 
export default App;