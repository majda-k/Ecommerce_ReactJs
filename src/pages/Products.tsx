
import Product from "@components/ecommerce/Product/product";
import GridList from "@components/common/GridList/GridList";
import type { TProduct } from "../types/Product";
import useProducts from "@hooks/useProducts";
import { Container } from "react-bootstrap";


const Products = () => {


  const { productFullInfo, loading, error ,params } = useProducts();



    return (
        <Container>
      
            <div className="d-flex justify-content-center align-items-center mb-5 ">
                <h1><span>{params.prefix} <span>Products</span></span></h1>
            </div>
            <GridList<TProduct> records={productFullInfo} emptyMessage="No products found" gridItem={(record) => <Product {...record} />} />
        </Container>
    )
}


export default Products;