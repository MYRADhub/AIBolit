import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Sign from '../components/Sign';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../firebase';

const authent = getAuth(firebaseApp);

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const authData = await authent.currentUser;
      if (authData) {
        setIsLoggedIn(true);
        // alert('Logged in')
        // alert(JSON.stringify(authData));
        navigation.navigate('Content');
      }
      else { 
        setIsLoggedIn(false);
        // alert('Not logged in')
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Sign />
    </View>
  );
}
