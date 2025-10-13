import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import thunkGetProductsByCatPrefix from "@store/products/thunk/thunkGetProductsByCatPrefix";
import { useParams } from "react-router-dom";
import Product from "@components/ecommerce/Product/product";
import { cleanUpProducts } from "@store/products/productsSlice";
import GridList from "@components/common/GridList/GridList";
import type { TProduct } from "../types/Product";
import {WishList} from "../store/wishLIst/wishListSlice";  
import { useState } from "react";

const Products = () => {
    const params = useParams();
    const dispatch = useAppDispatch();



    const { records, loading, error } = useAppSelector((state) => state.products);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishListItems = useAppSelector((state) => state.wishList.itemsId);
    const productFullInfo = records.map((el => ({ ...el, quantity: cartItems[el.id] || 0  , isLiked : wishListItems.includes(el.id) })));
    console.log('productFullInfo info', productFullInfo);

    useEffect(() => {
        let prefix: string;
        if (params.prefix && typeof params.prefix === 'string') {
            prefix = params.prefix;
            dispatch(thunkGetProductsByCatPrefix(params.prefix as string));
        }

        return () => {
            dispatch(cleanUpProducts());
        };
    }, [dispatch, params]);



    return (
        <Container>
      
            <div className="d-flex justify-content-center align-items-center mb-5 ">
                <h1><span>{params.prefix} <span>Products</span></span></h1>
            </div>
            <GridList<TProduct> records={productFullInfo} gridItem={(record) => <Product {...record} />} />
        </Container>
    )
}


export default Products;