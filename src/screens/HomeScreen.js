import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStore} from '../store/Store';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';

import {FONTFAMILY} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import PizzaCard from '../components/PizzaCard';
import {BurgerData} from '../data/BurgerData';

const getCategoriesFromData = (pizzaData, burgerData) => {
  let temp = {};
  const combinedData = [...pizzaData, ...burgerData];

  for (let i = 0; i < combinedData.length; i++) {
    if (temp[combinedData[i].type] === undefined) {
      temp[combinedData[i].type] = 1;
    } else {
      temp[combinedData[i].type]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getPizzaList = (category, pizzaList, burgerList) => {
  if (category === 'All') {
    return [...pizzaList, ...burgerList];
  } else {
    return [...pizzaList, ...burgerList].filter(item => item.type === category);
  }
};

const HomeScreen = ({navigation}) => {
  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(PizzaList, BurgerList),
  );

  const addToCart = useStore(state => state.addToCart);
  const calculateCartPrice = useStore(state => state.calculateCartPrice);

  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedPizza, setSortedPizza] = useState(
    getPizzaList(categoryIndex.category, PizzaList, BurgerList),
  );

  const searchPizza = searchString => {
    setSearchText(searchString);

    if (searchString !== '') {
      setCategoryIndex({index: 0, category: 'All'});

      const filteredItems = getPizzaList('All', PizzaList, BurgerList).filter(
        item => item.name.toLowerCase().includes(searchString.toLowerCase()),
      );

      setSortedPizza(filteredItems);
    } else {
      setSortedPizza(
        getPizzaList(categoryIndex.category, PizzaList, BurgerList),
      );
    }
  };
  const handleCategorySelect = selectedCategory => {
    ListRef?.current?.scrollToOffset({animated: true, offset: 0});
    setSearchText('');

    setCategoryIndex(prevState => ({
      index: categories.indexOf(selectedCategory),
      category: selectedCategory,
    }));

    if (selectedCategory === 'All') {
      setSortedPizza([...PizzaList, ...BurgerList]);
    } else {
      setSortedPizza(getPizzaList(selectedCategory, PizzaList, BurgerList));
    }
  };

  const ListRef = useRef();
  const PizzaListRef = useRef();
  const BurgerListRef = useRef();

  //   console.log('BurgerList:', BurgerList);

  const addToCartHandler = (id, index, name, imagelink_square, type, price) => {
    console.log(
      'PizzaCardAddToCart - Before addToCart:',
      id,
      index,
      name,
      imagelink_square,
      type,
      price,
    );

    if (price && price.size) {
      addToCart({
        id,
        index,
        name,
        imagelink_square,
        type,
        prices: [{...price, quantity: 1}],
      });

      console.log('PizzaCardAddToCart - After addToCart');
      calculateCartPrice();

      if (name) {
        ToastAndroid.showWithGravity(
          `${name} added to Cart`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        console.error('addToCartHandler - "name" is undefined');
      }
    } else {
      console.error(
        'addToCartHandler - "price" is null or does not have a valid "size" property',
      );
    }
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'white'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />

        <Text style={styles.ScreenTitle1}>Hey Foodie !</Text>
        <Text style={styles.ScreenTitle2}>Try Your Favorite {'\n'} Food</Text>

        {/* Search Input */}
        <View style={styles.InputContainer}>
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={text => searchPizza(text)}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity onPress={() => searchPizza(searchText)}>
            <CustomIcon name="search" size={22} color="gray" />
          </TouchableOpacity>
        </View>
        {/* Categories Text  */}

        <View>
          <Text style={styles.CategoriesTitle}>Category</Text>
        </View>

        {/* Category Scrolling  */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => handleCategorySelect(data)}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index === index
                      ? {fontWeight: 'bold', fontSize: 28, color: '#F7C762'}
                      : {},
                  ]}>
                  {data}
                </Text>

                {categoryIndex.index === index ? (
                  <View style={styles.ActiveCategory}></View>
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Pizza FlatList */}
        {categoryIndex.category === 'All' ||
        categoryIndex.category === 'Pizza' ? (
          <FlatList
            ref={PizzaListRef}
            horizontal
            ListEmptyComponent={
              <View style={styles.EmptyList}>
                <Text style={styles.EmptyListText}>
                  No Such Pizza Available
                </Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
            data={sortedPizza}
            contentContainerStyle={styles.FlatListContainer}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <PizzaCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  type={item.type}
                  imagelink_square={item.imagelink_square}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCartHandler} // Pass the function directly
                />
              </TouchableOpacity>
            )}
          />
        ) : null}

        {/* Burger FlatList */}
        {categoryIndex.category === 'All' ||
        categoryIndex.category === 'Burger' ? (
          <FlatList
            ref={BurgerListRef}
            horizontal
            ListEmptyComponent={
              <View style={styles.EmptyList}>
                <Text style={styles.EmptyListText}>
                  No Such Burger Available
                </Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
            data={sortedPizza}
            contentContainerStyle={styles.FlatListContainer}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <PizzaCard
                  id={item.id}
                  index={item.index}
                  name={item.name}
                  type={item.type}
                  imagelink_square={item.imagelink_square}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCartHandler} // Pass the function directly
                />
              </TouchableOpacity>
            )}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle1: {
    fontSize: 36,
    paddingLeft: 25,
    marginTop: 30,
    fontFamily: FONTFAMILY.poppins_bold,
    color: 'black',
  },
  ScreenTitle2: {
    color: '#F7C762',
    fontSize: 24,
    paddingLeft: 25,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  InputContainer: {
    marginTop: 20,
    height: 60,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F7C762',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  CategoriesTitle: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 24,
    color: 'black',
    marginLeft: 50,
    marginTop: 30,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: 40,
    gap: 20,
    marginTop: 10,
    marginBottom: 0,
    height: 50,
    width: '100%',
    // backgroundColor: 'green'
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: 15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: 'gray',
    fontSize: 20,
    fontWeight: 'normal',
  },
  ActiveCategory: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'yellow',
  },
  FlatListContainer: {
    margin: 10,
    gap: 30,
    paddingHorizontal: 30,
  },

  EmptyList: {
    width: Dimensions.get('window').width - 30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36 * 3,
    color: 'black',
  },
  EmptyListText: {
    color: 'black',
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontSize: 18,
  },
});
