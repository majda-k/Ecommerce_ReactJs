import {createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/cart/selectors";
import axios from "axios";


const actLikeToggle = createAsyncThunk("/wisheList/actLikeToggle" , async(id:number, thunkAPI) => {
    const {rejectWithValue , signal , getState} = thunkAPI;
    const {auth} = getState() as RootState; 
   try{
    const isRecorsExist = await axios.get(`/wishList?userId=${auth.user?.id}&productId=${id}`);

    if(isRecorsExist.data.length > 0){
        const deleteId = isRecorsExist.data[0].id;
        await axios.delete(`/wishList/${deleteId}`);
        return {type:"remove" , id}
    }else {
        await axios.post(`/wishList`, { userId : auth.user?.id, productId : id}, {signal});
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


