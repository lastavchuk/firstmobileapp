import { StyleSheet, View, Text, Image } from 'react-native';
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
    const { img, title, address, comment, like } = data;
    const tmp = '../assets/images/tmp-post.jpg'; //!!!!!!!!!!!!!!!!!

    return (
        <View style={styles.postItem}>
            <View style={styles.userWrapper}>
                <Image
                    style={styles.postImg}
                    resizeMode="cover"
                    // source={require(img)}
                    source={require(tmp)}
                />
                <Text style={styles.postHeader}>{title}</Text>
            </View>

            <View style={styles.postWrapper}>
                <View style={styles.box}>
                    <SvgComment
                        fill={getFill(comment)}
                        style={{ color: getColor(comment) }}
                    />
                    <Text
                        style={[
                            styles.postText,
                            { color: getColorSoc(comment) },
                        ]}
                    >
                        {comment}
                    </Text>

                    <SvgLike
                        fill="#ffffff"
                        style={{
                            color: getColor(like),
                            marginLeft: 16,
                        }}
                    />
                    <Text
                        style={[styles.postText, { color: getColorSoc(like) }]}
                    >
                        {like}
                    </Text>
                </View>

                <View style={[styles.box, { marginLeft: 16 }]}>
                    <SvgMap fill="#ffffff" style={{ color: '#bdbdbd' }} />
                    <Text
                        style={styles.postTextAddress}
                        ellipsizeMode="middle"
                        numberOfLines={1}
                    >
                        {address}
                    </Text>
                </View>
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
