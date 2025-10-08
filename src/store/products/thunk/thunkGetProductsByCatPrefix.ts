import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = {id : number, title : string, prefix : string, img : string , price:string , cat_prefix:string }[];

const thunkGetProducts = createAsyncThunk(
    "products/thunkGetProductsByCatPrefix",
    async (prefix:string, thunkAPI) => {
        try {
            const response = await axios.get<TResponse>(`http://localhost:5005/products?cat_prefix=${prefix}`)
            console.log(response.data)
            return response.data
        }catch(error){
            if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data.message || error.message)
            }else {
                return thunkAPI.rejectWithValue("An unexpected error occurred")
            }
        }
})


export default thunkGetProducts;