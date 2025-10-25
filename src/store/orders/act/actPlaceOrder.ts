import {createAsyncThunk} from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";



export const actPlaceOrder = createAsyncThunk("/orders/actPlaceOrder" , async(subtotalPrice: number , thunkAPI: ThunkApi<RootState>)=> {
    const {rejectWithValue , getState} = thunkAPI;

    const {auth , cart} = getState() as RootState;

    const orderItems = cart.ProductFullInfo.map((el)=> ({
        id : el.id,
        quantity : cart.items[el.id],
        price : el.price,
        title : el.title,
        img : el.img ,
     
    }));


    try{
        const response = await axios.post("/orders" , {
            userId : auth.user?.id,
            orders: orderItems,
            subtotalPrice : subtotalPrice,
        })
        return response.data;

    }catch(error){
        return rejectWithValue(axiosErrorHandler(error));
    }



})
 