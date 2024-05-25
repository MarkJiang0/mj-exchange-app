import React, { useState } from 'react'
import FlexRow from '../Box/FlexRow'
import styled, { css } from 'styled-components/native'
import { Pressable } from 'react-native'

const TABLIST = [
  {index: 0, text: 'Order Book'},
  {index: 1, text: 'Trade History'},
]

const MarketOrderTab = ({activeIndex, onPress}: {activeIndex: number, onPress: (index: number) => void}) => {
  console.log(activeIndex)

  const handleTabPress = (index: number) => {
    onPress(index)
  }

  return (
    
    <FlexRow 
      borderTopColor={'#252931'} 
      borderTopStyle={'solid'} 
      borderTopWidth={1}>
      {TABLIST.map((item) => (
        <Pressable key={item.index} onPress={() => {handleTabPress(item.index)}}>
          <Tab $active={activeIndex === item.index}>
            <TabText $active={activeIndex === item.index}>{item.text}</TabText>
          </Tab>
        </Pressable>
      ))}
      
    </FlexRow>
  )
}

export default MarketOrderTab

const Tab = styled.View<{$active?: boolean}>`
  padding: 10px 10px;
  
  border-bottom-style: solid;
  border-bottom-width: 2px;
  ${(props) => {
    return props.$active ? css`
      border-bottom-color: #E3B014;
    ` : css`
      border-bottom-color: transparent;
    `
  }}
`

const TabText = styled.Text<{$active?: boolean}>`
  font-size: 20px;
  font-weight: bold;

  ${(props) => {
    return props.$active ? css`color: #FFFFFF;` : css`color: rgb(132, 142, 156);`
  }}
`
