import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import Search from './Search';
import Settings from './Settings';
import NavBar from './NavBar';
import Chat from './Chat';
import { useNavigation } from '@react-navigation/native';

const MainContent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'search', title: 'Search', pic: require('../../assets/search.png') },
    { key: 'chat', title: 'Chat', pic: require('../../assets/chat.png')},
    { key: 'history', title: 'History', pic: require('../../assets/history.png')},
    { key: 'settings', title: 'Settings', pic: require('../../assets/settings.png') },
  ]);
  const [reset, setReset] = useState(false);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'search':
        return <Search />;
      case 'chat':
        return <Chat />;
      case 'history':
        return <Chat />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      renderLabel={({ route, focused }) => (
        // <Text style={focused ? styles.tabLabelFocused : styles.tabLabel}>
        //   {route.title}
        // </Text>
        <Image source={route.pic} style={{width: 30, height: 30}}/>
        
      )}
    />
  );

  const handleTabPress = (index) => {
    setIndex(index);
    setTabIndex(index);
  };

  return (
    <>
      <NavBar />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleTabPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  indicator: {
    backgroundColor: '#bba0c3', // Your desired indicator color
  },
  tabLabel: {
    fontSize: 16,
    color: 'gray', // Your desired inactive tab text color
  },
  tabLabelFocused: {
    fontSize: 16,
    color: 'black', // Your desired active tab text color
  },
});

export default MainContent;
