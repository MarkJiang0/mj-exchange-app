import { COLORS, FONTSIZE, SPACING } from '@/theme/theme'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import { Platform, Pressable, SafeAreaView, ScrollView } from 'react-native'
import styled, { css } from 'styled-components/native'
import Constants from 'expo-constants'
import FlexRow from '@/components/Box/FlexRow'
import { Box } from '@/components/Box'
import GradientBGIcon from '@/components/GradientBGIcon'
import { Text } from 'react-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import useStore from '@/store/exchange/useStore'
import { AndroidChartWebView, IOSChartWebView } from '@/components/Exchange/TradingViewChart'
import OrderForm from '@/components/Exchange/OrderForm'
import TradeOrderBook from '@/components/Exchange/TradeOrderBook'

const DEFAULT_COIN_THUMB = {
  symbol: '',
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  chg: 0,
  change: 0,
  volume: 0,
  turnover: 0,
  lastDayClose: 0,
  usdRate: 0,
  baseUsdRate: 0
}

const CoinTradeScreen = ({navigation, route}: BottomTabScreenProps<any, any, string>) => {
  const {symbolThumbMap} = useStore(state => state.symbolThumb)

  const symbolThumb = useMemo(() => {
    if (route.params && route.params.symbol) {
      return symbolThumbMap[route.params.symbol]
    }
    return DEFAULT_COIN_THUMB
  }, [symbolThumbMap, route.params])

  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style='light'/>
      <SafeAreaView style={{marginTop: Constants.statusBarHeight}}></SafeAreaView>

      <FlexRow justifyContent={'space-between'} 
        alignItems={'center'} 
        padding={SPACING.space_10}
        borderBottomColor={'#252931'} borderBottomStyle={'solid'} borderBottomWidth={1}>
        <FlexRow alignItems={'center'}>
          <Box>
            <Pressable onPress={() => navigation.goBack()}>
              <GradientBGIcon 
                name="left"
                color={'#FFFFFF'}
                size={FONTSIZE.size_16}/>
            </Pressable>
          </Box>
          <Box paddingLeft={'10px'}>
            <SymbolText>{route.params?.symbol}</SymbolText>
          </Box>
          <Box paddingLeft={'10px'}>
            <SymbolChgPerText $isInc={symbolThumb.close > symbolThumb.open}>{`${(symbolThumb?.chg * 100).toFixed(2)}%`}</SymbolChgPerText>
          </Box>
        </FlexRow>
        
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
          {Platform.OS === 'ios' ? <IOSChartWebView mode='SIMPLE' uri='http://192.168.0.106:3000/tradingview2'/> : <AndroidChartWebView />}

          <FlexRow height={'400px'} overflow={'hidden'}>
            <OrderForm direction={route.params?.direction} />
            <TradeOrderBook symbol={route.params?.symbol} price={symbolThumb.close}/>
          </FlexRow>          
      </ScrollView>
      
      
    </Container>
  )
}
 
export default CoinTradeScreen

const Container = styled.View`
  flex: 1;
  background-color: #0C0F14
`

const SymbolText = styled.Text`
  color: white;
  font-size: 24px;
`

const SymbolChgPerText = styled.Text<{$isInc: boolean}>`
  
  font-size: 14px;
  ${(props) => {
    if (props.$isInc === undefined) {
      return css`color: rgb(234, 236, 239);`
    }
    return props.$isInc ? css`color: rgb(14, 203, 129);` : css`color: rgb(246, 70, 93);`
  }}
`