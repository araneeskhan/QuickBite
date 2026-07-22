import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useStore} from '../store/Store';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import EmptyState from '../components/EmptyState';

const {width} = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

const FavoriteScreen = ({navigation}) => {
  const FavoritesList = useStore(state => state.FavoritesList);
  const deleteFromFavoriteList = useStore(state => state.deleteFromFavoriteList);

  const renderFavoriteItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => 
        navigation.navigate('Details', {
          type: item.type,
          index: item.index,
        })
      }>
      <Image source={item.imagelink_square} style={styles.itemImage} />
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => deleteFromFavoriteList(item.type, item.id)}>
        <CustomIcon name="heart-filled" size={24} color={COLORS.primaryDark} />
      </TouchableOpacity>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemType}>{item.type}</Text>
        <Text style={styles.itemPrice}>
          From ${Math.min(...item.prices.map(p => p.price))}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (FavoritesList.length === 0) {
    return (
      <EmptyState
        message="No favorites yet"
        animation={require('../assets/animations/empty-favorites.json')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {FavoritesList.length} {FavoritesList.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <FlatList
        data={FavoritesList}
        renderItem={renderFavoriteItem}
        keyExtractor={item => `${item.type}-${item.id}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
  gridContainer: {
    padding: 12,
  },
  itemCard: {
    width: COLUMN_WIDTH,
    margin: 6,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: '100%',
    height: COLUMN_WIDTH,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  itemType: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDark,
    marginTop: 4,
  },
});

export default FavoriteScreen;
