import { StyleSheet, Pressable } from 'react-native';

export default function CustomBtn({ type = 'Primary', onPress, children }) {
    return (
        <Pressable
            style={[styles.btn, styles[`btn_${type}`]]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 16,
        borderRadius: 25,
    },
    btn_Primary: {
        backgroundColor: '#ff6c00',
    },
    btn_Secondary: {
        backgroundColor: '#f6f6f6',
    },
    btn_DelPost: {
        width: 70,
        marginVertical: 8,
        paddingVertical: 8,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
    },
});
