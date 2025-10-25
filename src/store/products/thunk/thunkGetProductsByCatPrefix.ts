import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@/types/Product";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TResponse = TProduct[];

const thunkGetProducts = createAsyncThunk(
    "products/thunkGetProductsByCatPrefix",
    async (prefix:string, thunkAPI) => {
        const {signal} = thunkAPI;
        try {
            const response = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`, {signal})
       
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(axiosErrorHandler(error));
        }
})


export default thunkGetProducts;