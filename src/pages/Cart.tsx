import CartSubtotalPrice from "../components/ecommerce/CartSubtotalPrice/CartSubtotalPrice";

import CartItemList from "@components/ecommerce/cartItemList/cartItemList";
import Loading from "@components/feedback/loading/loading";
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler";
import useCart from "@hooks/useCart";


export default function Cart() {
    
    const { product, changeQuantityHandler, removeItemHandler, loading, error } = useCart();
    return (
        <div>
            <h1>Cart</h1>
            <Loading status={loading} error={error} type="cart" >
                <>
                    <CartItemList product={product} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />

                    <CartSubtotalPrice product={product} />
                </>
                {product.length === 0 ? <LottieHandler type="empty"  style={{ margin: "50%" , textAlign: "center", display: "flex" , justifyContent: "center" , marginLeft: "15%"  }}  message="No products in cart" /> : null}

            </Loading>

        </div>

    )
}
