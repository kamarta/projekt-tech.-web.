from fastapi import APIRouter, HTTPException, Query

from .storage import get_customers_storage
from .schema import CustomerCreateSchema, CustomerUpdateSchema, Customer

router = APIRouter()


CUSTOMERS_STORAGE = get_customers_storage()


@router.get("/")
async def get_customers() -> list[Customer]:
    return list(get_customers_storage().values())


@router.get("/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.patch("/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema
) -> Customer:
    existing_customer = None
    try:
        existing_customer = CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )
    if not updated_customer.name and not updated_customer.surname and not updated_customer.email and not updated_customer.phone_number:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    if updated_customer.name:
        existing_customer.name = updated_customer.name

    if updated_customer.surname:
        existing_customer.surname = updated_customer.surname
    
    if updated_customer.email:
        existing_customer.email = updated_customer.email

    if updated_customer.phone_number:
        existing_customer.phone_number = updated_customer.phone_number

    return existing_customer


@router.delete("/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:
        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.post("/")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
    id = len(CUSTOMERS_STORAGE) + 1
    new_customer = Customer(**customer.dict(), id=id)
    CUSTOMERS_STORAGE[id] = new_customer
    return new_customer
