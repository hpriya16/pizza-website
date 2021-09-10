import React, { useState, useEffect } from "react";

import Axios from "axios";

export function MongoDB() {
  // States to post
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToList = () => {
    Axios.post(`${process.env.REACT_APP_ENDPOINT}/insert`, {
      name: name,
      price: price,
      quantity: quantity,
      category: "pizza",
    });
    setProductsList([
      ...productsList,
      { Name: name, Price: price, Quantity: quantity },
    ]);
  };
  // state to read/get
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_ENDPOINT}/read`).then((response) => {
      setProductsList(response.data);
    });
  }, []);

  // state to update
  const [newName, setNewName] = useState("");

  const updateProduct = (id) => {
    Axios.put(`${process.env.REACT_APP_ENDPOINT}/update`, {
      id: id,
      newName: newName,
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`${process.env.REACT_APP_ENDPOINT}/delete/${id}`);
  };

  return (
    <div className="text-center">
      <h1>CRUD APP with MERN</h1>
      <br></br>

      <label>Product name</label>
      <br></br>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br></br>
      <label>Product price</label>
      <br></br>
      <input
        type="number"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
      <br></br>
      <button className="mt-3" onClick={addToList}>
        Add to List
      </button>
      <h1>Products List</h1>

      {productsList.map((val, key) => {
        return (
          <div key={key}>
            <h1>
              {val.Name} for {val.Price}
            </h1>
            <input
              onChange={(event) => setNewName(event.target.value)}
              type="text"
              placeholder="New product name"
            />
            <button onClick={() => updateProduct(val._id)}>Update</button>
            <button onClick={() => deleteProduct(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
// ******** END MongoDB ********
