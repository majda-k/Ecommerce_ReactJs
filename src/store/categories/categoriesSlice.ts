import { createSlice } from "@reduxjs/toolkit";
import thunkGetCategories from "./thunk/thunkGetCategories";
import { isString } from "../../types/guards";



interface Category {
    records : {id : number , title:string, prefix:string, img:string}[],
    loading : "idle" | "pending" | "succeeded" | "failed",
    error : string | null,
}

const initialState : Category  ={
    records :[],
    loading : "idle",
    error : null,
}




const CategoriesSlice = createSlice({
    name : "categories",
    initialState ,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(thunkGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(thunkGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(thunkGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            if(isString(action.payload)){
            state.error = action.payload ;
            }
        });
    }
})

export { thunkGetCategories };
export default CategoriesSlice.reducer;