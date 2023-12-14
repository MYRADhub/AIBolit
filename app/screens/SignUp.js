import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebaseApp from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export default function SignUpScreen() {
  const [clicked, setClicked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setClicked(true);
      if (password !== passwordConfirm) {
        alert("Passwords don't match!");
        setClicked(false);
      } else {
        const formData = {
          name,
          email,
          emailVisibility: false,
          password,
        };

        createUserWithEmailAndPassword(auth, formData['email'], formData['password']).then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const newUserRef = ref(db, 'users/' + user.uid);
          formData['username'] = formData['email'].split('@')[0];
          set(newUserRef, formData);
          // alert(JSON.stringify(user))
          alert('Signed up successfully')
          auth.signOut();
          navigation.navigate('SignIn'); // Navigate to the sign-in screen after successful sign-up
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(JSON.stringify(errorCode))
          alert(JSON.stringify(errorMessage))
          alert('error')
        });
      }
    } catch (e) {
      setClicked(false);
      alert(e.message);
      alert(e.stack)
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Sign up</Text>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="Email Address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
        }}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setPasswordConfirm(text)}
      />
      <Button
        title="Sign Up"
        onPress={handleSubmit}
        disabled={clicked}
        color={'green'}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={{ marginVertical: 10 }}>
          Already have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
