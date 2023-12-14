import React from 'react';
import { View, Image, TouchableOpacity, ImageBackground } from 'react-native';

const Welcome = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('Home');
    };

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
            <ImageBackground source={require('../../assets/welcome_page.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default Welcome;
