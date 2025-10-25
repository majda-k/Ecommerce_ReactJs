import styles from "./styles.module.css";


type TProductInfoProps = {
  
    title: string;
    price: number;
    img: string;
    children? : React.ReactNode;
    style? : React.CSSProperties;
    direction? : "row" | "column";
    quantity? : number;
    totalPrice? : number;
}

export default function ProductInfo(
    {title, price, img, children, style, direction="row", quantity, totalPrice} 
    : TProductInfoProps
) {
    return (
        <>
         <div className={`d-flex flex-${direction}`}>
         <div className={`${styles[`cartItemContainer-${direction}`]}`} style={style} >
        <div>
            <img src={img} alt={title}  className={`${styles[`cartItemImg-${direction}`]}`} />
        </div>

        <div>
            <p className={`${styles[`cartItemTitle-${direction}`]}`}>{title}</p>
            <p className={`${styles[`cartItemPrice-${direction}`]}`}> {price} EGP</p>
            {quantity && <p className={`${styles[`cartItemQuantity-${direction}`]}`}>Total Quantity : {quantity} item(s)</p>}
            {totalPrice && <p className={`${styles[`cartItemQuantity-${direction}`]}`}>Total Price : {totalPrice} EGP</p>}
            {children}
         </div>
         </div>
         </div>
        </>
        
        
    )
}