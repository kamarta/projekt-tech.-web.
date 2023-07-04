from fastapi import APIRouter, HTTPException, Query

from .storage import get_products_storage
from .schema import ProductCreateSchema, ProductUpdateSchema, Product

router = APIRouter()


PRODUCTS_STORAGE = get_products_storage()


@router.get("/")
async def get_products() -> list[Product]:
    return list(get_products_storage().values())


@router.get("/{product_id}")
async def get_product(product_id: int) -> Product:
    try:
        return PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )


@router.patch("/{product_id}")
async def update_product(
    product_id: int, updated_product: ProductUpdateSchema
) -> Product:
    existing_product = None
    try:
        existing_product = PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )
    if not updated_product.name and not updated_product.price:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    if updated_product.name:
        existing_product.name = updated_product.name

    if updated_product.price:
        existing_product.price = updated_product.price

    return existing_product


@router.delete("/{product_id}")
async def delete_product(product_id: int) -> None:
    try:
        del PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )


@router.post("/")
async def create_product(product: ProductCreateSchema) -> Product:
    id = len(PRODUCTS_STORAGE) + 1
    new_product = Product(**product.dict(), id=id)
    PRODUCTS_STORAGE[id] = new_product
    return new_product