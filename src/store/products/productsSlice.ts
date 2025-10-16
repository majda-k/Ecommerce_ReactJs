import { createSlice } from "@reduxjs/toolkit";
import thunkGetProducts from "./thunk/thunkGetProductsByCatPrefix";
import type { TProduct } from "@/types/Product";
import { isString } from "../../types/guards";



interface Products {
    records : TProduct[],
    loading : "idle" | "pending" | "succeeded" | "failed",
    error : string | null,
}

const initialState : Products  ={
    records :[],
    loading : "idle",
    error : null,
}

const ProductsSlice = createSlice({
    name : "products",
    initialState ,
    reducers : {
        cleanUpProducts : (state) => {
            state.records=[];
        }
    },
    extraReducers : (builder) => {
        builder.addCase(thunkGetProducts.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(thunkGetProducts.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload ;
        });
        builder.addCase(thunkGetProducts.rejected, (state, action) => {
            state.loading = "failed";
            if(isString(action.payload)){
            state.error = action.payload ;
            }
        });
    }
})
export const { cleanUpProducts } = ProductsSlice.actions;
export { thunkGetProducts };
export default ProductsSlice.reducer;