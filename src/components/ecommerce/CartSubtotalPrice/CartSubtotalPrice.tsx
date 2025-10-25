
import { Button, Spinner } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import type { TProduct } from "@/types/Product";
import { useState } from "react";
import { actPlaceOrder } from "@store/orders/orderSlice"; 
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { clearCartAfterPlaceOrderHandler } from "@store/cart/cartSlice";
import type { RootState } from "@store";


export default function CartSubtotalPrice({product , accessToken  }: {product: TProduct[] , accessToken: string , setError: (error: string) => void , setLoading: (loading: boolean) => void , loading: boolean , error: string | null}) {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
 const TotalPrice = product.reduce((acc, curr) => acc+ (curr.price * curr.quantity), 0);

 const modelHandler =()=>{
    setShowModal(!showModal);
    setError(null);
 }

 const placeOrderHandler =()=>{
    setLoading(true);
    dispatch(actPlaceOrder(TotalPrice)).unwrap().then(()=>{
    dispatch(clearCartAfterPlaceOrderHandler());
    setShowModal(false);
    })
    .catch((error)=>{
        setError(error);
    })
    .finally(()=>{
        setLoading(false);
        setShowModal(false);
    });
 }

 
    
    const { subtotalPrice } = styles;
    return (
        <>
        <Modal show={showModal} onHide={modelHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modelHandler}>
            Close
          </Button>

          <Button variant="primary" onClick={placeOrderHandler}>
            {loading ? <Spinner animation="border" size="sm" /> : "confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
          <div className={subtotalPrice}>
            <p> Subtotal Price</p>
            <span>{TotalPrice} EGP</span>
           {!loading &&  error &&(
            <p className="text-danger">{error}</p>
           )}
            
        </div>
         <div style={{display: "flex", justifyContent: "flex-end"}}>
         {accessToken && (
                 <button className="btn btn-info text-white" onClick={modelHandler}>Place Order</button> )}
         </div>
        </>
      
             
    )
}