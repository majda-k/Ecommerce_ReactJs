import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "../../../types/Product";
import type { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";




type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk("/cart/actGetProductsByItems",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState , fulfillWithValue , signal} = thunkAPI;
        const { cart } = getState()  as RootState;
        const itemsId = Object.keys(cart.items);

      if(!itemsId.length) {
        return fulfillWithValue([]);
      }
       
        try {
            const concatenatedItems = itemsId.map((el) => `id=${el}`).join("&");
            const response = axios.get<TResponse>(`/products?${concatenatedItems}`, {signal});
            return (await response).data;
        } catch (error) {
          return thunkAPI.rejectWithValue(axiosErrorHandler(error));

        }

    });



export default { actGetProductsByItems };