import { createAsyncThunk } from '@reduxjs/toolkit';
import { writePostToFirestore, getAllPostsUserFromFirestore } from '../../services/api';

export const getAllPostsThunk = createAsyncThunk(
    'posts/getAllPostsThunk',
    async (uId, thunkAPI) => {
        try {
            return await getAllPostsUserFromFirestore(uId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addPostThunk = createAsyncThunk('posts/addPostThunk', async (post, thunkAPI) => {
    try {
        return await writePostToFirestore(post);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addLikeThunk = createAsyncThunk('posts/addLikeThunk', async (post, thunkAPI) => {
    try {
        return await writePostToFirestore(post);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
