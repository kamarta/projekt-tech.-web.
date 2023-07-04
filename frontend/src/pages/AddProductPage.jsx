import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { AddProductForm } from "@/components/AddProductForm";
import { createProduct } from "@/services/products";

export const AddProductPage = () => {
  const onAddProductHandler = async (name, price) => {
    await createProduct({ name, price });

    const messageElement = document.createElement("div");
    messageElement.textContent = "We created a new product for you!";
    document.body.appendChild(messageElement);
    messageElement.classList.add("success_message");

    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 3000);
  };

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add product</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex"></div>
      </div>
      <div>
        <AddProductForm onClick={onAddProductHandler} />
      </div>
    </div>
  );
};
