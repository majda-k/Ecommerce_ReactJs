import CartSubtotalPrice from "../components/ecommerce/CartSubtotalPrice/CartSubtotalPrice";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems, cartItemChangeQunatityHandler, cartItemRemoveHandler } from "@store/cart/cartSlice";
import CartItemList from "@components/ecommerce/cartItemList/cartItemList";
import Loading from "@components/feedback/loading/loading";

export default function Cart() {
    const dispatch = useAppDispatch();
    const { items, ProductFullInfo, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(actGetProductsByItems.actGetProductsByItems());
    }, [dispatch]);

    const product = ProductFullInfo.map((el) => ({ ...el, quantity: items[el.id] }));

    const changeQuantityHandler = useCallback((id : number, quantity : number) => {
        dispatch(cartItemChangeQunatityHandler({id, quantity}));
    }, [dispatch]);


    const removeItemHandler = useCallback((id : number) => {
       dispatch(cartItemRemoveHandler({id}));
    }, [dispatch]);

    return (
        <div>
            <h1>Cart</h1>
            <Loading status={loading} error={error} >
                <>
                    <CartItemList product={product} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />

                    <CartSubtotalPrice product={product} />
                </>

            </Loading>

        </div>

    )
}
