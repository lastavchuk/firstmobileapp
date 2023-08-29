import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
// import PostsScreen from './src/screens/PostsScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
    // const fontStyles = ['normal', 'italic'];
    const [fontsLoaded] = useFonts({
        'Roboto-700': require('./src/assets/fonts/Roboto-Bold.ttf'),
        'Roboto-500': require('./src/assets/fonts/Roboto-Medium.ttf'),
        'Roboto-400': require('./src/assets/fonts/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <LoginScreen />
            {/* <RegistrationScreen /> */}
            {/* <PostsScreen /> */}

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Roboto-400',
        justifyContent: 'center',
    },
});
