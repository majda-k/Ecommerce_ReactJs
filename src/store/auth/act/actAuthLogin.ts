import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
    email: string;
    password: string;
}

type Tresponse = {
    accessToken: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }
}





const actAuthLogin = createAsyncThunk("/auth/login", async (formData: TFormData, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.post<Tresponse>("/login", formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }

})


export type { TFormData , Tresponse };
export default actAuthLogin;