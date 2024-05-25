import { Box } from '@/components/Box'
import FlexRow from '@/components/Box/FlexRow'
import MarketOrderTab from '@/components/Exchange/MarketOrderTab'
import OrderBookMin from '@/components/Exchange/OrderBook'
import SymbolSummary from '@/components/Exchange/SymbolSummary'
import TradeList from '@/components/Exchange/TradeList'
import { AndroidChartWebView, IOSChartWebView } from '@/components/Exchange/TradingViewChart'
import GradientBGIcon from '@/components/GradientBGIcon'
import { COLORS, FONTSIZE, SPACING } from '@/theme/theme'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Platform, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import styled from 'styled-components/native'

const MarketDetailScreen = ({navigation, route}: BottomTabScreenProps<any, any, string>) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style='light'/>
      <SafeAreaView style={{marginTop: Constants.statusBarHeight}}>
      </SafeAreaView>
      

      <FlexRow justifyContent={'space-between'} 
        alignItems={'center'} 
        padding={SPACING.space_10}
        borderBottomColor={'#252931'} borderBottomStyle={'solid'} borderBottomWidth={1}>
        <Box>
          <Pressable onPress={() => navigation.goBack()}>
            <GradientBGIcon 
              name="left"
              color={'#FFFFFF'}
              size={FONTSIZE.size_16}/>
          </Pressable>
        </Box>
        <Box><Text style={{color: 'white'}}>{route.params?.symbol}</Text></Box>
        <Box>
          <Pressable>
            <GradientBGIcon 
              name="star"
              color={'#FFFFFF'}
              size={FONTSIZE.size_16}/>
          </Pressable>
        </Box>
      </FlexRow>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{flexGrow: 1}}>
        <SymbolSummary symbol={route.params?.symbol as string} />

        {Platform.OS === 'ios' ? <IOSChartWebView uri='http://192.168.0.106:3000/tradingview'/> : <AndroidChartWebView />}

        <MarketOrderTab activeIndex={activeTabIndex} onPress={setActiveTabIndex} />

        {activeTabIndex === 0 ? <OrderBookMin symbol={route.params?.symbol as string} /> : <TradeList symbol={route.params?.symbol as string} />}
      </ScrollView>

      <FlexRow padding={'20px 20px'} justifyContent={'space-between'} alignItems={'center'}>

        <Pressable onPress={() => {
          navigation.push('CoinTrade', {
            symbol: route.params?.symbol,
            direction: 'BUY'
          }) 
        }}>
          <View style={{borderRadius: 20, overflow: 'hidden', backgroundColor: 'rgb(14, 203, 129)', justifyContent:'center', alignItems: 'center'}}>
            <BtnText>Buy</BtnText>
          </View>          
        </Pressable>
        
        <Pressable onPress={() => {
          navigation.push('CoinTrade', {
            symbol: route.params?.symbol,
            direction: 'SELL'
          }) 
        }}>
          <View style={{borderRadius: 20, overflow: 'hidden', backgroundColor: 'rgb(246, 70, 93)', justifyContent:'center', alignItems: 'center'}}>
            <BtnText>Sell</BtnText>
          </View>
        </Pressable>
      </FlexRow>
      
    </Container>
  )
}

export default MarketDetailScreen

const Container = styled.View`
  flex: 1;
  background-color: #0C0F14
`



const BtnText = styled.Text`
  padding: 10px 60px;
  font-size: 20px;
  font-weight: bold;
`


