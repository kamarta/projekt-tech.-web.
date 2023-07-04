import { useState } from "react"; 

export const UpdateOrderForm = ({onClick}) => {
  const [orderedProducts, setOrderedProducts] = useState([]); 
  const [customerId, setCustomerId] = useState("");
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
      if (orderedProducts === "") {
        message("Please enter ordered products");
        return;
      }
      if (customerId === "") {
        message("Please enter customer id");
        return;
      }
      if (price === "") {
        message("Please enter price");
        return;
      }

      onClick(orderedProducts, customerId, price);
      setOrderedProducts([]);
      setCustomerId("");
      setPrice("");
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <label className="form">Products</label>
      <input className="form"
        placeholder="lamp,pen,notebook"
        value={orderedProducts}
        onChange={(e) => setOrderedProducts(e.currentTarget.value.split(","))}
      />
      <label className="form">Customer id</label>
      <input className="form"
        placeholder="13"
        value={customerId}
        onChange={(e) => setCustomerId(e.currentTarget.value)}
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