import { useState } from "react";

const InvoiceForm = () => {
  const [state, setState] = useState(false);

  const items = [
    { id: 1, name: "Pepsi", price: 700 },
    { id: 2, name: "Coca Cola", price: 800 },
    { id: 3, name: "Sunkist", price: 650 },
  ];

  let initial_ids = items.map(item => item.id);
  let select_ids = initial_ids;

  const handleAddItem = (e) => {
    e.preventDefault();

    let items_div = document.querySelector(".items_div");
    let item = items.find(item => item.id == document.querySelector("#item-select").value);
    let node = document.createElement("div");

    node.innerHTML = `
                      <label for='name'>Item</label>
                      <input type='text' value=${item.name} id='item' name='item' readonly />
                      <label for='qty'>quantity</label>
                      <input type='number' value='1' min='1' id='qty' name='qty' class='qty' + ${item.id} />
                      <label for='price'>price</label>
                      <input type='text' value=${item.price * 1} id='price' name='price' />
                    `;

    items_div.appendChild(node);
  }

  return (
    <div>
      <h2>Invoice Form</h2>
      <form>
        <label htmlFor="name">Invoice Name</label>
        <input type="text" name="name" id="name" />
        <br />
        <div className="items_div"></div>

        <select name="item" id="item-select">
          {items.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </select>
        <button onClick={handleAddItem}>Add item</button>
        <label htmlFor="subtotal">subtotal</label>
        <input type="text" id="subtotal" name="subtotal" value={0} />
      </form>
    </div>
  );
};

export default InvoiceForm;
