import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function MapScreen() {
    const navigation = useNavigation();

    const {
        params: { location, coords },
    } = useRoute();

    let coordsNew;
    if (!coords) {
        coordsNew = { latitude: 47.8497349, longitude: 20.6225333 };
    } else {
        coordsNew = { latitude: coords[0], longitude: coords[1] };
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: coordsNew.latitude,
                    longitude: coordsNew.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType="standard"
                // minZoomLevel={10}
            >
                <Marker
                    title={
                        !!coords ? 'Ви знаходитесь тут' : 'Не вдалось визначити ваше розташування'
                    }
                    coordinate={{ latitude: coordsNew.latitude, longitude: coordsNew.longitude }}
                    description={!!location ? location : null}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
