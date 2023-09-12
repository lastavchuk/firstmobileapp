import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { selectUserData } from '../redux/selectors';
import { logOutUserThunk } from '../redux/auth/userThunks';
import { getAllPostsThunk } from '../redux/posts/postsThunks';

import SvgPosts from '../assets/images/grid.svg';
import SvgAddPost from '../assets/images/add-post.svg';
import SvgUser from '../assets/images/user.svg';
import SvgLogOut from '../assets/images/logout.svg';
import CustomBtnBack from '../components/CustomBtnBack';

import PostsScreen from './PostsScreen';
import ProfileScreen from './ProfileScreen';
import CreatePostsScreen from './CreatePostsScreen';
import CustomBtnTab from '../components/CustomBtnTab';

const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
    const navigation = useNavigation();
    const userData = useSelector(selectUserData);

    if (!userData) {
        navigation.navigate('LoginScreen');
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPostsThunk(userData.uId));
    }, []);

    return (
        <Tabs.Navigator
            initialRouteName="PostsScreen"
            backBehavior="history"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#212121',
                    fontFamily: 'Roboto-500',
                    fontSize: 17,
                    letterSpacing: -0.408,
                },
                headerStyle: {
                    boxShadow: '0px 0.5px 0px 0px rgba(0, 0, 0, 0.30)',
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#b3b3b3',
                },

                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 58, // 40 height icon + 9*2 paddingVertical
                    paddingHorizontal: 74,
                    backgroundColor: '#ffffff',
                    boxShadow: '0px -0.5px 0px 0px rgba(0, 0, 0, 0.30)',
                    borderTopWidth: 0.5,
                    borderTopColor: '#b3b3b3',
                },
            }}
        >
            <Tabs.Screen
                name="PostsScreen"
                component={PostsScreen}
                options={{
                    title: 'Публікації',
                    headerRight: () => (
                        <Pressable
                            style={{ marginRight: 16 }}
                            onPress={() => dispatch(logOutUserThunk())}
                        >
                            <SvgLogOut />
                        </Pressable>
                    ),
                    tabBarIcon: ({ focused }) => {
                        return (
                            <CustomBtnTab focused={focused}>
                                <SvgPosts stroke={focused ? '#ffffff' : 'rgba(33, 33, 33, 0.8)'} />
                            </CustomBtnTab>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="CreatePostsScreen"
                component={CreatePostsScreen}
                options={{
                    title: 'Створити публікацію',
                    tabBarStyle: { display: 'none' },
                    headerLeft: () => <CustomBtnBack />,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <CustomBtnTab focused={focused}>
                                <SvgAddPost fill={focused ? '#ffffff' : 'rgba(33, 33, 33, 0.8)'} />
                            </CustomBtnTab>
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    // title: 'Профіль',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <CustomBtnTab focused={focused}>
                                <SvgUser stroke={focused ? '#ffffff' : 'rgba(33, 33, 33, 0.8)'} />
                            </CustomBtnTab>
                        );
                    },
                }}
            />
        </Tabs.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
