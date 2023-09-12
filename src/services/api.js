import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'toastify-react-native';

import { auth, db, storage } from '../../config';

//=== User ===
export async function registerUser({ login, email, password, photo }) {
    const isRegisteredUser = await createUserWithEmailAndPassword(auth, email, password)
        .then(() => true)
        .catch(error => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    Toast.error('Користувач з цією електронною адресою вже зареєстрований');
                    break;
                case 'auth/too-many-requests':
                    Toast.error('Кількість запитів перевищує максимально допустиму!');
                    break;
                default:
                    Toast.error('Щось пішло не так. Спробуйте ще раз!');
                    break;
            }
        });

    if (isRegisteredUser) {
        const url = await savePhotoToDB(photo, 'avatars');

        await updateProfile(auth.currentUser, {
            displayName: login,
            photoURL: url,
        });

        return {
            uId: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        };
    }

    throw 'error';
}

export function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            resolve(xhr.response);
        };

        xhr.onerror = function () {
            reject(new Error('uriToBlob failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
}

export async function savePhotoToDB(photo, type = 'postImages') {
    const bytes = await uriToBlob(photo);
    await uploadBytes(ref(storage, `${type}/${bytes._data.blobId}`), bytes).catch(error => {
        console.log(error);
    });

    return await getDownloadURL(ref(storage, `${type}/${bytes._data.blobId}`));
}

export async function loginUser({ email, password }) {
    const isLoggedUser = await signInWithEmailAndPassword(auth, email, password)
        .then(() => true)
        .catch(error => {
            switch (error.code) {
                case 'auth/user-not-found':
                    Toast.error('Пошту або пароль введено не вірно!');
                    break;
                case 'auth/invalid-password':
                    Toast.error('Пошту або пароль введено не вірно!');
                    break;
                case 'auth/wrong-password':
                    Toast.error('Пошту або пароль введено не вірно!');
                    break;
                case 'auth/too-many-requests':
                    Toast.error('Кількість запитів перевищує максимально допустиму!');
                    break;
                default:
                    Toast.error('Щось пішло не так. Спробуйте ще раз!');
                    break;
            }
        });

    if (isLoggedUser) {
        return {
            uId: auth.currentUser.uid,
            email: auth.currentUser.email,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        };
    }
    throw 'error';
}

export async function logOutUser() {
    signOut(auth)
        .then(() => {
            Toast.info('Надіємось на швидке повернення!');
        })
        .catch(error => {
            Toast.error(error);
        });
}

//=== Transactions ===
export const writePostToFirestore = async ({
    uId,
    img,
    title,
    location,
    coords,
    comments = [],
    like = 0,
}) => {
    try {
        const imgURL = await savePhotoToDB(img, 'postImages');
        if (!!imgURL) {
            const { id } = await addDoc(collection(db, 'posts'), {
                uId,
                img: imgURL,
                title,
                position: { location, coords },
                comments,
                like,
            });

            return { id, img: imgURL, title, position: { location, coords }, comments, like };
        } else throw 'Error to upload a file!';
    } catch (error) {
        Toast.info('Сталася помилка при додаванні посту! Спробуйте пізніше');
        throw error;
    }
};

export const getAllPostsUserFromFirestore = async uId => {
    try {
        const q = query(collection(db, 'posts'), where('uId', '==', uId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        Toast.info('Сталася помилка при отриманні постів! Спробуйте пізніше');
        throw error;
    }
};

export async function pickPhoto(aspect = [1, 1], quality = 0.7) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect,
        quality,
    });

    if (!result.canceled) {
        return result.assets[0].uri;
    }
}
