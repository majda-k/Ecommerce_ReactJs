import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@/types/Category";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TResponse = TCategory[];

const thunkGetCategories = createAsyncThunk(
    "categories/thunkGetCategories",
    async (_NEVER, thunkAPI) => {
        const {signal} = thunkAPI;
        try {
            const response = await axios.get<TResponse>("/categories", {signal})
            return response.data
        }catch(error){
           return thunkAPI.rejectWithValue(axiosErrorHandler(error));
        }
})


export default thunkGetCategories;