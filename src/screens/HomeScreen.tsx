import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from "../store/store";
import HeaderBar from '../components/HeaderBar';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import SearchBox from '../components/SearchBox';
import CategoryNav from '../components/CategoryNav';
import CoffeeListView from '../components/CoffeeListView';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { IOsApp } from '../components/Chart'

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  
  return categories;
}

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
}

const HomeScreen = ({navigation}: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  
  
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [categoryIndex, setCategoryIndex] = useState({index: 0, category: categories[0]});
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );
  const ListRef: any = useRef<FlatList>();

  const searchCoffee = (search: string) => {
    
    if (search !== '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0
      });
    }
    setCategoryIndex({index: 0, category: categories[0]})
    let filteredList = CoffeeList.filter((item: any) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    console.log(filteredList)
    setSortedCoffee([
      ...filteredList
    ])
    
  }

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList])
  }

  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.ScrollViewFlex}>

        <HeaderBar />
        <Text style={styles.Title}>
          Find the best{'\n'}coffee for you
        </Text>
        <SearchBox searchCoffee={searchCoffee} resetSearchCoffee={resetSearchCoffee} />
        <CategoryNav 
          categories={categories} 
          categoryIndex={categoryIndex}
          onCategoryIndexChange={(index:any) => {
            setCategoryIndex({index: index, category: categories[index]});
            setSortedCoffee([...getCoffeeList(categories[index], CoffeeList),])
          }}/>
        <CoffeeListView coffeeList={sortedCoffee} listRef={ListRef} navigation={navigation}/>
        <CoffeeListView coffeeList={BeanList} navigation={navigation} extraContentContainerStyle={{marginBottom: tabBarHeight}}/>

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  Title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
})