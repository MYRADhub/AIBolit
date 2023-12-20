import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import firebaseApp from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default function SignInScreen() {
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setClicked(true);
      if (password.length < 8) {
        alert('Minimum password length is 8');
        setClicked(false);
      } else {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // alert(JSON.stringify(user))
          alert('Signed in successfully')
          setClicked(false);
          navigation.navigate('Content'); // Navigate to the home screen after successful sign-in
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          setClicked(false);
        });
      }
    } catch (e) {
      setClicked(false);
      alert(e.message);
      navigation.navigate('Content'); // Navigate to the home screen after successful sign-in
    }
  };
  
  return (
    <ImageBackground source={require('../../assets/login_page.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{
          position: 'absolute',
          top: '58%', // adjust as needed
          left: '30%', // adjust as needed
          width: '80%',
          height: 40,
          borderColor: 'transparent',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="Phone number"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{
          position: 'absolute',
          top: '66.5%', // adjust as needed
          left: '30%', // adjust as needed
          width: '80%',
          height: 40,
          borderColor: 'transparent',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ position: 'absolute', top:'72.7%', left: '43%' }}>
        <Text style={{ marginVertical: 10, color: 'gray' }}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <Button position={'absolute'} top={'80%'} backgroundColor={'#bba0c3'}>
        <Text style={{ color: 'white' }} onPress={handleSubmit}>Log In</Text>
      </Button>
    </ImageBackground>
  );
}
