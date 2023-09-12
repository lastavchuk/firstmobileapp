import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { userReducer } from './auth/userSlice';
import { postsReducer } from './posts/postsSlice';

const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
};

const store = configureStore({
    reducer: {
        user: persistReducer(userPersistConfig, userReducer),
        posts: postsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export default { store, persistor };
