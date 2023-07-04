import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Layout } from "@/components/Layout";
import { DashboardPage, CustomersPage, OrdersPage} from "@/pages";
import { AddCustomerPage } from "./pages/AddCustomerPage";
import { ProductsPage } from "@/pages";
import { AddOrderPage } from "./pages/AddOrderPage";
import { AddProductPage } from "./pages/AddProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "add-customer",
        element: <AddCustomerPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "add-order",
        element: <AddOrderPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "add-product",
        element: <AddProductPage />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
