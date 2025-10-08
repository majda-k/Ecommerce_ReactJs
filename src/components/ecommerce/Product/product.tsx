import { Button } from "react-bootstrap";

interface IProps {
    title: string;
    price: string;
    img: string;
    cat_prefix: string;
}

export default function Product({title, price, img , cat_prefix}: IProps) {
    return (
        <div>
            <img src={img} alt="photo" className="w-80" height={180}  />
            <h1 className=" mt-2 fs-5">{title}</h1>
            <p>{price} EGP</p>
            <Button className="btn-primary">Add to Cart</Button>
        </div>
    )
}