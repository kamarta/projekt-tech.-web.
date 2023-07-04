from fastapi import APIRouter, HTTPException, Query

from .storage import get_orders_storage
from .schema import OrderCreateSchema, OrderUpdateSchema, Order

router = APIRouter()


ORDERS_STORAGE = get_orders_storage()


@router.get("/")
async def get_orders() -> list[Order]:
    return list(get_orders_storage().values())


@router.get("/{order_id}")
async def get_order(order_id: int) -> Order:
    try:
        return ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )


@router.patch("/{order_id}")
async def update_order(
    order_id: int, updated_order: OrderUpdateSchema
) -> Order:
    existing_order = None
    try:
        existing_order = ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )
    if not updated_order.ordered_products and not updated_order.customer_id and not updated_order.price:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    if updated_order.ordered_products:
        existing_order.ordered_products = updated_order.ordered_products

    if updated_order.customer_id:
        existing_order.customer_id = updated_order.customer_id
    
    if updated_order.price:
        existing_order.price = updated_order.price

    return existing_order


@router.delete("/{order_id}")
async def delete_order(order_id: int) -> None:
    try:
        del ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )


@router.post("/")
async def create_order(order: OrderCreateSchema) -> Order:
    id = len(ORDERS_STORAGE) + 1
    new_order = Order(**order.dict(), id=id)
    ORDERS_STORAGE[id] = new_order
    return new_order

