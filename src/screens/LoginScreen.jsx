import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    ImageBackground,
    Text,
    View,
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomBtn from '../components/CustomBtn/';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusEmail, setFocusEmail] = useState(false);
    const [isFocusPassword, setFocusPassword] = useState(false);
    const [isPasswordHide, setPasswordHide] = useState(true);

    const navigation = useNavigation();

    function onLogin() {
        if (!!email && !!password) {
            console.log(`email: ${email}, password: ${password}`);
            navigation.navigate('HomeScreen');
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
                    keyboardVerticalOffset={-130}
                >
                    <View style={styles.container}>
                        <Text style={styles.header}>Увійти</Text>
                        <CustomInput
                            autoFocus
                            value={email}
                            placeholder="Адреса електронної пошти"
                            keyboardType="email-address"
                            caretHidden={false}
                            autoComplete="email"
                            returnKeyType="next"
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            isFocus={isFocusEmail}
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
                                onRef={input => (passwordInput = input)}
                                isFocus={isFocusPassword}
                                onSubmitEditing={onLogin}
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
                        <CustomBtn onPress={onLogin}>
                            <Text style={styles.textBtn}>Увійти</Text>
                        </CustomBtn>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={styles.textLink}>Немає акаунту? </Text>
                            <Pressable onPress={() => navigation.navigate('RegistrationScreen')}>
                                <Text
                                    style={[styles.textLink, { textDecorationLine: 'underline' }]}
                                >
                                    Зареєструватися
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
        height: 490,
        paddingTop: 92,
        paddingHorizontal: 16,
        paddingBottom: 78,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
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
