import React, { useEffect, useMemo } from 'react'
import { Flex } from '../Box'
import useStore from '@/store/exchange/useStore'
import FlexRow from '../Box/FlexRow'
import { PriceCell, PriceCellText, TextCell, TextCellText } from './styles'
import { Trade } from '@/services'


function formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

function pad(num: number):string {
  return num.toString().padStart(2, '0');
}

const TradeList = ({symbol}:{symbol: string}) => {
  const {tradeMap, fetchTradeMap} = useStore(state => state.latestTrades)

  useEffect(() => {
    if (!symbol) return
    fetchTradeMap({symbol, size: 20})
  },[symbol, fetchTradeMap])
  
  const trades: Trade[] = useMemo(() => {
    if (!symbol || !tradeMap) return []
    return tradeMap[symbol]
  }, [symbol, tradeMap[symbol]])

  return (
    <Flex padding={'2px 10px'}>
      {trades?.map((item, index) => (
          <FlexRow key={index} padding={'2px 0'}>
            <PriceCell $isBuy={item.direction === 'BUY'} style={{flex: 2}}>
              <PriceCellText $isBuy={item.direction === 'BUY'}  $left={true}>{item.price.toFixed(2)}</PriceCellText>
            </PriceCell>
            <TextCell style={{flex: 1}}><TextCellText $left={false}>{item.amount}</TextCellText></TextCell>
            <TextCell style={{flex: 1}}><TextCellText $left={false}>{formatDateTime(new Date(item.time))}</TextCellText></TextCell>
          </FlexRow>
        ))}
    </Flex>
  )
}

export default TradeList
