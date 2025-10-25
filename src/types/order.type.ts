import type { TProduct } from "./Product";

export type TOrderItem = {
    id: number;
    userId: number;
    orders : TProduct[],
    subtotalPrice: number;
}