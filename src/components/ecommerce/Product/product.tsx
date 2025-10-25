import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useState, useEffect, memo } from "react";
import { Spinner } from "react-bootstrap";
import type { TProduct } from "@/types/Product";
import Like from "@assets/LIke.svg";
import LikeFill from "@assets/LikeFill.svg";
import styles from "./styles.module.css";
import actLikeToggle from "@store/wishLIst/act/actLikeToggle";
import ProductInfo from "@components/ProductInfo/ProductInfo";




interface IProps {
    id: number;
    title: string;
    price: number;
    img: string;
    cat_prefix: string;
    max: number;
    quantity: number;

}

export default memo(function Product ({ id, title, price, img,  max, quantity , isLiked , isAuthenticated }: TProduct & { isAuthenticated: boolean } ) {


    const dispatch = useAppDispatch();


    const [showModal, setShowModal] = useState(false);

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
        if(isAuthenticated){
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
        }else{
            setShowModal(true);
        }
    
    }



    return (
        <>
        {/* <div
      className="modal show"    
      style={{ display: 'block', position: 'absolute' , margin: '15%' , zIndex: 1000 , width: '70%' , height: '100%' }} 
      onHide={() => setShowModal(false)}
   
    > */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Dialog >
        <Modal.Body className="text-center mx-auto" >
          <p>You need to be logged in to add products to your wish list.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
      </Modal>

    <div className={styles.productContainer}>
        <ProductInfo title={title} price={price} img={img} direction="row" >
            <div className={styles.WisheListContainer}>
                {wishListLoading ? <Spinner animation="border" size="sm" /> : <img src={isLiked ? LikeFill : Like} alt="Like" onClick={() => handleLikeToggle(id)} />}
               
            </div>
            
            <p className="text-danger">{quatityProduct ? "Out of stock" : `In stock ${currentRemainningQuantity} item(s)`}</p>
            
           
            <Button className="btn-primary" onClick={handleClick} disabled={isBtnnDisabled} > {isBtnnDisabled ? <><Spinner animation="border" size="sm" />Loading ... </> : "Add to Cart"} </Button>
        
      
        </ProductInfo>

        </div>
        </>
    )
});