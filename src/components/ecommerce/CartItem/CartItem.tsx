import styles from "./styles.module.css";
import { memo } from "react";
import type { TProduct } from "@/types/Product";

type cartItemProps = TProduct & {
    changeQuantityHandler : (id : number, quantity : number) => void,
    removeItemHandler : (id : number) => void
} ;



export default memo( function CartItem ({id , title , img , price , max , quantity, changeQuantityHandler , removeItemHandler}: cartItemProps)  {


    const renderQuantity = Array(max).fill(1).map((_,idx)=>  {
        const quantity = idx + 1;
        return <option value={quantity} key={quantity} >{quantity}</option>
    });

    const changeQuantity =(event :React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = event.target.value;
        changeQuantityHandler(id, parseInt(quantity));
    }

    const { cartItemContainer, cartItemImg, cartItemTitle, cartItemPrice, cartItemRemove, cartItemQty } = styles;
    return (
        <>
            <div className="d-flex flex-row">
            <div className={cartItemContainer}>
                <div>
                    <img src={img} alt={title} className={cartItemImg} />
                </div>

                <div>
                    <p className={cartItemTitle}>{title}</p>
                    <p className={cartItemPrice}> {price} EGP</p>
                    <button className={cartItemRemove} onClick={() => removeItemHandler(id)}>Remove</button>
                </div>

            </div>


            <div className="d-flex flex-column p-2">
                <div>
                    <p>Quantity</p>
                </div>
                <div >
                    <select name="qt" id="qty" value={quantity} className={cartItemQty} onChange={changeQuantity} >
                        {renderQuantity}
                    </select>
                </div>
            </div>
            </div>
            <hr />
        </>
    )
});

