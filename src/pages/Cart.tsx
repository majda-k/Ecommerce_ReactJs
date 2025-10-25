import CartSubtotalPrice from "../components/ecommerce/CartSubtotalPrice/CartSubtotalPrice";

import CartItemList from "@components/ecommerce/cartItemList/cartItemList";
import Loading from "@components/feedback/loading/loading";
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler";
import useCart from "@hooks/useCart";


export default function Cart() {

    const { product, changeQuantityHandler, removeItemHandler, loading, error, accessToken, placeOrderSTatus } = useCart();
    return (
        <div>
            <h1>Cart</h1>
            <Loading status={loading} error={error} type="cart" >
                {product.length ? (
                    <>



                        <CartItemList product={product} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />

                        <CartSubtotalPrice product={product} accessToken={accessToken || ""} />
                    </>

                ) :( placeOrderSTatus === "succeeded") ?
                    <LottieHandler type="success" style={{ margin: "50%", textAlign: "center", display: "flex", justifyContent: "center", marginLeft: "15%" }} message="Order placed successfully" /> :

                    (<LottieHandler type="empty" style={{ margin: "50%", textAlign: "center", display: "flex", justifyContent: "center", marginLeft: "15%" }} message="No products in cart" />)
                }

                {/* // {product.length === 0 ? <LottieHandler type="empty"  style={{ margin: "50%" , textAlign: "center", display: "flex" , justifyContent: "center" , marginLeft: "15%"  }}  message="No products in cart" /> : null} */}

            </Loading>

        </div>

    )
}
