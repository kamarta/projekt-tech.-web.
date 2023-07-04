/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MoreHorizontal, Pen, Trash } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { deleteOrder, fetchOrders, updateOrder } from "@/services/orders";
import { useState, useEffect } from "react";
import { UpdateOrderForm } from "@/components/UpdateOrderForm";

export function DataTableRowActions({ row }) {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const onOrderDeleteHandler = async () => {
    const orderId = parseInt(row.id) + 1;
    await deleteOrder(orderId);
    fetchOrders().then(setOrders);
    window.location.reload();
  };

  const onOrderEditHandler = async () => {
    const orderId = parseInt(row.id) + 1;
    await updateOrder(orderId);
    fetchOrders().then(setOrders);
    window.location.reload();
  };

  const startEditing = () => {
    const API_ORDERS_URL = "http://localhost:8000/orders";
    const orderId = parseInt(row.id)
    fetch(`${API_ORDERS_URL}/${orderId}`).then((res) => res.json());
    setShowForm(true);
  };

  useEffect(() => {
    fetchOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={startEditing}>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem orders={orders} onClick={onOrderDeleteHandler}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {showForm && <UpdateOrderForm onClick={onOrderEditHandler}/>}
    </DropdownMenu>
  );
}
