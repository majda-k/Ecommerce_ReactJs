
import { productFullInfoCleanUp } from "@store/wishLIst/wishListSlice"; 
import { useAppDispatch } from "@store/hooks";
import { useEffect, useRef } from "react";
import actGetWishList from "@store/wishLIst/act/actGetWishList";
import { useAppSelector } from "@store/hooks";
import { store, type RootState } from "@store";

export default function useWishLIst() { 
    const dispatch = useAppDispatch();
  

    const { productFullInfo, loading, error } = useAppSelector((state) => state.wishList);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItems = useAppSelector((state) => state.wishList.itemsId);
    const userAccessToken = useAppSelector((state) => state.auth.accessToken);
    const hasLoaded = useRef(false);
    
    
    useEffect(() => { 
        if (!hasLoaded.current) {
            hasLoaded.current = true;
            
            // Charger seulement si l'utilisateur est connecté
            const {auth} = store.getState() as RootState;
            if (auth.user?.id) {
                dispatch(actGetWishList("ProductFullInfo"));
            }
            
            return () => { 
                dispatch(productFullInfoCleanUp()); 
            };
        }
    }, [dispatch]);


    const records = productFullInfo?.map((el) => ({ 
        ...el, 
        quantity: cartItems[el.id] || 0, 
        isLiked: wishListItems.includes(el.id) ,
        isAuthenticated: userAccessToken ? true : false
    })) || [];


    return {records, loading, error };

}