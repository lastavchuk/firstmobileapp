import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgComment from '../assets/images/comment.svg';
import SvgLike from '../assets/images/like.svg';
import SvgMap from '../assets/images/map.svg';

function getColor(count) {
    return !count ? '#bdbdbd' : '#ff6c00';
}
function getColorSoc(count) {
    return !count ? '#bdbdbd' : '#212121';
}

function getFill(count) {
    return !count ? '#ffffff' : '#ff6c00';
}

export default function PostItem({ data }) {
    const {
        img,
        title,
        position: { location, coords },
        comments,
        like,
    } = data;

    const navigation = useNavigation();

    return (
        <View style={styles.postItem}>
            <View style={styles.userWrapper}>
                <Image style={styles.postImg} resizeMode="cover" source={{ uri: img }} />
                <Text style={styles.postHeader}>{title}</Text>
            </View>

            <View style={styles.postWrapper}>
                <View style={styles.box}>
                    <Pressable
                        style={styles.box}
                        onPress={() => navigation.navigate('CommentsScreen')}
                    >
                        <SvgComment
                            fill={getFill(comments.length)}
                            style={{ color: getColor(comments.length) }}
                        />
                        <Text style={[styles.postText, { color: getColorSoc(comments.length) }]}>
                            {comments.length}
                        </Text>
                    </Pressable>

                    <SvgLike
                        fill="#ffffff"
                        style={{
                            color: getColor(like),
                            marginLeft: 16,
                        }}
                    />
                    <Text style={[styles.postText, { color: getColorSoc(like) }]}>{like}</Text>
                </View>

                <Pressable
                    style={[styles.box, { marginLeft: 16 }]}
                    onPress={() => navigation.navigate('MapScreen', { location, coords })}
                >
                    <SvgMap fill="#ffffff" style={{ color: '#bdbdbd' }} />
                    <Text style={styles.postTextAddress} ellipsizeMode="middle" numberOfLines={1}>
                        {location}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postItem: { marginBottom: 34 },
    userWrapper: {},
    postImg: {
        width: '100%',
        height: 240,
        borderRadius: 8,
        backgroundColor: '#e8e8e8',
    },
    postHeader: {
        marginVertical: 8,
        color: '#212121',
        fontFamily: 'Roboto-500',
        fontSize: 16,
    },
    postWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    box: { flexDirection: 'row' },
    postText: {
        marginLeft: 6,
        fontFamily: 'Roboto-400',
        fontSize: 16,
    },
    postTextAddress: {
        color: '#212121',
        fontFamily: 'Roboto-400',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
