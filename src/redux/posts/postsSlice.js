import { createSlice } from '@reduxjs/toolkit';
import { addPostThunk, addLikeThunk, getAllPostsThunk } from './postsThunks';

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
            .addCase(addLikeThunk.fulfilled, (state, { payload }) => {
                const idx = state.posts.findIndex(post => post.id === payload.id);
                state.posts[idx].like = payload.like;
            })
            .addCase(getAllPostsThunk.fulfilled, (state, action) => {
                state.posts = action.payload;
            });
    },
});

export const postsReducer = postsSlice.reducer;
