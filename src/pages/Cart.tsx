import CartSubtotalPrice from "../components/ecommerce/CartSubtotalPrice/CartSubtotalPrice";

import CartItemList from "@components/ecommerce/cartItemList/cartItemList";
import Loading from "@components/feedback/loading/loading";
import useCart from "@hooks/useCart";


export default function Cart() {
    
    const { product, changeQuantityHandler, removeItemHandler, loading, error } = useCart();
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
