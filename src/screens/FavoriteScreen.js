import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/Store';
import {FONTFAMILY} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import FavoriteItem from '../components/FavoriteItem';
import BGIcon from '../components/BGIcon';

const FavoriteScreen = ({navigation}) => {
  const FavoritesList = useStore(state => state.FavoritesList);

  const addToFavoriteList = useStore(state => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    state => state.deleteFromFavoriteList,
  );

  const ToggleFavorite = (favorite, type, id) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={'#FFFFFF'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>

              <HeaderBar title="Favorite" />
           
            {FavoritesList.length === 0 ? (
              <Text style={styles.EmptyCartText}>No Favorites !!</Text>
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map(data => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoriteItem
                      id={data.id}
                      imagelink_potrait={data.imagelink_potrait}
                      name={data.name}
                      description={data.description}
                      type={data.type}
                      average_rating={data.average_rating}
                      favorite={data.favorite}
                      ToggleFavoriteItem={ToggleFavorite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  EmptyCartText: {
    marginVertical: 350,
    color: 'black',
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 28,
    textAlign: 'center',
  },
  ListItemContainer: {
    // paddingHorizontal: 20,
    gap: 20,
  },
});

export default FavoriteScreen;
