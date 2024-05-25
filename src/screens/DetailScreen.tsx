import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from '../components/ImageBackgroundInfo'
import { useStore } from '../store/store';
import { COLORS } from '../theme/theme';

const DetailScreen = ({navigation, route}: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  console.log(ItemOfIndex);
  

  return (
    <View style={styles.DetailContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollContainer}>
      <ImageBackgroundInfo 
        EnableBackHandler={true}
        imagelink_portrait={ItemOfIndex.imagelink_portrait}
        type={ItemOfIndex.type}
        id={ItemOfIndex.id}
        favourite={ItemOfIndex.favourite}
        name={ItemOfIndex.name}
        special_ingredient={ItemOfIndex.special_ingredient}
        ingredients={ItemOfIndex.ingredients}
        average_rating={ItemOfIndex.average_rating}
        ratings_count={ItemOfIndex.ratings_count}
        roasted={ItemOfIndex.roasted}
        BackHandler={undefined}
        ToggleFavourite={undefined}/>

      </ScrollView>
    </View>
    
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  DetailContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  }
})