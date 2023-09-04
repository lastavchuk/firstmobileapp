import { useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Keyboard,
    Pressable,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native';

import SvgCamera from '../assets/images/camera.svg';
import SvgMap from '../assets/images/map.svg';
import SvgDelPost from '../assets/images/del-post.svg';
import CustomBtn from '../components/CustomBtn';

export default function CreatePostsScreen() {
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');

    const isActive = !!photo && !!title && !!location;

    function onPublish() {
        if (isActive) {
            console.log(`${photo}, ${title}, ${location}`);
        }
    }

    function onDelete() {
        setPhoto('');
        setTitle('');
        setLocation('');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.wrapperCamera}>
                        <View style={styles.camera}>
                            <Pressable
                                style={styles.cameraContainer}
                                onPress={() => setPhoto('Take a picture')}
                            >
                                <SvgCamera style={styles.cameraIcon} />
                            </Pressable>
                        </View>

                        <Text style={styles.text}>Завантажте фото</Text>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                        style={{ marginBottom: 32 }}
                    >
                        <View style={styles.wrapperInput}>
                            <TextInput
                                style={styles.textInput}
                                value={title}
                                placeholder="Назва..."
                                returnKeyType="next"
                                cursorColor="#ff6c00"
                                placeholderTextColor="#bdbdbd"
                                blurOnSubmit={false}
                                onChangeText={setTitle}
                                onSubmitEditing={() => locationInput.focus()}
                            />
                            <View>
                                <TextInput
                                    style={[
                                        styles.textInput,
                                        { paddingLeft: 28 },
                                    ]}
                                    value={location}
                                    placeholder="Місцевість..."
                                    returnKeyType="done"
                                    cursorColor="#ff6c00"
                                    placeholderTextColor="#bdbdbd"
                                    onChangeText={setLocation}
                                    ref={input => (locationInput = input)}
                                    // onSubmitEditing={onPublish}
                                />
                                <SvgMap style={styles.icon} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <CustomBtn
                        type={isActive ? 'Primary' : 'Secondary'}
                        onPress={onPublish}
                    >
                        <Text
                            style={[
                                styles.textBtn,
                                { color: isActive ? '#ffffff' : '#bdbdbd' },
                            ]}
                        >
                            Опубліковати
                        </Text>
                    </CustomBtn>
                </ScrollView>
                <View style={styles.wrapperBtn}>
                    <CustomBtn type="DelPost" onPress={() => onDelete()}>
                        <SvgDelPost />
                    </CustomBtn>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 32,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    wrapperCamera: {
        marginBottom: 32,
    },
    wrapperInput: {
        rowGap: 16,
    },
    camera: {
        height: 240,
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        marginBottom: 8,
    },
    cameraContainer: {
        padding: 18,
        borderRadius: 30,

        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -30 }, { translateY: -30 }],

        backgroundColor: '#ffffff',
    },
    textInput: {
        paddingVertical: 16,
        color: '#212121',
        fontFamily: 'Roboto-400',
        fontSize: 16,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
    },
    textBtn: {
        textAlign: 'center',
        fontFamily: 'Roboto-400',
        fontSize: 16,
    },
    text: { color: '#BDBDBD', fontFamily: 'Roboto-400', fontSize: 16 },
    icon: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    wrapperBtn: {
        alignItems: 'center',
    },
});
