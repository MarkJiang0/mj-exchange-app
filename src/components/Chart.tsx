import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';
import { useAssets } from "expo-asset";
import * as FileSystem from 'expo-file-system';



const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">
    <title>TradingView Chart</title>
    <style>
    #tv_chart_container {
        width: 100px;
        height: 100px;
        color: #000000;
        backgorund: #FFFFFF
        font-size: 45px !important;
      }
    }
  </style>
  <script src="${require('../../assets/www/lib.js')}"></script>
  </head>
  <body>
    <div id="tv_chart_container">
      test
      <div onclick="showAlert(this)" style="color: #000000;">点击这里</div>
    </div>
    
  </body>
</html> `;

function App({uri = 'index.html'}): JSX.Element {

  return (
    <SafeAreaView style={style.view}>
      <WebView
        style={{flex: 1}}
        source={{uri: 'http://192.168.0.104:5501/index.html'}}
        allowFileAccessFromFileURLs={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={() => true}
        useWebKit={true}
        javaScriptEnabled
      />
    </SafeAreaView>
  );
}

export function AndroidApp(): JSX.Element {
  return <App uri={'file:///android_asset/index.html'} />;
}

export function IOsApp(): JSX.Element {
  
  
  return <App />;
}

const style = StyleSheet.create({
  view: {flex: 1, width: '100%', height: 300, backgroundColor: '#FFFFFF'}
})