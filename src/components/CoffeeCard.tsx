import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelinkSquare: ImageProps;
  name: string;
  specialIngredient: string;
  averageRating: number;
  price: any;
  buttonPressHandler: any;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelinkSquare,
  name,
  specialIngredient,
  averageRating,
  price,
  buttonPressHandler
}) => {

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        <ImageBackground
          source={imagelinkSquare}
          resizeMode='cover'
          style={styles.CardImageBG}>
            <View style={styles.CardRatingContainer}>
              <CustomIcon 
                name='star'
                color={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_12}/>
              <Text style={styles.CardRatingText}>{averageRating}</Text>
            </View>
          </ImageBackground>
        <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSubtitle}>{specialIngredient}</Text>
        <View style={styles.CardFooterRow}>
          <Text style={styles.CardPriceCurrency}>
            $ <Text style={styles.CardPrice}>{price.price}</Text>
          </Text>
          <TouchableOpacity onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelinkSquare,
              name,
              specialIngredient,
              prices: [{...price, quantity: 1}],
            })
          }}>
            <BGIcon 
              color={COLORS.primaryWhiteHex}
              name='add'
              BGColor={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_10} />
          </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

export default CoffeeCard

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackRGBA,
    paddingHorizontal: SPACING.space_15,
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    gap: SPACING.space_10,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_12,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  CardPrice: {
    color: COLORS.primaryWhiteHex,
  }
})