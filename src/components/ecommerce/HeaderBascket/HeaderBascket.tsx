import { SlBasket } from "react-icons/sl";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { getCartItemsSelector } from "@store/cart/selectors"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderBascket() {
    const navigate = useNavigate();
    const [isAnimate, setIsAnimate] = useState(false);
    const {BasketCartPumping , BascketContainer , Bascketquantity , headerBascket , headerBasketImg} = styles;
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


   
 
    return (
        <div className={BascketContainer} onClick={() => navigate("/cart")}>
            <SlBasket size={30} className={headerBasketImg} />
            <div>{totalQuantity > 0 ? <div className={BascketQuantityClass}>{totalQuantity}</div> : null}</div>
            <p className={headerBascket}>Cart</p>
        </div>
    )
}