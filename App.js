import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const MainStack = createStackNavigator();

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
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="LoginScreen">
                <MainStack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <MainStack.Screen
                    name="RegistrationScreen"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />

                <MainStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
