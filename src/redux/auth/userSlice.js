import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, logOutUserThunk, registerUserThunk } from './userThunks';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        isAuth: false,
    },
    extraReducers: builder => {
        builder
            .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
                state.userData = payload;
                state.isAuth = true;
            })
            .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
                state.userData = payload;
                state.isAuth = true;
            })
            .addCase(logOutUserThunk.fulfilled, (state, _) => {
                state.userData = null;
                state.isAuth = false;
            });
    },
});

export const userReducer = userSlice.reducer;
