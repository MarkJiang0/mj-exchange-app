import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import CustomIcon from '../components/CustomIcon'
import { COLORS } from '../theme/theme';
import { BlurView } from 'expo-blur';
import MarketDetailScreen from '@/screens/Exchange/MarketDetailScreen';
import MarkrtScreen from '@/screens/Exchange/MarkrtScreen';


const tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <tab.Navigator 
      screenOptions={{
        headerShown: false, 
        tabBarHideOnKeyboard: true, 
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView intensity={15} style={styles.BlurViewStyles}/>
        )
      }}>
      <tab.Screen 
        name='Home' 
        component={MarkrtScreen} 
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></tab.Screen>
      <tab.Screen 
        name='Cart' 
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></tab.Screen>
      <tab.Screen 
        name='Favorite' 
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></tab.Screen>
      <tab.Screen 
        name='History' 
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon name='bell' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></tab.Screen>
    </tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0, 
    borderTopColor: 'transparent'
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})