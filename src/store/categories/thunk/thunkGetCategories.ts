import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@/types/Category";
import axios from "axios";

type TResponse = TCategory[];

const thunkGetCategories = createAsyncThunk(
    "categories/thunkGetCategories",
    async (_NEVER, thunkAPI) => {
        try {
            const response = await axios.get<TResponse>("/categories")
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