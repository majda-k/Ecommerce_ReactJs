import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useState, useEffect, memo } from "react";
import { Spinner } from "react-bootstrap";
import type { TProduct } from "@/types/Product";
import Like from "@assets/LIke.svg";
import LikeFill from "@assets/LikeFill.svg";
import styles from "./styles.module.css";

import actLikeToggle from "@store/wishLIst/act/actLikeToggle";




interface IProps {
    id: number;
    title: string;
    price: number;
    img: string;
    cat_prefix: string;
    max: number;
    quantity: number;

}

export default memo(function Product ({ id, title, price, img, cat_prefix, max, quantity , isLiked }: TProduct ) {


    const dispatch = useAppDispatch();

    const[wishListLoading , setWishListLoading] = useState(false);

    const [isBtnClicked, setIsBtnClicked] = useState(0);
    const [isBtnnDisabled, setIsBtnnDisabled] = useState(false);

    const currentRemainningQuantity = max - (quantity ?? 0);
    const quatityProduct = currentRemainningQuantity <= 0 ? true : false;



    const handleClick = () => {
        dispatch(addToCart(id));
        setIsBtnClicked((prev) => prev + 1);
    }

    useEffect(() => {
        if (!isBtnClicked) {
            setIsBtnnDisabled(false);
        }
        setIsBtnnDisabled(true);

        const debounce = setTimeout(() => {
            setIsBtnnDisabled(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [isBtnClicked]);

    const handleLikeToggle = (id: number) => {
        if(!wishListLoading){
            setWishListLoading(true);
            dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => {
                setWishListLoading(false);
            })
            .catch(() => {
                setWishListLoading(false);
            });
        }
    }


    return (
        <div className={styles.productContainer}>
            <div className={styles.WisheListContainer}>
                {wishListLoading ? <Spinner animation="border" size="sm" /> : <img src={isLiked ? LikeFill : Like} alt="Like" onClick={() => handleLikeToggle(id)} />}
               
            </div>
            <img src={img} alt="photo" className={styles.productImg} />
            <h1 className=" mt-2 fs-5">{title}</h1>
            <p>{price} EGP</p>
            <p className="text-danger">{quatityProduct ? "Out of stock" : `In stock ${currentRemainningQuantity} item(s)`}</p>
            <Button className="btn-primary" onClick={handleClick} disabled={isBtnnDisabled} > {isBtnnDisabled ? <><Spinner animation="border" size="sm" />Loading ... </> : "Add to Cart"} </Button>
        </div>
    )
})