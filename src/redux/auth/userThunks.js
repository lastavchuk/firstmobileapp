import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logOutUser, registerUser } from '../../services/api';

export const registerUserThunk = createAsyncThunk(
    'user/registerUserThunk',
    async (userData, thunkAPI) => {
        try {
            return await registerUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUserThunk = createAsyncThunk(
    'user/loginUserThunk',
    async (userData, thunkAPI) => {
        try {
            return await loginUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const logOutUserThunk = createAsyncThunk('user/logOutUserThunk', async (_, thunkAPI) => {
    try {
        return await logOutUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
