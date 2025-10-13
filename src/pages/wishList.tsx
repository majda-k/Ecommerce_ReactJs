import { useAppDispatch } from "@store/hooks";
import { useEffect } from "react";
import actGetWishList from "@store/wishLIst/act/actGetWishList";
import { useAppSelector } from "@store/hooks";
import Product from "@components/ecommerce/Product/product";
import type { TProduct } from "../types/Product";
import GridList from "@components/common/GridList/GridList";
import { productFullInfoCleanUp } from "@store/wishLIst/wishListSlice";



export default function WishList() {
  
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



    return (
        <div>
            <h1> Your WishList</h1>
            <div className="d-flex justify-content-center align-items-center mb-5 ">
            </div>
            <GridList<TProduct> records={records} gridItem={(record) => <Product {...record} />} />
        </div>
    )
}