import { CoinThumb } from '@/services'
import useStore, { State } from '@/store/exchange/useStore'
import { SPACING } from '@/theme/theme'
import React, { useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components/native'
import { Flex } from '../Box'
import FlexRow from '../Box/FlexRow'

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

const SymbolSummary = ({symbol}:{symbol: string}) => {  
  // const symbol = 'btc_usdt'.toString().toUpperCase().replace('_', '/')
  const {symbolThumbMap, fetchSymbolThumbMap} = useStore((state: State) => state.symbolThumb)

  useEffect(() => {
    fetchSymbolThumbMap()
  }, [])

  const symbolThumb: CoinThumb = useMemo(() => {
    const symbolThumbdata = symbol && symbolThumbMap[symbol] ? symbolThumbMap[symbol] : DEFAULT_COIN_THUMB
    
    return symbolThumbdata
  }, [symbol, symbolThumbMap])

  return (

    <FlexRow 
      justifyContent={'space-between'} 
      alignItems={'center'} 
      padding={SPACING.space_10}
      borderBottomColor={'#252931'} 
      borderBottomStyle={'solid'} 
      borderBottomWidth={1}>
      
      <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
        <PriceText>{symbolThumb.close.toFixed(2)}</PriceText>
        <FlexRow>
          <CurrencyPriceText>{symbolThumb.close.toFixed(2)}</CurrencyPriceText>
          <PercentText $isInc={symbolThumb.close > symbolThumb.open}>{`${(symbolThumb.chg * 100).toFixed(2)}%`}</PercentText>
        </FlexRow>
        
      </Flex>


      <FlexRow justifyContent={'flex-start'} alignItems={'center'}>

        <Flex padding={'4px 2px'} justifyContent={'space-between'}>
          <Flex padding={'4px 2px'} justifyContent={'space-between'}>
            <KeyText style={{marginBottom: 2}}>24h High</KeyText>
            <ValueText>{symbolThumb.high.toFixed(2)}</ValueText>
          </Flex>
          <Flex padding={'4px 2px'} justifyContent={'space-between'}>
            <KeyText style={{marginBottom: 2}}>24h Low</KeyText>
            <ValueText>{symbolThumb.low.toFixed(2)}</ValueText>
          </Flex>    
        </Flex>  

        <Flex padding={'4px 2px'} justifyContent={'space-between'}>
          <Flex padding={'4px 2px'} justifyContent={'space-between'}>
            <KeyText style={{marginBottom: 2}}>24h Vol</KeyText>
            <ValueText>{symbolThumb.volume.toFixed(2)}</ValueText>
          </Flex>
          <Flex padding={'4px 2px'} justifyContent={'space-between'}>
            <KeyText style={{marginBottom: 2}}>24h Vol</KeyText>
            <ValueText>{symbolThumb.turnover.toFixed(2)}</ValueText>
          </Flex>
        </Flex>  
      </FlexRow>
    </FlexRow>
  )
}

export default SymbolSummary

const PriceText = styled.Text`
  color: #EBECEF;
  font-size: 40px;
`

const CurrencyPriceText = styled.Text`
  color: #EBECEF;
  font-size: 12px;
`

const PercentText = styled.Text<{$isInc: boolean}>`
  color: rgb(246, 70, 93);
  font-size: 12px;
  padding-left: 5px;

  ${(props) => {
    if (props.$isInc === undefined) {
      return css`color: rgb(234, 236, 239);`
    }
    return props.$isInc ? css`color: rgb(14, 203, 129);` : css`color: rgb(246, 70, 93);`
  }}
`

const KeyText = styled.Text`
  color: rgb(132, 142, 156);
  font-size: 10px;
  text-align: left;
`
const ValueText = styled.Text`
  color: #EBECEF;
  font-size: 10px;
  text-align: left;
`


