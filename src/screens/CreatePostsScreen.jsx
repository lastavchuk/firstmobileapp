import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Keyboard,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';

import { selectUserData } from '../redux/selectors';
import { addPostThunk } from '../redux/posts/postsThunks';

import { Toast } from 'toastify-react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';

import SvgCamera from '../assets/images/camera.svg';
import SvgMap from '../assets/images/map.svg';
import SvgDelPost from '../assets/images/del-post.svg';
import SvgCameraFlip from '../assets/images/camera-flip.svg';
import CustomBtn from '../components/CustomBtn';
import { pickPhoto } from '../services/api';

export default function CreatePostsScreen() {
    const [img, setImg] = useState(null);
    const [title, setTitle] = useState(null);
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState(null);

    const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { uId } = useSelector(selectUserData);

    const isActive = !!img && !!title;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermissionCamera(status === 'granted');
        })();

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                await getLocation();
            } else Toast.error('Немає доступу до місцезнаходження');
        })();
    }, []);

    if (hasPermissionCamera === false) {
        return <Text style={styles.container}>Немає доступу до камери</Text>;
    }

    async function getLocation() {
        await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
        })
            .then(position => {
                setCoords([position.coords.latitude, position.coords.longitude]);

                (async () => {
                    const address = await Location.reverseGeocodeAsync({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    if (!!address.length) {
                        setLocation(`${address[0].city}, ${address[0].country}`);
                    }
                })();
            })
            .catch(() =>
                Toast.error(
                    'Запит про місцезнаходження не виконано через невідповідні налаштування пристрою'
                )
            );
    }

    async function onPublish() {
        if (!location) {
            await getLocation();
        }

        if (isActive && location) {
            dispatch(addPostThunk({ uId, img, title, location, coords }));

            onDelete();
            navigation.navigate('PostsScreen');
        } else {
            Toast.info('Заповніть всі поля');
        }
    }

    function onDelete() {
        setImg(null);
        setTitle(null);
        setLocation(null);
        setCoords(null);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.wrapperCamera}>
                        {!!img ? (
                            <View>
                                <Image style={styles.camera} source={{ uri: img }} />

                                <Pressable
                                    style={styles.cameraContainer}
                                    onPress={() => setImg(null)}
                                >
                                    <SvgDelPost />
                                </Pressable>
                            </View>
                        ) : (
                            <Camera style={styles.camera} type={type} ref={setCameraRef}>
                                <Pressable
                                    style={styles.flipContainer}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}
                                >
                                    <View style={styles.cameraFlipIcon}>
                                        <SvgCameraFlip />
                                    </View>
                                </Pressable>

                                <Pressable
                                    style={styles.cameraContainer}
                                    onPress={async () => {
                                        if (cameraRef) {
                                            const { uri } = await cameraRef.takePictureAsync();
                                            await MediaLibrary.createAssetAsync(uri);
                                            setImg(uri);
                                        }
                                    }}
                                >
                                    <SvgCamera />
                                </Pressable>
                            </Camera>
                        )}
                        <Pressable
                            onPress={async () => {
                                setImg(await pickPhoto([4, 3]));
                            }}
                        >
                            <Text style={styles.text}>
                                {!img ? 'Завантажте фото' : 'Редагувати фото'}
                            </Text>
                        </Pressable>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                        style={{ marginBottom: 32 }}
                    >
                        <View style={styles.wrapperInput}>
                            <TextInput
                                style={styles.textInput}
                                value={title}
                                placeholder="Назва..."
                                returnKeyType="next"
                                cursorColor="#ff6c00"
                                placeholderTextColor="#bdbdbd"
                                blurOnSubmit={false}
                                onChangeText={setTitle}
                                onSubmitEditing={() => locationInput.focus()}
                            />
                            <View>
                                <TextInput
                                    style={[styles.textInput, { paddingLeft: 28 }]}
                                    value={location}
                                    placeholder="Місцевість..."
                                    returnKeyType="done"
                                    cursorColor="#ff6c00"
                                    placeholderTextColor="#bdbdbd"
                                    onChangeText={setLocation}
                                    onFocus={() => (!location ? getLocation() : null)}
                                    ref={input => (locationInput = input)}
                                />
                                <Pressable
                                    style={styles.icon}
                                    onPress={() =>
                                        navigation.navigate('MapScreen', { location, coords })
                                    }
                                >
                                    <SvgMap />
                                </Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <CustomBtn type={isActive ? 'Primary' : 'Secondary'} onPress={onPublish}>
                        <Text style={[styles.textBtn, { color: isActive ? '#ffffff' : '#bdbdbd' }]}>
                            Опубліковати
                        </Text>
                    </CustomBtn>
                </ScrollView>
                <View style={styles.wrapperBtn}>
                    <CustomBtn type="DelPost" onPress={() => onDelete()}>
                        <SvgDelPost />
                    </CustomBtn>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    wrapperCamera: {
        marginBottom: 32,
    },
    wrapperInput: {
        rowGap: 16,
    },
    camera: {
        height: 240,
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        marginBottom: 8,
    },
    cameraContainer: {
        padding: 18,
        borderRadius: 30,

        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -30 }, { translateY: -30 }],

        backgroundColor: '#ffffff',
    },
    cameraFlipIcon: {
        padding: 2,
        backgroundColor: '#ffffff',
        borderRadius: 14,
    },
    flipContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    textInput: {
        paddingVertical: 16,
        color: '#212121',
        fontFamily: 'Roboto-400',
        fontSize: 16,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
    },
    textBtn: {
        textAlign: 'center',
        fontFamily: 'Roboto-400',
        fontSize: 16,
    },
    text: { color: '#BDBDBD', fontFamily: 'Roboto-400', fontSize: 16 },
    icon: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    wrapperBtn: {
        alignItems: 'center',
    },
});
