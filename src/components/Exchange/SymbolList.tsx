import useStore, { State } from '@/store/exchange/useStore'
import { SPACING } from '@/theme/theme'
import React, { useEffect, useMemo } from 'react'
import { Text } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Dimensions, FlatList, Pressable } from 'react-native'
import FlexRow from '../Box/FlexRow'
import { Flex } from '../Box'
import styled, { css } from 'styled-components/native'
import { left } from 'styled-system'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ParamListBase, useNavigation } from '@react-navigation/native'

const SymbolList = () => {
  const navigation = useNavigation();
  const {symbolThumbs, fetchSymbolThumbMap} = useStore((state: State) => state.symbolThumb)

  useEffect(() => {
    fetchSymbolThumbMap()
  }, [])

  return (
    <FlatList 
      ListEmptyComponent={
        <View style={styles.EmptyListContainer}>
          <Text>No Symbol</Text>
        </View>
      }
      contentContainerStyle={styles.FlatListContainer}
      showsHorizontalScrollIndicator={false}
      data={symbolThumbs} 
      keyExtractor={item => item.symbol}
      renderItem={({item}) => {
        return (
          <Pressable onPress={() => {
            navigation.push('MarketDetails', {
              symbol:item.symbol
            })
          }}>
            <FlexRow justifyContent={'space-between'} 
              borderBottomStyle={'solid'} 
              borderBottomColor={'#252931'} 
              borderBottomWidth={'1px'} padding={'5px 0'}>

              <Flex justifyContent={'space-between'}>
                <Text style={styles.SymbolText}>{item.symbol}</Text>
                <Text style={styles.VolText}>{item.volume.toFixed(2)}</Text>
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Text style={styles.PriceText}>{item.close.toFixed(2)}</Text>
                <ChgText $inc={item.close > item.open}>{`${(item.chg * 100).toFixed(2)}%`}</ChgText>
              </Flex>

            </FlexRow>
            
          </Pressable>
        )
      }}/>
  )
}

export default SymbolList


const styles = StyleSheet.create({
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  PriceText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    paddingBottom: 5
  },
  VolText: {
    fontSize: 14,
    color: 'rgb(132, 142, 156)',
    textAlign: "left"
  },
  SymbolText: {
    fontSize: 20,
    color: 'white',
    textAlign: "left",
    paddingBottom: 5
  }
})

const ChgText = styled.Text<{$inc: boolean}>`
  font-size: 14;
  text-align: 'left';
  ${(props) => {
    return props.$inc ? css`color: rgb(14, 203, 129);` : css`color: rgb(246, 70, 93);`
  }}
`
