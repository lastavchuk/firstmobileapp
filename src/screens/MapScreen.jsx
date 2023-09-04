import { StyleSheet, Text } from 'react-native';

export default function MapScreen() {
    return <Text style={styles.container}>MapScreen</Text>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
});
