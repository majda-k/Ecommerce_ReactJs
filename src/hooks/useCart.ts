
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems, cartItemChangeQunatityHandler, cartItemRemoveHandler, resetCartAfterPlaceOrderHandler } from "@store/cart/cartSlice";
import { CleanCartProductFullInfo } from "@store/cart/cartSlice";
import type { RootState } from "@store";
import { resetOrderStatus } from "@store/orders/orderSlice";
export default function useCart() {
  const dispatch = useAppDispatch();
  const { items, ProductFullInfo, loading, error } = useAppSelector((state) => state.cart);

  const { accessToken } = useAppSelector((state) => state.auth);

  const placeOrderSTatus = useAppSelector((state: RootState) => state.orders.loading);


  const product = ProductFullInfo.map((el) => ({ ...el, quantity: items[el.id] }));

  const changeQuantityHandler = useCallback((id: number, quantity: number) => {
    dispatch(cartItemChangeQunatityHandler({ id, quantity }));
  }, [dispatch]);


  const removeItemHandler = useCallback((id: number) => {
    dispatch(cartItemRemoveHandler({ id }));
  }, [dispatch]);


  useEffect(() => {
    const promise = dispatch(actGetProductsByItems.actGetProductsByItems());
    return () => {
      promise.abort();
      dispatch(CleanCartProductFullInfo()),
        dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return { product, changeQuantityHandler, removeItemHandler, loading, error, accessToken, placeOrderSTatus, resetCartAfterPlaceOrderHandler };

}

