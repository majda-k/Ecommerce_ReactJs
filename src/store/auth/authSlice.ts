
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import { isString } from "../../types/guards";
import actAuthLogin from "./act/actAuthLogin";


interface Auth {
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    } | null;
    accessToken: string | null;
    loading: "idle" | "pending" | "succeeded" | "failed",
    error: null | string,

}

const initialState: Auth = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,


}

    const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            resetUi: (state) => {
                state.loading = "idle";
                state.error = null;
            },
            actAuthLogout: (state) => {
                state.accessToken = null;
                state.user = null;
            }

        },
        extraReducers: (builder) => {
            builder.addCase(actAuthRegister.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            });
            builder.addCase(actAuthRegister.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
            });
            builder.addCase(actAuthRegister.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            });


            builder.addCase(actAuthLogin.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            });
            builder.addCase(actAuthLogin.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;
            });
            builder.addCase(actAuthLogin.rejected, (state, action) => {
                state.loading = "failed";
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            });

        },

    })


export const { resetUi , actAuthLogout  } = authSlice.actions;
export default authSlice.reducer;