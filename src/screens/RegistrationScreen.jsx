import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    ImageBackground,
    Text,
    View,
    Image,
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import { registerUserThunk } from '../redux/auth/userThunks';

import SvgAdd from '../assets/images/add.svg';
import SvgDel from '../assets/images/del.svg';
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn/';
import { pickPhoto } from '../services/api';

export default function RegistrationScreen() {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');

    const [isFocusLogin, setFocusLogin] = useState(false);
    const [isFocusEmail, setFocusEmail] = useState(false);
    const [isFocusPassword, setFocusPassword] = useState(false);
    const [isPasswordHide, setPasswordHide] = useState(true);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function onRegister() {
        if (!!login && !!email && !!password) {
            dispatch(registerUserThunk({ login, email, password, photo }));
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require('../assets/images/bg-img.jpg')}
                resizeMode="cover"
                style={styles.imgBg}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'padding' : ''}
                    keyboardVerticalOffset={-140}
                >
                    <View style={styles.container}>
                        <View style={styles.photo}>
                            {!photo ? (
                                <Pressable
                                    style={styles.svgBtn}
                                    onPress={async () => {
                                        setPhoto(await pickPhoto());
                                    }}
                                >
                                    <SvgAdd />
                                </Pressable>
                            ) : (
                                <>
                                    <Image source={{ uri: photo }} style={styles.photoImg} />
                                    <Pressable style={styles.svgBtn} onPress={() => setPhoto(null)}>
                                        <SvgDel />
                                    </Pressable>
                                </>
                            )}
                        </View>

                        <Text style={styles.header}>Реєстрація</Text>
                        <CustomInput
                            autoFocus
                            value={login}
                            placeholder="Логін"
                            autoComplete="name"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            isFocus={isFocusLogin}
                            onSubmitEditing={() => emailInput.focus()}
                            onChangeText={setLogin}
                            onFocus={() => setFocusLogin(true)}
                            onBlur={() => setFocusLogin(false)}
                        />
                        <CustomInput
                            value={email}
                            placeholder="Адреса електронної пошти"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            caretHidden={false}
                            autoComplete="email"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            isFocus={isFocusEmail}
                            onRef={input => (emailInput = input)}
                            onSubmitEditing={() => passwordInput.focus()}
                            onChangeText={setEmail}
                            onFocus={() => setFocusEmail(true)}
                            onBlur={() => setFocusEmail(false)}
                        />

                        <View style={styles.wrapperPass}>
                            <CustomInput
                                value={password}
                                placeholder="Пароль"
                                secureTextEntry={isPasswordHide}
                                autoComplete="password"
                                returnKeyType="done"
                                isFocus={isFocusPassword}
                                onRef={input => (passwordInput = input)}
                                onSubmitEditing={onRegister}
                                onChangeText={setPassword}
                                onFocus={() => setFocusPassword(true)}
                                onBlur={() => setFocusPassword(false)}
                            />
                            <Pressable
                                onPress={() => setPasswordHide(!isPasswordHide)}
                                style={styles.showPass}
                            >
                                <Text style={styles.showPassText}>
                                    {isPasswordHide ? 'Показати' : 'Приховати'}
                                </Text>
                            </Pressable>
                        </View>
                        <CustomBtn onPress={onRegister}>
                            <Text style={styles.textBtn}>Зареєстуватися</Text>
                        </CustomBtn>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.textLink}>Вже є акаунт? </Text>
                            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                                <Text
                                    style={[styles.textLink, { textDecorationLine: 'underline' }]}
                                >
                                    Увійти
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    imgBg: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        gap: 16,
        height: 550,
        paddingTop: 92,
        paddingHorizontal: 16,
        paddingBottom: 78,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    photo: {
        position: 'absolute',
        top: -60,
        left: Dimensions.get('window').width / 2 - 60,
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#f6f6f6',
    },
    photoImg: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    svgBtn: {
        position: 'absolute',
        bottom: 14,
        right: -12,
    },
    header: {
        marginBottom: 33,
        color: '#212121',
        fontFamily: 'Roboto-500',
        textAlign: 'center',
        fontSize: 30,
        letterSpacing: 0.3,
    },
    wrapperPass: {
        marginBottom: 27, //43-16 gap
    },
    textBtn: {
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Roboto-400',
        fontSize: 16,
    },
    textLink: {
        fontFamily: 'Roboto-400',
        fontSize: 16,
        textAlign: 'center',
        color: '#1b4371',
    },
    showPass: { position: 'absolute', right: 16, top: 15 },
    showPassText: { color: '#1B4371', fontFamily: 'Roboto-400', fontSize: 16 },
});
