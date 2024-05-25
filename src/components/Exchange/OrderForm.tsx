import { COLORS, FONTSIZE } from '@/theme/theme'
import React, { useRef, useState } from 'react'
import { Dimensions, Pressable, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import styled, { css } from 'styled-components/native'
import { Box, Flex } from '../Box'
import FlexRow from '../Box/FlexRow'
import CustomIcon from '../CustomIcon'
import { color } from 'styled-system'

type Direction = 'BUY' | 'SELL'

const OrderForm = ({direction = 'BUY'}: {direction: Direction}) => {
  const [activeDirection, setActiveDirection] = useState(direction)
  const [activeOrderType, setActiveOrderType] = useState(0)
  const pickerRef = useRef()
  
  return (
    <Container>
      <Flex justifyContent={'space-between'} height={'100%'}>
        <Flex>
          
          <FlexRow justifyContent={'space-between'}>
            <Pressable onPress={() => setActiveDirection('BUY')}>
              <DirectionRadioBox $direction={'BUY'} $active={activeDirection === 'BUY'} width={Dimensions.get('window').width / 3 - 10}>
                <DirectionRadioBoxText $direction={'BUY'} $active={activeDirection === 'BUY'}>Buy</DirectionRadioBoxText>
              </DirectionRadioBox>
            </Pressable>
            <Pressable onPress={() => setActiveDirection('SELL')}>
              <DirectionRadioBox $direction={'SELL'} $active={activeDirection === 'SELL'} width={Dimensions.get('window').width / 3 - 10}>
                <DirectionRadioBoxText $direction={'SELL'} $active={activeDirection === 'SELL'}>Sell</DirectionRadioBoxText>
              </DirectionRadioBox>
            </Pressable>
          </FlexRow>

          <FlexRow>
            <RNPickerSelect 
              ref={pickerRef}
              items={[{label: 'Limit Order', value: 0, color: '#FFFFFF'}, {label: 'Market Order', value: 1, color: '#FFFFFF'}]} 
              style={{inputIOS: {
                width:Dimensions.get('window').width * 2 / 3 - 7, 
                backgroundColor: '#2A2E34',
                marginTop: 15,
                paddingVertical: 8,
                borderRadius: 3,
                textAlign: 'center',
                color: '#FFFFFF'
              }, iconContainer: {
                marginTop: 18,
                paddingVertical: 8,
                paddingRight: 10
              }}}
              placeholder={{}}
              value={activeOrderType}
              darkTheme={true}
              onValueChange={(val) => setActiveOrderType(val)}
              Icon={() => {return ( <CustomIcon name="left" color={COLORS.primaryBlackHex} size={FONTSIZE.size_10}/> )}}/>
          </FlexRow>

          <FlexRow>
            <CurrencyInputWrapper style={{width:Dimensions.get('window').width * 2 / 3 - 7}}>
              <CurrencyInput style={{width:Dimensions.get('window').width / 2 }}
                keyboardType='decimal-pad' 
                keyboardAppearance='dark'
                />
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Text style={{color: '#595F66', fontSize: 12}}>USDT</Text>
              </Flex>
            </CurrencyInputWrapper>
            
          </FlexRow>
          <FlexRow>
            <CurrencyInputWrapper style={{width:Dimensions.get('window').width * 2 / 3 - 7}}>
              <CurrencyInput style={{width:Dimensions.get('window').width / 2 }}
                keyboardType='decimal-pad' 
                keyboardAppearance='dark'
                />
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Text style={{color: '#595F66', fontSize: 12}}>BTC</Text>
              </Flex>
            </CurrencyInputWrapper>
          </FlexRow>
        </Flex>

        <Flex>
          <FlexRow>
            <Box paddingRight={'5px'}>
              <Text style={{color: '#595F66', fontSize: 12}}>Avaliable</Text>
            </Box>
            <Box>
              <Text style={{color: '#FFFFFF', fontSize: 12}}>0 USDT</Text>
            </Box>
          </FlexRow>
          <FlexRow>
            <Pressable>
              <OperateButton $direction={activeDirection} style={{width:Dimensions.get('window').width * 2 / 3 - 7}}>
                <Text style={{textAlign: 'center', color: '#FFFFFF'}}>{`${activeDirection === 'BUY' ? 'Buy' : 'Sell'} BTC`}</Text>
              </OperateButton>
            </Pressable>
          </FlexRow>
        </Flex>
      </Flex>
      
    </Container>
  )
}

export default OrderForm

const Container = styled(Box)`
  flex: 2;
  padding-left: 10px;
  padding-top: 5px;
  height: 100%;
`

const DirectionRadioBox = styled(Box)<{$direction?: string, $active: boolean}>`
  
  opacity: 0.8;
  justify-content: center;
  border-radius: 3px;
  padding: 8px 0px;
  
  
  ${(props) => {
    if (!props.$active) {
      return css`
        background-color: #2A2E34;
      `
    }
    return props.$direction === 'BUY' ? css`
      background-color: #1A2B29;
    ` : css`
      background-color: #2E1E25;
    `
  }}
  
`

const DirectionRadioBoxText = styled.Text<{$direction: string, $active: boolean}>`
  text-align: center;
  ${(props) => {
    if (!props.$active) {
      return css`
        color: #FFFFFF;
      `
    }
    return props.$direction === 'BUY' ? css`
      color: rgb(14, 203, 129);
    ` : css`
      color: rgb(246, 70, 93);
    `
  }}
`

const CurrencyInputWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #2A2E34;
  margin-top: 15px;
  padding: 8px 5px;
  border-radius: 3px;
  border: 1px solid #595F66;
`
const CurrencyInput = styled.TextInput`
  color: #FFFFFF;
  background-color: #2A2E34;
`

const OperateButton = styled(Box)<{$direction?: string}>`
  
  justify-content: center;
  border-radius: 3px;
  margin-top: 15px;
  padding: 12px 5px;

  
  
  ${(props) => {
    return props.$direction === 'BUY' ? css`
      background-color: rgb(14, 203, 129);
    ` : css`
      background-color: rgb(246, 70, 93);
    `
  }}
  
`