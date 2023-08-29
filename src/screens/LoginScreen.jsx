import { useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Text,
    View,
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton/';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusEmail, setFocusEmail] = useState(false);
    const [isFocusPassword, setFocusPassword] = useState(false);
    const [isPasswordHide, setPasswordHide] = useState(true);

    function onLogin() {
        if (!!email && !!password) {
            console.log(`email: ${email}, password: ${password}`);
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
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
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
                            blurOnSubmit={false}
                            isFocus={isFocusEmail}
                            onSubmitEditing={() => passwordRef.focus()}
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
                                onRef={input => (passwordRef = input)}
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
                        <CustomButton onPress={onLogin}>
                            <Text style={styles.textBtn}>Зареєстуватися</Text>
                        </CustomButton>
                        <Text style={styles.textLink}>
                            Немає акаунту? Зареєструватися
                        </Text>
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
