const API_PRODUCTS_URL = "http://localhost:8000/products";

export const fetchProducts = () =>
  fetch(API_PRODUCTS_URL).then((res) => res.json());

export const createProduct = ({ name, price }) =>
  fetch(API_PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      price: price,
    }),
  }).then((res) => res.json());

export const deleteProduct = (id) =>
  fetch(`${API_PRODUCTS_URL}/${id}`, { method: "DELETE" });

export const updateProduct = ({id, name, price }) =>
  fetch(`${API_PRODUCTS_URL}/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      price: price,
    }),
  }).then((res) => res.json());