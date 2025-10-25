import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";



type TformDataType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const actAuthRegister = createAsyncThunk("/auth/register" , async(formData: TformDataType, thunkAPi) => {
const {rejectWithValue}= thunkAPi;

try{
    const response = await axios.post("/register", formData);
    return response.data;
}catch(error){
    return rejectWithValue(axiosErrorHandler(error));
}

});

export type { TformDataType as TformDataType };

export default actAuthRegister;