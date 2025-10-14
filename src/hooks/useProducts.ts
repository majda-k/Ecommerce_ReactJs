
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import thunkGetProductsByCatPrefix from "@store/products/thunk/thunkGetProductsByCatPrefix";
import { useParams } from "react-router-dom";
import { cleanUpProducts } from "@store/products/productsSlice";

export default function useProducts() {

    const params = useParams();
    const dispatch = useAppDispatch();

    const { records, loading, error  } = useAppSelector((state) => state.products);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItems = useAppSelector((state) => state.wishList.itemsId);
    const productFullInfo = records.map((el => ({ ...el, quantity: cartItems[el.id] || 0  , isLiked : wishListItems.includes(el.id) })));
    console.log('productFullInfo info', productFullInfo);

    useEffect(() => {
        let prefix: string;
        if (params.prefix && typeof params.prefix === 'string') {
            prefix = params.prefix;
            dispatch(thunkGetProductsByCatPrefix(params.prefix as string));
        }

        return () => {
            dispatch(cleanUpProducts());
        };
    }, [dispatch, params]);

    return { productFullInfo, loading, error ,params };
}

