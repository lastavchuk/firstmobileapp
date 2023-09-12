import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyA_9llaz5KeblRfKlsNDk5aqgOHLWzqiLE',
    authDomain: 'firstmobileapp-f8142.firebaseapp.com',
    projectId: 'firstmobileapp-f8142',
    storageBucket: 'firstmobileapp-f8142.appspot.com',
    messagingSenderId: '314529831648',
    appId: '1:314529831648:web:cf747cd07a53a314450e85',
    measurementId: 'G-J8RQZMHSK5',
    storageBucket: 'firstmobileapp-f8142.appspot.com',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
// export const storageRef = ref(storage);
