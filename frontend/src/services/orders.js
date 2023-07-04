const API_ORDERS_URL = "http://localhost:8000/orders";

export const fetchOrders = () =>
  fetch(API_ORDERS_URL).then((res) => res.json());

export const createOrder = ({ orderedProducts, customerId, price }) => 
  fetch(API_ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordered_products: orderedProducts,
      customer_id: customerId,
      price: price,
    }),
  }).then((res) => res.json());

export const deleteOrder = (id) =>
  fetch(`${API_ORDERS_URL}/${id}`, { method: "DELETE" });

export const updateOrder = ({id, orderedProducts, customerId, price }) =>
  fetch(`${API_ORDERS_URL}/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ordered_products: orderedProducts,
      customer_id: customerId,
      price: price,
    }),
  }).then((res) => res.json());