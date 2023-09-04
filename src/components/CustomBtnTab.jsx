import { StyleSheet, View } from 'react-native';

export default function CustomBtnTab({ focused, children }) {
    return (
        <View
            style={[
                styles.button,
                {
                    backgroundColor: focused ? '#ff6c00' : '#ffffff',
                },
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 40,
        borderRadius: 20,
    },
});
