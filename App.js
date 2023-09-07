import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import MapScreen from './src/screens/MapScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import CustomBtnBack from './src/components/CustomBtnBack';

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
                <MainStack.Screen
                    name="MapScreen"
                    component={MapScreen}
                    options={{
                        title: 'Місцезнаходження',
                        headerLeft: () => <CustomBtnBack />,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontFamily: 'Roboto-500',
                            fontSize: 17,
                            letterSpacing: -0.408,
                            color: '#212121',
                        },
                        headerStyle: {
                            boxShadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)',
                            backgroundColor: '#ffffff',
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#b3b3b3',
                        },
                    }}
                />
                <MainStack.Screen
                    name="CommentsScreen"
                    component={CommentsScreen}
                    options={{
                        title: 'Коментарі',
                        headerLeft: () => <CustomBtnBack />,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontFamily: 'Roboto-500',
                            fontSize: 17,
                            letterSpacing: -0.408,
                            color: '#212121',
                        },
                        headerStyle: {
                            boxShadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)',
                            backgroundColor: '#ffffff',
                            borderBottomWidth: 0.5,
                            borderBottomColor: '#b3b3b3',
                        },
                    }}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
