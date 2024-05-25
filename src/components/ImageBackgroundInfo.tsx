import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientBGIcon from './GradientBGIcon'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground 
        source={imagelink_portrait}
        style={styles.ImageBG}>
        <View style={styles.ImageBGInfoHeader}>
          <TouchableOpacity>
            <GradientBGIcon 
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <GradientBGIcon 
              name="like"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}/>
          </TouchableOpacity>
        </View>

        <View style={styles.Test}>
          <Text>123</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default ImageBackgroundInfo

const styles = StyleSheet.create({
  ImageBG: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between'
  },
  ImageBGInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_30,
  },
  Test: {
    paddingTop: 150
  }
})