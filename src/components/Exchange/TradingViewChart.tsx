import React, { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Flex } from '../Box';
import { Text } from 'react-native';
import FlexRow from '../Box/FlexRow';
import styled, { css } from 'styled-components/native';
import _ from 'lodash';
import LottieView from 'lottie-react-native';


const RESOLUTIONS = ['1m', '5m', '10m', '15m', '30m', '1H', '1D']
const OVERLAY_INDICATORS = ['MA', 'EMA', 'BOLL']
const INDICATORS = ['MACD', 'VOL', 'RSI']

export type ChartModel = 'SIMPLE' | 'FULL'

function ChartWebView({uri = '', mode = 'FULL'}): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const webref = useRef(null)
  const animation = useRef(null);
  const [activeResolution, setActiveResolution] = useState('1D')
  const [activeOverlayIndcators, setActiveOverlayIndcators] = useState<string[]>([])
  const [activeIndicators, setActiveIndicators] = useState<string[]>([])

  const dimensions = useWindowDimensions()

  const handleOnPress = (res: string) => {
    setActiveResolution(res)
    if (!webref.current) return 
    webref.current.postMessage(res);
  }

  const handleIndicatorOnPress = (ind: string) => {
    
    if (INDICATORS.includes(ind)) {
      const cloneInds = _.cloneDeep(activeIndicators)
      if (cloneInds.includes(ind)) {
        _.remove(cloneInds, i => i === ind)
        setActiveIndicators(cloneInds)
      } else {
        setActiveIndicators([...cloneInds, ind])
      }
    } else {
      const cloneInds = _.cloneDeep(activeOverlayIndcators)
      if (cloneInds.includes(ind)) {
        _.remove(cloneInds, i => i === ind)
        setActiveOverlayIndcators(cloneInds)
      } else {
        setActiveOverlayIndcators([...cloneInds, ind])
      }
    }
    
    if (!webref.current) return 
    webref.current.postMessage(ind);
  }

  return (
    <Flex>
      <FlexRow paddingTop={'5px'} paddingX={'10px'} justifyContent={'space-around'} alignItems={'center'}>
        {RESOLUTIONS.map((item, index) => (
          <Pressable key={item} onPress={() => {handleOnPress(item)}}>
            <ResolutionBox $active={item === activeResolution}>
              <ResolutionText $active={item === activeResolution}>{item}</ResolutionText>
            </ResolutionBox>
          </Pressable>
        ))}
      </FlexRow>
      {/* <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/load.json')}
      /> */}
      {/* {isLoading && (
        <LottieView
        autoPlay
        ref={animation}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0C0F14' }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/load.json')}
      />
      )} */}

      
      
      <SafeAreaView style={{flex: 1, height: mode === 'FULL' ? 400 : 198, backgroundColor: '#0C0F14', width: dimensions.width, overflow: 'hidden', position: 'relative'}}>
        {isLoading && <View style={{ top: 0, left: 0, height: mode === 'FULL' ? 400 : 198,  width: dimensions.width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0C0F14'}}>
          <LottieView
            autoPlay
            ref={animation}
            style={{ height: mode === 'FULL' ? 400 : 198,  width: dimensions.width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0C0F14' }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../assets/load.json')}
          />
        </View>}
        <WebView
          ref={webref}
          style={{flex: 1, backgroundColor: '#0C0F14'}}
          source={{uri}}
          allowFileAccessFromFileURLs={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist={['*']}
          onShouldStartLoadWithRequest={() => true}
          useWebKit={true}
          onLoadStart={() => {
            console.log('loading')
            setIsLoading(true)
          }}
          onLoadEnd={() => {
            console.log('loaded')
            setTimeout(() => setIsLoading(false), 1000)

            
          }}
          cacheEnabled
          javaScriptEnabled
        />
      </SafeAreaView>

      {mode === 'FULL' ? 
        <FlexRow justifyContent={'space-around'}>
          <FlexRow paddingBottom={'5px'} paddingX={'5px'} justifyContent={'space-around'} alignItems={'center'}>
            {OVERLAY_INDICATORS.map((item, index) => (
              <Pressable key={item} onPress={() => {handleIndicatorOnPress(item)}}>
                <IndicatorBox>
                  <ResolutionText $active={activeOverlayIndcators.includes(item)}>{item}</ResolutionText>
                </IndicatorBox>
              </Pressable>
            ))}
          </FlexRow>
          
          <FlexRow paddingBottom={'5px'} paddingX={'5px'} justifyContent={'space-around'} alignItems={'center'}>
            {INDICATORS.map((item, index) => (
              <Pressable key={item} onPress={() => {handleIndicatorOnPress(item)}}>
                <IndicatorBox>
                  <ResolutionText $active={activeIndicators.includes(item)}>{item}</ResolutionText>
                </IndicatorBox>
              </Pressable>
            ))}
          </FlexRow>
        </FlexRow> : 
        <></>
      }
        
      
      

      
    </Flex>
    
  );
}

export function AndroidChartWebView(): JSX.Element {
  return <ChartWebView uri={'http://192.168.0.104:5501/index.html'} />;
}

export function IOSChartWebView({uri = '', mode = 'FULL'}): JSX.Element {
  return <ChartWebView uri={uri} mode={mode}/>;
}

const style = StyleSheet.create({
  view: {
    flex: 1, 
    height: 100, 
    backgroundColor: '#0C0F14',
  }
})

const ResolutionText = styled.Text<{$active?: boolean}>`
  font-size: 16px;
  ${(props) => {
    return props.$active ? css`color: white;` : css`color: rgb(132, 142, 156);` 
  }}
`

const ResolutionBox = styled.View<{$active?: boolean}>`
  padding: 0px 5px;
  border-radius: 5px;
  ${(props) => {
    return props.$active ? css`background-color: rgb(132, 142, 156);` : css`background-color: #0C0F14` 
  }}
`

const IndicatorBox = styled.View<{$active?: boolean}>`
  padding: 0px 5px;
  border-radius: 5px;
  padding: 0px 10px;
`