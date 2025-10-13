import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/Product";
import actGetProductsByItems from "./act/actGetProductsByItems";




interface Cart {
    items: { [key: string]: number };
    ProductFullInfo: TProduct[];
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: null | string,
}

const initialState: Cart = {
    items: {},
    ProductFullInfo: [],
    loading : "idle",
    error: null,

}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id]++;
            } else {
                state.items[id] = 1;
            }
        },

       cartItemChangeQunatityHandler : (state , action) =>{
            state.items[action.payload.id] = action.payload.quantity;
        },


        cartItemRemoveHandler  : (state , action) =>{
            delete state.items[action.payload.id];

            state.ProductFullInfo = state.ProductFullInfo.filter((el) => el.id !== action.payload.id);

        },

        
    },

    extraReducers: (builder) => {
        builder.addCase(actGetProductsByItems.actGetProductsByItems.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
    
        builder.addCase(actGetProductsByItems.actGetProductsByItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.ProductFullInfo = action.payload;
        });
    
        builder.addCase(actGetProductsByItems.actGetProductsByItems.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        });
    }


})




export const { addToCart , cartItemChangeQunatityHandler , cartItemRemoveHandler } = CartSlice.actions;
export default CartSlice.reducer;
export { actGetProductsByItems };
