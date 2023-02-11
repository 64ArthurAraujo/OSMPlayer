import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { systemNavBarColor } from '../util/native-wrappers';
import Colors from '../util/colors';
import NavigationTabBar from './NavigationTabBar';
import HomeScreen from './tabs/Home/HomeScreen';
import { StatusBar } from 'react-native';
import LibraryScreen from './tabs/Library/LibraryScreen';
import FoldersScreen from './tabs/Folders/FoldersScreen';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.black.light,
  },
};

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }) {
  systemNavBarColor(Colors.black.darker);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent from going back to account setup
      e.preventDefault();
    });
  });

  return (
    <NavigationContainer theme={navTheme} independent={true}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.black.light} />
      <Tab.Navigator
        initialRouteName='Home'
        tabBar={(props) => <NavigationTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name='Library' component={LibraryScreen} />
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Folders' component={FoldersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
