import { OrderBookItem } from '@/services'
import useStore from '@/store/exchange/useStore'
import _ from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Flex } from '../Box'
import FlexRow from '../Box/FlexRow'
import styled, { css } from 'styled-components/native'

const MINI_ORDER_BOOK_SIZE = 8

const TradeOrderBook = ({symbol, price}:{symbol: string, price: number}) => {
  const {
    miniOrderBookMap,  
    fetchMiniOrderBook
  } = useStore(state => state.orderBook)

  useEffect(() => {
    if (!symbol) return
    fetchMiniOrderBook(symbol)
  }, [symbol, fetchMiniOrderBook])

  const [askItems, bidItems]: [OrderBookItem[], OrderBookItem[]] = useMemo(() => {
    console.log(miniOrderBookMap)
    const orderBook = symbol ? miniOrderBookMap[symbol] : undefined
    if (orderBook) {
      const cloneOrderBook = _.cloneDeep(orderBook)
      
      if (cloneOrderBook.ask.items.length < MINI_ORDER_BOOK_SIZE) {
        for (let index = cloneOrderBook.ask.items.length; index < MINI_ORDER_BOOK_SIZE; index++) {
          cloneOrderBook.ask.items.push({amount: 0, price: 0})
        }
      }
      const reverseItems = _.reverse(cloneOrderBook.ask.items)
      cloneOrderBook.ask.items = reverseItems

      if (cloneOrderBook.bid.items.length < MINI_ORDER_BOOK_SIZE) {
        for (let index = cloneOrderBook.bid.items.length; index < MINI_ORDER_BOOK_SIZE; index++) {
          cloneOrderBook.bid.items.push({amount: 0, price: 0})
        }
      }
      return [cloneOrderBook.ask.items.splice(0, 8), cloneOrderBook.bid.items.splice(0, 8)]
    }
    const bidList = []
    for (let index = 0; index < MINI_ORDER_BOOK_SIZE; index++) {
      bidList.push({amount: 0, price: 0})
    }
    const askList = []
    for (let index = 0; index < MINI_ORDER_BOOK_SIZE; index++) {
      askList.push({amount: 0, price: 0})
    }
    return [askList, bidList]
  }, [symbol, miniOrderBookMap])

  return (
    <View style={{flex: 1}}>
      <Flex padding={'2px 10px'} >
        <FlexRow padding={'2px 4px'} justifyContent={'space-between'}>
          <HeaderText>Price</HeaderText>
          <HeaderText>Amount</HeaderText>
        </FlexRow>
        <Flex padding={'0 4px'}>
          {bidItems.map((item, index) => (
            <FlexRow key={index} padding={'4px 0'}>
              <PriceCell $isBuy={false}><PriceCellText $isBuy={false} $left={true}>{item.price !== 0 ? item.price.toFixed(2) : '-'}</PriceCellText></PriceCell>
              <TextCell><TextCellText $left={false}>{item.amount !== 0 ? item.amount : '-'}</TextCellText></TextCell>
            </FlexRow>
          ))}
        </Flex>

        <Flex
          borderTopColor={'#252931'} 
          borderTopStyle={'solid'} 
          borderTopWidth={1}
          borderBottomColor={'#252931'} 
          borderBottomStyle={'solid'} 
          borderBottomWidth={1}
          justifyContent={'space-between'}
          alignItems={'center'}>
          
          <Text style={{color: 'white', fontSize: 20}}>{price}</Text>

        </Flex>

        <Flex padding={'0 4px'}>
          {askItems.map((item, index) => (
            <FlexRow key={index} padding={'4px 0'}>
              <PriceCell $isBuy={true}><PriceCellText $isBuy={true}  $left={true}>{item.price !== 0 ? item.price.toFixed(2) : '-'}</PriceCellText></PriceCell>
              <TextCell><TextCellText $left={false}>{item.amount !== 0 ? item.amount : '-'}</TextCellText></TextCell>
              
            </FlexRow>
          ))}
        </Flex>
        

      </Flex>
    </View>
  )
}

export default TradeOrderBook

const HeaderText = styled.Text`
  font-size: 12px;
  color: rgb(132, 142, 156);
`

const PriceCell = styled.View<{$isBuy: boolean}>`
  flex: 1 1 0%;
  cursor: pointer;
  width: 90px;
`

const PriceCellText = styled.Text<{$isBuy: boolean, $left: boolean}>`
  font-size: 12px;
  text-align: right;

  ${(props) => {
    return props.$isBuy ? css`color: rgb(14, 203, 129);` : css`color: rgb(246, 70, 93);`
  }}
  ${(props) => {
    return props.$left ? css`text-align: left;` : css`text-align: right;`
  }}
`

const TextCell = styled.View<{$left?: boolean}>`
  font-size: 12px;
  flex: 1 1 0%;
  color: rgb(183, 189, 198);
  cursor: pointer;
  width: 90px;
  ${(props) => {
    return props.$left ? css`text-align: left;` : css`text-align: right;`
  }}
`

const TextCellText = styled.Text<{$left: boolean}>`
  font-size: 12px;
  text-align: left;
  color: #ffffff;
  ${(props) => {
    return props.$left ? css`text-align: left;` : css`text-align: right;`
  }}
`

const CurrentPriceBox = styled.View`
  border-top: 1px solid #252931;
  border-bottom: 1px solid #252931;
  padding: 5px 0;
`