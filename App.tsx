import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomIcon from './src/components/CustomIcon';
import { useFonts, loadAsync } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';
import SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import MarketDetailScreen from '@/screens/Exchange/MarketDetailScreen';
import CoinTradeScreen from '@/screens/Exchange/CoinTradeScreen';

const stack = createNativeStackNavigator()

export default function App() {

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    console.log(1111111)
    async function prepare() {
      await loadAsync({
        'IcoMoon': require('./src/assets/fonts/app_icons.ttf'),
        'Poppins-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Light': require('./src/assets/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('./src/assets/fonts/Poppins-Thin.ttf'),
      })
      setAppReady(true)
      // await SplashScreen.hideAsync();
    }
    prepare()
  })

  // const [fontsLoaded] = useFonts({
  //   IcoMoon: require('./src/assets/fonts/app_icons.ttf'),
  // });
  

  if (!appReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name='Tab' component={TabNavigator} options={{animation: 'slide_from_bottom'}}>
        </stack.Screen>
        <stack.Screen name='MarketDetails' component={MarketDetailScreen} options={{animation: 'slide_from_bottom'}}>
        </stack.Screen>
        <stack.Screen name='CoinTrade' component={CoinTradeScreen} options={{animation: 'slide_from_bottom'}}>
        </stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
})
