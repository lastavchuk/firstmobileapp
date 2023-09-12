import { createSlice } from '@reduxjs/toolkit';
import { addPostThunk, getAllPostsThunk } from './postsThunks';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    extraReducers: builder => {
        builder
            .addCase(addPostThunk.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(getAllPostsThunk.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
    },
});

export const postsReducer = postsSlice.reducer;
