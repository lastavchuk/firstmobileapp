import { StyleSheet, Text, Pressable } from 'react-native';

export default function CustomButton({ type, onPress, children }) {
    return (
        <Pressable
            style={[styles.button, styles[`button_${type}`]]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 25,
        backgroundColor: '#ff6c00',
    },
    button_ADD: {
        justifyContent: 'center',
        width: 70,
        height: 40,
        borderRadius: 20,
        paddingVertical: 0,
    },
});
