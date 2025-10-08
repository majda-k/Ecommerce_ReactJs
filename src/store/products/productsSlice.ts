import { createSlice } from "@reduxjs/toolkit";
import thunkGetProducts from "./thunk/thunkGetProductsByCatPrefix";



interface Products {
    records : {id : number , title:string, img:string , price:string , cat_prefix:string}[],
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
            state.records = action.payload;
        });
        builder.addCase(thunkGetProducts.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string; 
        });
    }
})
export const { cleanUpProducts } = ProductsSlice.actions;
export { thunkGetProducts };
export default ProductsSlice.reducer;