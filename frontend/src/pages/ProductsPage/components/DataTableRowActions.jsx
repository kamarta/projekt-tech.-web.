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
import { deleteProduct, fetchProducts, updateProduct } from "@/services/products";
import { useState, useEffect } from "react";
import { UpdateProductForm } from "@/components/UpdateProductForm";

export function DataTableRowActions({ row }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const onProductDeleteHandler = async () => {
    const productId = parseInt(row.id) + 1;
    await deleteProduct(productId);
    fetchProducts().then(setProducts);
    window.location.reload();
  };

  const onProductEditHandler = async () => {
    const productId = parseInt(row.id) + 1;
    await updateProduct(productId);
    fetchProducts().then(setProducts);
    window.location.reload();
  };

  const startEditing = () => {
    const API_PRODUCTS_URL = "http://localhost:8000/products";
    const productId = parseInt(row.id)
    fetch(`${API_PRODUCTS_URL}/${productId}`).then((res) => res.json());
    setShowForm(true);
  };

  useEffect(() => {
    fetchProducts().then((products) => setProducts(products));
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
        <DropdownMenuItem products={products} onClick={onProductDeleteHandler}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {showForm && <UpdateProductForm onClick={onProductEditHandler}/>}
    </DropdownMenu>
  );
}
