import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@/types/Product";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";



type TResponse = TProduct[];


const actGetWishList = createAsyncThunk("/wisheList/actGetWishList" , async(_, thunkAPI) => {
    const {rejectWithValue, fulfillWithValue , signal} = thunkAPI;
    try{
        const userWishLIst = await axios.get<{productId:number}[]>("/wishList?userId=1");

        if(!userWishLIst.data){
            return fulfillWithValue([]);
        }
       const concatenatedItems = userWishLIst.data.map((el) => `id=${el.productId}`).join("&");

       const response = await axios.get<TResponse>(`/products?${concatenatedItems}`, {signal});
       return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetWishList;