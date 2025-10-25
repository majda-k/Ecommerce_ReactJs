
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wishList from "@assets/wishList.svg";
import { useAppSelector } from "@store/hooks";

export default function HeaderWishList() {
    const navigate = useNavigate();
    const [isAnimate, setIsAnimate] = useState(false);
        const {BasketCartPumping , BascketContainer , Bascketquantity , headerWishList , headerWishListImg} = styles;
  
    const BascketQuantityClass = `${Bascketquantity} ${isAnimate ? BasketCartPumping : ""}`

    const totalQuantity = useAppSelector((state) => state.wishList.itemsId);

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
        <div className={BascketContainer} onClick={() => navigate("/wishList")}>
           
              <img src={wishList} alt="wishList" className={headerWishListImg} />
            
            <div>{totalQuantity.length && totalQuantity.length !== 0 ? <div className={BascketQuantityClass}>{totalQuantity.length}</div> : null}</div>
            <p className={headerWishList}>WishList</p>
        </div>
    )
}