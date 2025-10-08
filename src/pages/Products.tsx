

import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import thunkGetProductsByCatPrefix from "@store/products/thunk/thunkGetProductsByCatPrefix";
import { useParams } from "react-router-dom";
import Product from "@components/ecommerce/Product/product";
import { cleanUpProducts } from "@store/products/productsSlice";


const Products = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { records, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {

        let prefix: string;
        if (params.prefix && typeof params.prefix === 'string') {
            prefix = params.prefix;
            dispatch(thunkGetProductsByCatPrefix(prefix));
        }

        dispatch(cleanUpProducts());
    }, [dispatch, params]);



    const productsList = records.length > 0 ? records.map((record) =>

        <Col xs={3} key={record.id} className="d-flex justify-content-center mb-5 mt-2">
            <Product {...record} />
        </Col>
    ) : "No products found";



    return (
        <Container>
            <Row>{productsList}</Row>
        </Container>
    )
}


export default Products;