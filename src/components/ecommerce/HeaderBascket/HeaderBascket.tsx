import { SlBasket } from "react-icons/sl";
import styles from "./styles.module.css";

export default function HeaderBascket() {
    const { BascketContainer, Bascketquantity } = styles;
    return (
        <div className={BascketContainer}>
            <SlBasket size={30}  className="headerBasket"/>
            <div className={Bascketquantity}>0</div>
        </div>
    )
}