const API_CUSTOMERS_URL = "http://localhost:8000/customers";

export const fetchCustomers = () =>
  fetch(API_CUSTOMERS_URL).then((res) => res.json());

export const createCustomer = ({ name, surname, email, phoneNumber }) =>
  fetch(API_CUSTOMERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      phone_number: phoneNumber,
    }),
  }).then((res) => res.json());

export const deleteCustomer = (id) =>
  fetch(`${API_CUSTOMERS_URL}/${id}`, { method: "DELETE" });

export const updateCustomer = ({ id, name, surname, email, phoneNumber }) =>
  fetch(`${API_CUSTOMERS_URL}/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      surname: surname,
      email: email,
      phone_number: phoneNumber,
    }),
  }).then((res) => res.json());