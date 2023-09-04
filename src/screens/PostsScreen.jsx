import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    Image,
} from 'react-native';
import PostItem from '../components/PostItem';
import POSTS from '../../tmpData.json'; //!!!!!!!!!!!!!

export default function PostsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.user}>
                <Image
                    style={styles.userImg}
                    resizeMode="cover"
                    source={require('../assets/images/tmp-user.png')}
                />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.userName}>Natali Romanova</Text>
                    <Text style={styles.userEmail}>email@example.com</Text>
                </View>
            </View>

            <FlatList
                data={POSTS}
                renderItem={({ item }) => <PostItem data={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    user: {
        flexDirection: 'row',
        marginVertical: 32,
    },
    userImg: {
        width: 60,
        height: 60,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: '#f6f6f6',
    },
    userName: {
        color: '#212121',
        fontFamily: 'Roboto-700',
        fontSize: 13,
    },
    userEmail: {
        color: 'rgba(33, 33, 33, 0.80)',
        fontFamily: 'Roboto-400',
        fontSize: 11,
    },
});
