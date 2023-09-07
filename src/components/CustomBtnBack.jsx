import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgBack from '../assets/images/left.svg';

export default function CustomBtnBack() {
    const navigation = useNavigation();

    return (
        <Pressable style={{ marginLeft: 16 }} onPress={() => navigation.navigate('PostsScreen')}>
            <SvgBack />
        </Pressable>
    );
}
