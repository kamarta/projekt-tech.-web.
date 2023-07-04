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
import { deleteCustomer, fetchCustomers, updateCustomer } from "@/services/customers";
import { useState, useEffect } from "react";
import { UpdateCustomerForm } from "@/components/UpdateCustomerForm";

export function DataTableRowActions({ row }) {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const onCustomerDeleteHandler = async () => {
    const customerId = parseInt(row.id) + 1;
    await deleteCustomer(customerId);
    fetchCustomers().then(setCustomers);
    window.location.reload();
  };

  const onCustomerEditHandler = async () => {
    const customerId = parseInt(row.id) + 1;
    await updateCustomer(customerId);
    fetchCustomers().then(setCustomers);
    window.location.reload();
  };

  const startEditing = () => {
    const API_CUSTOMERS_URL = "http://localhost:8000/customers";
    const customerId = parseInt(row.id)
    fetch(`${API_CUSTOMERS_URL}/${customerId}`).then((res) => res.json());
    setShowForm(true);
  };

  useEffect(() => {
    fetchCustomers().then((customers) => setCustomers(customers));
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
        <DropdownMenuItem customers={customers} onClick={onCustomerDeleteHandler}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {showForm && <UpdateCustomerForm onClick={onCustomerEditHandler}/>}
    </DropdownMenu>
    
  );
  }

