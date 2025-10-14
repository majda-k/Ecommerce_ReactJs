import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import type { TProduct } from "@/types/Product";

export default function CartSubtotalPrice({product}: {product: TProduct[]}) {
 const TotalPrice = product.reduce((acc, curr) => acc+ (curr.price * curr.quantity), 0);
    
    const { subtotalPrice } = styles;
    return (
        <div className={subtotalPrice}>
            <p> Subtotal Price</p>
            <span>{TotalPrice} EGP</span>
        </div>
    )
}