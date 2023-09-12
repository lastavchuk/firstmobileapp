import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { Text, Dimensions } from 'react-native';

import store from './src/redux/store';
import AppNavigation from './AppNavigation';
import ToastManager from 'toastify-react-native';

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto-700': require('./src/assets/fonts/Roboto-Bold.ttf'),
        'Roboto-500': require('./src/assets/fonts/Roboto-Medium.ttf'),
        'Roboto-400': require('./src/assets/fonts/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store.store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={store.persistor}>
                <AppNavigation />
                <ToastManager
                    width={Dimensions.get('window').width - 32}
                    height={100}
                    position="top"
                    style={{ paddingHorizontal: 5 }}
                />
            </PersistGate>
        </Provider>
    );
}
