
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";


const getCartItemsSelector = createSelector((state : RootState) => state.cart.items, (items) => {
    const totalQuantity = Object.values(items).reduce(
        (acc, curr) => acc + curr, 0
    );
    return totalQuantity;

})

export { getCartItemsSelector };
export type { RootState };