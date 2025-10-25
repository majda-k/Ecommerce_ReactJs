

import { createSlice } from "@reduxjs/toolkit";
import type { TOrderItem } from "@/types/order.type";
import { actPlaceOrder } from "./act/actPlaceOrder";
import { isString } from "@/types/guards";
import actGetOrders from "./act/actGetOrders";


interface IOrderItem {
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: string | null,
    orders: TOrderItem[];
}

const initialState : IOrderItem = {
    loading: "idle",
    error: null,
    orders: [],
};


export const orderSlice = createSlice({
name : "orders",
initialState,
reducers: {
    resetOrderStatus: (state) => {
        state.loading = "idle";
        state.error = null;
        state.orders = [];
    },
},


extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
        state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
        state.loading = "failed";
        if(isString(action.payload)){
            state.error = action.payload;
        }
    });

    builder.addCase(actGetOrders.pending, (state) => {
        state.loading = "pending";
        state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state , action) => {
        state.loading = "succeeded";
        state.orders = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
        state.loading = "failed";
        if(isString(action.payload)){
            state.error = action.payload;
        }
    });
},
});

export const { resetOrderStatus } = orderSlice.actions;

export { actPlaceOrder };

export default orderSlice.reducer;
