import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './util/global-styles';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.otf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={[globalStyles.root]} onLayout={onLayoutRootView}>
        <Stack.Navigator initialRouteName={'Main'}>
          <Stack.Screen
            name='Main'
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
