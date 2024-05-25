import { OrderBook, OrderBookItem } from '@/services'
import useStore from '@/store/exchange/useStore'
import React, { useEffect, useMemo } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import FlexRow from '../Box/FlexRow'
import { PriceCell, PriceCellText, TextCell, TextCellText } from './styles'
import _ from 'lodash'
import { Text } from 'react-native'
import { Flex } from '../Box'
import { SPACING } from '@/theme/theme'

const MINI_ORDER_BOOK_SIZE = 20

const OrderBookMin = ({symbol}:{symbol: string}) => {
  // const symbol = 'btc_usdt'.toString().toUpperCase().replace('_', '/')

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
      return [cloneOrderBook.ask.items, cloneOrderBook.bid.items]
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
    <FlexRow padding={'2px 10px'} >
      <Flex padding={'0 4px'}  flex={'1'}>
        {askItems.map((item, index) => (
          <FlexRow key={index} padding={'2px 0'}>
            <TextCell><TextCellText $left={true}>{item.amount !== 0 ? item.amount : '-'}</TextCellText></TextCell>
            <PriceCell $isBuy={true}><PriceCellText $isBuy={true}  $left={false}>{item.price !== 0 ? item.price.toFixed(2) : '-'}</PriceCellText></PriceCell>
          </FlexRow>
        ))}
      </Flex>
      <Flex padding={'0 4px'} flex={'1'}>
        {bidItems.map((item, index) => (
          <FlexRow key={index} padding={'2px 0'}>
            <PriceCell $isBuy={false}><PriceCellText $isBuy={false} $left={true}>{item.price !== 0 ? item.price.toFixed(2) : '-'}</PriceCellText></PriceCell>
            <TextCell><TextCellText $left={false}>{item.amount !== 0 ? item.amount : '-'}</TextCellText></TextCell>
          </FlexRow>
        ))}
      </Flex>

    </FlexRow>
    
  )
}

export default OrderBookMin
