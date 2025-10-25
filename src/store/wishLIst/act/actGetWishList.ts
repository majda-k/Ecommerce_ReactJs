import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "@/types/Product";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import type { RootState } from "@store/index";

type TdataType = "ProductFullInfo" | "ProductIds";

type TResponse = TProduct[];


    const actGetWishList = createAsyncThunk("/wisheList/actGetWishList" , async(dataType: TdataType, thunkAPI) => {
        const {rejectWithValue, fulfillWithValue , signal , getState} = thunkAPI;

    const {auth} = getState() as RootState;
    try{
        const userWishLIst = await axios.get<{productId:number}[]>(`wishList?userId=${auth.user?.id}`);

        if(!userWishLIst.data){
            return fulfillWithValue({data: [], "productFullInfo": []});
        }



        if(dataType === "ProductFullInfo"){
            const concatenatedItems = userWishLIst.data.map((el) => `id=${el.productId}`).join("&");
            const response = await axios.get<TResponse>(`/products?${concatenatedItems}`, {signal});
            return {data: response.data, dataType : "ProductFullInfo"};
        }else{
            const concatenatedItems = userWishLIst.data.map((el) => el.productId);
            return {data: concatenatedItems, dataType : "ProductIds"};
        }
      
    }catch(error){
        return thunkAPI.rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetWishList;