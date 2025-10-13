import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@/types/Product";
import axios from "axios";



type TResponse = TProduct[];


const actGetWishList = createAsyncThunk("/wisheList/actGetWishList" , async(_, thunkAPI) => {
    const {rejectWithValue, fulfillWithValue} = thunkAPI;
    try{
        const userWishLIst = await axios.get<{productId:number}[]>("/wishList?userId=1");

        if(!userWishLIst.data){
            return fulfillWithValue([]);
        }
       const concatenatedItems = userWishLIst.data.map((el) => `id=${el.productId}`).join("&");

       const response = await axios.get<TResponse>(`/products?${concatenatedItems}`);
       return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }else {
            return rejectWithValue("An unexpected error occurred")
        }
    }
});

export default actGetWishList;