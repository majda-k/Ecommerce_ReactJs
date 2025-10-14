  
  import { useEffect, useCallback } from "react";
  import { useAppDispatch, useAppSelector } from "@store/hooks";
  import { actGetProductsByItems, cartItemChangeQunatityHandler, cartItemRemoveHandler } from "@store/cart/cartSlice";
  import { CleanCartProductFullInfo } from "@store/cart/cartSlice";
  
  
  export default function useCart() {
    const dispatch = useAppDispatch();
    const { items, ProductFullInfo, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(actGetProductsByItems.actGetProductsByItems());
        return () => {
            dispatch(CleanCartProductFullInfo());
        };
    }, [dispatch]);

    const product = ProductFullInfo.map((el) => ({ ...el, quantity: items[el.id] }));

    const changeQuantityHandler = useCallback((id : number, quantity : number) => {
        dispatch(cartItemChangeQunatityHandler({id, quantity}));
    }, [dispatch]);


    const removeItemHandler = useCallback((id : number) => {
       dispatch(cartItemRemoveHandler({id}));
    }, [dispatch]);

    return { product, changeQuantityHandler, removeItemHandler, loading, error };

  }

