import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.Container}>
      <Image source={require('../assets/app_images/avatar.png')} style={styles.Image}/>
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({
  Container: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  }
})