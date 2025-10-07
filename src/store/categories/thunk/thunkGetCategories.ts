import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = {id : number, title : string, prefix : string, img : string}[];

const thunkGetCategories = createAsyncThunk(
    "categories/thunkGetCategories",
    async (_NEVER, thunkAPI) => {
        try {
            const response = await axios.get<TResponse>("http://localhost:5005/categories")
            return response.data
        }catch(error){
            if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data.message || error.message)
            }else {
                return thunkAPI.rejectWithValue("An unexpected error occurred")
            }
        }
})


export default thunkGetCategories;