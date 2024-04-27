import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import { FONTFAMILY } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';
const FavoriteItem = ({
  id,
  imagelink_potrait,
  name,
  description,
  type,
  average_rating,
  favorite,
  ToggleFavoriteItem,
}) => {
  return (
    <View style={styles.MainContainer}>
      
      {/* Assuming ImageBackgroundInfo is another component */}
      <View style={styles.ImageView}>
        <TouchableOpacity
          style={styles.LikeIcon}
          onPress={() => {
            ToggleFavoriteItem(favorite, type, id);
          }}>
          <BGIcon name="like" color={favorite ? 'red' : 'white'} size={28} />
        </TouchableOpacity>
        <Image source={imagelink_potrait} style={styles.Image} />
      </View>
      {/* <ImageBackgroundInfo style={styles.ImageBackgroundInfo} /> */}

      <TouchableOpacity
        onPress={() => ToggleFavoriteItem(favorite, type, id)}
        style={styles.Container}>
        <Text style={styles.ItemTitle}>{name}</Text>
        <View style={styles.IconRating}>
          <CustomIcon
            style={styles.StarIcon}
            name={'star'}
            color={'orange'}
            size={18}
          />
          <Text style={styles.Average_rating}>{average_rating}</Text>
        </View>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    // overflow: 'hidden',
    // borderRadius: 20,
  },
  ImageBackgroundInfo: {
    backgroundColor: 'white',
    color: 'white',
  },
  ImageView: {
    backgroundColor: '#F7C762',
    borderRadius: 20,
    marginHorizontal: 40,
    marginVertical: 20,
  },
  Image: {
    borderRadius: 30,
    width: 300,
    height: 250,
    marginHorizontal: 50,
    marginBottom: 50,
  },
  ItemTitle: {
    marginHorizontal: 60,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
    color: 'black',
  },
  IconRating: {
    flexDirection: 'row',
    marginHorizontal: 60,
  },
  LikeIcon: {
    justifyContent: 'flex-end',
      marginTop: 20,
    marginBottom:10,
    marginLeft: 340,
  },
  StarIcon: {
    marginTop: 5,
    marginRight: 10,
  },
  DescriptionTitle: {
    marginTop: 30,
    marginHorizontal: 60,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 18,
    color: 'black',
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    marginHorizontal: 60,
    fontSize: 16,
    color: 'black',
    marginBottom: 100,
  },
  Average_rating: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
    color: 'black',
  },
});

export default FavoriteItem;
