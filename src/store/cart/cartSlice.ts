import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/Product";



interface Cart {
    items: { [key: number]: number };
    ProductFullInfo: TProduct[];
}

const initialState: Cart = {
    items: {},
    ProductFullInfo: [],
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
    },
})


export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;