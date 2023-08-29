import { StyleSheet, TextInput } from 'react-native';

export default function CustomInput(props) {
    const { isFocus, onRef, setOnFocus } = props;

    return (
        <TextInput
            style={styles.textInput}
            borderColor={isFocus ? '#ff6c00' : '#e8e8e8'}
            backgroundColor={isFocus ? '#ffffff' : '#f6f6f6'}
            placeholderTextColor="#bdbdbd"
            cursorColor="#aaa"
            ref={onRef}
            onFocus={setOnFocus}
            onBlur={setOnFocus}
            {...props}
        />
    );
}
const styles = StyleSheet.create({
    textInput: {
        height: 50,
        padding: 16,

        fontFamily: 'Roboto-400',
        fontSize: 16,
        color: '#212121',

        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
    },
});
