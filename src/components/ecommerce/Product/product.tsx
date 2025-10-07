import { Button } from "react-bootstrap";

export default function Product() {
    return (
        <div>
            <img src="/public/images/image.png" alt="photo" className="w-100" height={120}  />
            <h1 className=" mt-2 fs-5">title</h1>
            <p>10 EGP</p>
            <Button className="btn-primary">Add to Cart</Button>
        </div>
    )
}