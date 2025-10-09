import { SlBasket } from "react-icons/sl";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { getCartItemsSelector } from "@store/cart/selectors"
import { useState, useEffect } from "react";

export default function HeaderBascket() {
    const [isAnimate, setIsAnimate] = useState(false);
    const {BasketCartPumping , BascketContainer , Bascketquantity} = styles;
    const totalQuantity = useAppSelector(getCartItemsSelector);
    const BascketQuantityClass = `${Bascketquantity} ${isAnimate ? BasketCartPumping : ""}`

    useEffect(() => {
        if (!totalQuantity) {
            setIsAnimate(false);
        }
        else {
            setIsAnimate(true);
        }
        const debounce = setTimeout(() => {
            setIsAnimate(false);
        }, 300);

        return () => clearTimeout(debounce);

    }, [totalQuantity]);


    console.log("redering")
 
    return (
        <div className={BascketContainer}>
            <SlBasket size={30} className="headerBasket" />
            <div className={BascketQuantityClass}>{totalQuantity}</div>
        </div>
    )
}