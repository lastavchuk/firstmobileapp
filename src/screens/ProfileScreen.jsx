import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    FlatList,
    Pressable,
} from 'react-native';

import SvgDel from '../assets/images/del.svg';
import SvgLogOut from '../assets/images/logout.svg';

import PostItem from '../components/PostItem';
import { logOutUserThunk } from '../redux/auth/userThunks';
import { selectPosts, selectUserData } from '../redux/selectors';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const allPosts = useSelector(selectPosts);

    return (
        <ImageBackground
            source={require('../assets/images/bg-img.jpg')}
            resizeMode="cover"
            style={styles.imgBg}
        >
            <View style={styles.container}>
                <View style={styles.photo}>
                    <Image
                        style={{ width: 120, height: 120 }}
                        source={{ uri: userData.photoURL }}
                    />
                    <SvgDel style={styles.svgBtnDel} />
                </View>
                <Pressable style={styles.svgBtnLogOut} onPress={() => dispatch(logOutUserThunk())}>
                    <SvgLogOut />
                </Pressable>

                <Text style={styles.header}>{userData.displayName}</Text>
                <FlatList
                    data={allPosts}
                    renderItem={({ item }) => <PostItem data={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imgBg: {
        flex: 1,
    },
    container: {
        flex: 1,
        height: '100%',
        marginTop: 220,
        paddingTop: 92,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    photo: {
        position: 'absolute',
        top: -60,
        left: Dimensions.get('window').width / 2 - 60,
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#f6f6f6',
    },
    svgBtnDel: {
        position: 'absolute',
        bottom: 14,
        right: -12,
    },
    svgBtnLogOut: {
        position: 'absolute',
        top: 22,
        right: 16,
    },
    header: {
        marginBottom: 32,
        color: '#212121',
        textAlign: 'center',
        fontFamily: 'Roboto-500',
        fontSize: 30,
        letterSpacing: 0.3,
    },
});
