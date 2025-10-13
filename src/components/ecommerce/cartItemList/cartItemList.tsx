import CartItem from "../CartItem/CartItem";
import type { TProduct } from "@/types/Product";

type cartItemListProps = {product : TProduct[] , 
    changeQuantityHandler : (id : number, quantity : number) => void,
    removeItemHandler : (id : number) => void
} ;

export default function CartItemList({product , changeQuantityHandler , removeItemHandler} : cartItemListProps) {
    const renderList = product.map((el) => <CartItem key={el.id} {...el} changeQuantityHandler={changeQuantityHandler} removeItemHandler={removeItemHandler} />)
    return (
        <div>
           
         {renderList}
        </div>
    )
}