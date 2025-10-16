import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishList from "./act/actGetWishList";
import type { TProduct } from "@/types/Product";
import { isString } from "../../types/guards";



interface WishList {
    itemsId: number[];
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: string | null;
    productFullInfo: TProduct[];
}


const initialState : WishList = {
    itemsId: [],
    loading: "idle",
    error: null,
    productFullInfo: [],
} 

export const WishList = createSlice({
    name: "wishList",   
    initialState,
    reducers: {
        productFullInfoCleanUp: (state) => {
            state.productFullInfo = [];
        }
    },

    extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
        state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state , action) => {
        if(action.payload.type === "add" ){
            state.itemsId.push(action.payload.id)
        }else{
            state.itemsId= state.itemsId.filter((el) =>el !== action.payload.id )
            state.productFullInfo = state.productFullInfo.filter((el) =>el.id !== action.payload.id )
        }
    });
    builder.addCase(actLikeToggle.rejected, (state , action) => {
        state.error = action.payload as string;
    });


   
        builder.addCase(actGetWishList.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetWishList.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productFullInfo = action.payload || [];
            
        
        });
              
        builder.addCase(actGetWishList.rejected, (state , action) => {
            state.loading = "failed";
            if(isString(action.payload)){
            state.error = action.payload ;
            }
        });
    
}});





export default WishList.reducer;
export const { productFullInfoCleanUp } = WishList.actions;
