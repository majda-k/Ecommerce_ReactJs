import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const actLikeToggle = createAsyncThunk("/wisheList/actLikeToggle" , async(id:number, thunkAPI) => {
    const {rejectWithValue , signal} = thunkAPI;
   try{
    const isRecorsExist = await axios.get(`/wishList?userId=1&productId=${id}`);

    if(isRecorsExist.data.length > 0){
        const deleteId = isRecorsExist.data[0].id;
        await axios.delete(`/wishList/${deleteId}`);
        return {type:"remove" , id}
    }else {
        await axios.post(`/wishList`, {userId: 1, productId: id}, {signal});
        return {type:"add" , id}
    }

   }catch(error){
    if(axios.isAxiosError(error)){
        return thunkAPI.rejectWithValue(error.response?.data.message || error.message)
    }else {
        return thunkAPI.rejectWithValue("An unexpected error occurred")
    }
   }
    
})

export default actLikeToggle;


