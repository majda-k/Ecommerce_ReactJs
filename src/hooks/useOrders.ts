
import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import actGetOrders from "@store/orders/act/actGetOrders";
import { useAppDispatch } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/orderSlice";
import type { TProduct } from "@/types/Product";
import { useState } from "react";


export default function useOrders() {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<TProduct[]>([]);



    const { orders, loading, error } = useAppSelector((state) => state.orders);


    useEffect(() => {
        const promise = dispatch(actGetOrders());
        return () => {
            promise.abort();
            dispatch(resetOrderStatus());
        };
    }, [dispatch]);


    const viewDetailsHandler = (id: number) => {
        const newProducts = orders.find((order) => order.id === id);

        setShowModal(true);

        setSelectedProducts((prev) => [...prev, ...newProducts?.orders || []]);



    };

    const closeModalHandler = () => {
        setShowModal(false);
        setSelectedProducts([]);
    };


    return { orders, loading, error, showModal, selectedProducts, viewDetailsHandler, closeModalHandler };
}