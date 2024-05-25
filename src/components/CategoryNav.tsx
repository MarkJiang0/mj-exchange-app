import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface CategoryNavProps {
  categories: Array<any>
  onCategoryIndexChange: Function
  categoryIndex: any
}

const CategoryNav: React.FC<CategoryNavProps> = ({categories, onCategoryIndexChange, categoryIndex}) => {
  
  
  return (
    <>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollViewStyle}>
        {categories.map((item, index) => (
          <View key={index} style={styles.CategoryViewStyle}>
            <TouchableOpacity 
              style={{alignItems: 'center'}}
              onPress={() => {
                onCategoryIndexChange(index)
              }}>
              <Text style={[styles.CategoryText, categoryIndex.index === index ? {color: COLORS.primaryOrangeHex} : {}]}>
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </>
    
  )
}

export default CategoryNav

const styles = StyleSheet.create({
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryViewStyle: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
})