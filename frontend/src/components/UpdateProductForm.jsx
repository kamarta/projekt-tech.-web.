import { useState } from "react";

export const UpdateProductForm = ({onClick}) => {
    const [name, setName] = useState(""); 
    const [price, setPrice] = useState("");

    const message = (message) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      document.body.appendChild(messageElement);
      messageElement.classList.add("info_message");
  
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 3000);
    };
  
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (name === "") {
          message("Please enter product name")
          return;
        }
        if (price === "") {
          message("Please enter price")
          return;
        }

        onClick(name, price);
        setName("");
        setPrice("");
    };

    return (
      <form className="form" onSubmit={onSubmitHandler}>
        <label className="form">Name</label>
        <input className="form"
          placeholder="lamp"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label className="form">Price</label>
        <input className="form"
          placeholder="123.67"
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
        />
        <button type="submit" className="form">Update</button>
      </form>
    );
    };