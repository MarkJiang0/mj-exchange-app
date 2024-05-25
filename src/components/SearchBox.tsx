import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcon from './CustomIcon'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface SearchBoxProps {
  searchCoffee: Function,
  resetSearchCoffee: Function
}

const SearchBox: React.FC<SearchBoxProps> = ({searchCoffee, resetSearchCoffee}) => {
  const [searchText, setSearchText] = useState('')

  const resetSearchCoffeeLocal = () => {
    resetSearchCoffee()
    setSearchText('')
  }

  return (
    <View style={styles.SearchBox}>
      <TouchableOpacity onPress={() => {
        searchCoffee(searchText)
      }}>
        <CustomIcon 
          style={styles.InputIcon}
          name='search' 
          size={FONTSIZE.size_18} 
          color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
      </TouchableOpacity>

      <TextInput 
        placeholder='Find Your Coffee...' 
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer}
        value={searchText} 
        onChangeText={ text => {
          setSearchText(text)
          searchCoffee(text)
        }} />

      {searchText.length > 0 ? (
        <TouchableOpacity onPress={() => {
          resetSearchCoffeeLocal()
        }}>
          <CustomIcon style={styles.InputIcon}
            name="close"
            size={FONTSIZE.size_16}
            color={COLORS.primaryLightGreyHex}/>
        </TouchableOpacity>
      ) : (<></>)}
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create({
  SearchBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center'
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  }
})