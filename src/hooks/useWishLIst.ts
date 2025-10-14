
import { productFullInfoCleanUp } from "@store/wishLIst/wishListSlice"; 
import { useAppDispatch } from "@store/hooks";
import { useEffect } from "react";
import actGetWishList from "@store/wishLIst/act/actGetWishList";
import { useAppSelector } from "@store/hooks";

export default function useWishLIst() { 
    const dispatch = useAppDispatch();
  

    const { productFullInfo, loading, error } = useAppSelector((state) => state.wishList);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItems = useAppSelector((state) => state.wishList.itemsId);


    useEffect(() => { dispatch(actGetWishList() ) ;
        return () => { dispatch(productFullInfoCleanUp()); }; }, [dispatch]);       



    const records = productFullInfo?.map((el) => ({ 
        ...el, 
        quantity: cartItems[el.id] || 0, 
        isLiked: wishListItems.includes(el.id) 
    })) || [];


    return {records, loading, error };

}