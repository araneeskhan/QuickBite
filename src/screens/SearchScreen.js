import React, {useState, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS} from '../theme/theme';
import {debounce} from 'lodash';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import FoodCard from '../components/FoodCard';
import EmptyState from '../components/EmptyState';

const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);

  const filters = [
    {id: 'all', label: 'All'},
    {id: 'Pizza', label: 'Pizzas'},
    {id: 'Burger', label: 'Burgers'},
    {id: 'popular', label: 'Popular'},
    {id: 'new', label: 'New'},
  ];

  const searchItems = useCallback(
    debounce((query) => {
      const allItems = [...PizzaList, ...BurgerList];
      return allItems.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
        const price = Math.min(...item.prices.map(p => p.price));
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        return matchesQuery && matchesFilter && matchesPrice;
      });
    }, 300),
    [activeFilter, priceRange, PizzaList, BurgerList]
  );

  const renderSearchItem = ({item}) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => 
        navigation.navigate('Details', {
          type: item.type,
          index: item.index,
        })
      }>
      <Image source={item.imagelink_square} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type}</Text>
        <Text style={styles.itemPrice}>
          From ${Math.min(...item.prices.map(p => p.price))}
        </Text>
      </View>
      <CustomIcon name="chevron-right" size={24} color={COLORS.grey} />
    </TouchableOpacity>
  );

  const searchResults = searchItems(searchQuery);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for food..."
      />

      <FilterChips
        filters={filters}
        activeFilter={activeFilter}
        onFilterPress={setActiveFilter}
      />

      <FlatList
        data={searchResults}
        renderItem={({item}) => (
          <FoodCard
            item={item}
            onPress={() => 
              navigation.navigate('Details', {
                type: item.type,
                index: item.index,
              })
            }
          />
        )}
        keyExtractor={item => `${item.type}-${item.id}`}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          <EmptyState message="No results found" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  resultsList: {
    padding: 20,
  },
});

export default SearchScreen;