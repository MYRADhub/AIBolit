import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('Home');
    };

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/wallpaper.png')} />
            </View>
        </TouchableOpacity>
    );
};

export default Welcome;
