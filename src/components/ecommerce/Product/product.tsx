import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";



interface IProps {
    id: number;
    title: string;
    price: string;
    img: string;
    cat_prefix: string;
    max: number;
    quantity: number;
}

export default function Product({id , title, price, img , cat_prefix , max , quantity} : IProps) {

  
    const dispatch = useAppDispatch();

    const [isBtnClicked, setIsBtnClicked] = useState(0);
    const[isBtnnDisabled, setIsBtnnDisabled] = useState(false);

    const currentRemainningQuantity = max - (quantity ?? 0);
    const quatityProduct = currentRemainningQuantity <= 0 ? true : false;
   


    const handleClick = () => {
        dispatch(addToCart(id));
        setIsBtnClicked((prev) => prev+1);
    }

    useEffect(() => {
        if(!isBtnClicked){
            setIsBtnnDisabled(false);
        }
        setIsBtnnDisabled(true);

        const debounce = setTimeout(() => {
            setIsBtnnDisabled(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [isBtnClicked]);
    
    return (
        <div>
            <img src={img} alt="photo" className="w-80" height={180}  />
            <h1 className=" mt-2 fs-5">{title}</h1>
            <p>{price} EGP</p>
            <p className="text-danger">{quatityProduct ? "Out of stock" : `In stock ${currentRemainningQuantity} item(s)`}</p>
            <Button className="btn-primary" onClick={handleClick} > {isBtnnDisabled ? <><Spinner animation="border" size="sm"  />Loading ... </>:"Add to Cart"} </Button>
        </div>
    )
}