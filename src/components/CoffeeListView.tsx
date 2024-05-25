import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CoffeeCard from './CoffeeCard'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { useStore } from '../store/store'

interface CoffeeListViewProps {
  coffeeList: Array<any>
  listRef?: any
  navigation: any,
  extraContentContainerStyle?: any
}

const CoffeeListView: React.FC<CoffeeListViewProps> = ({coffeeList, listRef, navigation, extraContentContainerStyle}) => {
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  

  const coffeeAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelinkquare,
    specialIngredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelinkquare,
      specialIngredient,
      type,
      prices,
    });
    calculateCartPrice();
  }

  return (
    <>
      <FlatList 
        ref={listRef}
        horizontal
        ListEmptyComponent={
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Coffee Available</Text>
          </View>
        }
        contentContainerStyle={[styles.FlatListContainer, extraContentContainerStyle]}
        showsHorizontalScrollIndicator={false}
        data={coffeeList} 
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {
              navigation.push('Details', {
                index: item.index,
                id: item.id,
                type: item.type,
              })
            }}>
              <CoffeeCard 
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelinkSquare={item.imagelink_square}
                name={item.name}
                specialIngredient={item.special_ingredient}
                averageRating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={coffeeAddToCart}
                />
            </TouchableOpacity>
          )
        }}/>
    </>
  )
}

export default CoffeeListView

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
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  }
  
})