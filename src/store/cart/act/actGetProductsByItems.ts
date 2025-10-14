import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "../../../types/Product";
import type { RootState } from "@store/index";




type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk("/cart/actGetProductsByItems",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState , fulfillWithValue} = thunkAPI;
        const { cart } = getState()  as RootState;
        const itemsId = Object.keys(cart.items);

      if(!itemsId.length) {
        return fulfillWithValue([]);
      }
       
        try {
            const concatenatedItems = itemsId.map((el) => `id=${el}`).join("&");
            const response = axios.get<TResponse>(`/products?${concatenatedItems}`);
            return (await response).data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            } else {
                return rejectWithValue("An unexpected error occurred");
            }

        }

    });



export default { actGetProductsByItems };