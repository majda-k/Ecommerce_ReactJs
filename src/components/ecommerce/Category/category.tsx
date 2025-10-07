import { Link } from "react-router-dom";


interface IProps {
    id: number;
    title: string;
    prefix: string;
    img: string;
}

export default function Category({id, title, prefix, img}: IProps) {
    return (
        <div >
            <Link to={`/categories/products/${prefix}`}>
            <img src={img} alt="photo" className="w-100" height={150} style={{ borderRadius: 100}}  />
            <h1 className="text-center mt-2 fs-5">{title}</h1>
            </Link>
        </div>
    )
}
