import { COLORS } from '@/theme/theme'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import Constants from 'expo-constants'
import SymbolList from '@/components/Exchange/SymbolList'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/native'

const MarkrtScreen = ({navigation}: BottomTabScreenProps<ParamListBase, any, string>) => {
  
  return (
    <Container>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style='light'/>
      <SafeAreaView style={{marginTop: Constants.statusBarHeight}}>
      </SafeAreaView>
      <SymbolList navigation={navigation}/>
      
    </Container>
  )
}

export default MarkrtScreen


const Container = styled.View`
  flex: 1;
  background-color: #0C0F14
`