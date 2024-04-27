import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import BGIcon from './BGIcon';
import CustomIcon from './CustomIcon';
import {FONTFAMILY} from '../theme/theme';

const ImageBackgroundInfo = ({
  EnableBackHandler,
  imagelink_potrait,
  id,
  type,
  name,
  favorite,
  description,
  averag_rating,
  BackHandler,
  ToggleFavorite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_potrait}
        style={styles.ItemBackgroundImage}>
        {EnableBackHandler ? (
          <View style={styles.ImageBackContainer}>
            <View style={styles.BackButton}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler();
                }}>
                <BGIcon name="left" color={'white'} size={26} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.ImageNoBackContainer}>
            <TouchableOpacity
              onPress={() => {
                ToggleFavorite(favorite, type, id);
              }}>
              <BGIcon
                name="like"
                color={favorite ? 'red' : 'white'}
                size={28}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.ImageInfoContainer}>
          <View style={styles.ImageInfoContainer2}>
            <View style={styles.InfoContainer}>
              <View style={styles.TitleIcon}>
                <Text style={styles.ItemTitle}>{name}</Text>
                <View>
                  <View style={styles.LikeButton}>
                    <TouchableOpacity
                      onPress={() => {
                        ToggleFavorite(favorite, type, id);
                      }}>
                      <BGIcon
                        name="like"
                        color={favorite ? 'red' : 'white'}
                        size={28}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.RatingandIcon}>
                <CustomIcon style={styles.StarIcon} name={'star'} color={'white'} size={18} />

                <Text style={styles.AverageRating}>{averag_rating}</Text>
              </View>
              <Text style={styles.DescriptionText}>Description</Text>
              <Text style={styles.Description}>{description}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  ImageBackContainer: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  BackButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },

  ImageNoBackContainer: {
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ImageInfoContainer: {
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: '#F7C762',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  ItemTitle: {
    marginTop: 20,
    fontFamily: FONTFAMILY.poppins_bold,
    marginHorizontal: 10,
    fontSize: 24,
    color: 'black',
  },
  AverageRating: {
    fontFamily: FONTFAMILY.poppins_bold,
    marginHorizontal: 10,
    fontSize: 24,
    color: 'black',
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    marginTop: 40,
    marginHorizontal: 10,
    fontSize: 24,
    color: 'black',
  },
  Description: {
    marginHorizontal: 18,
    fontSize: 18,
    color: 'black',
  },
  TitleIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RatingandIcon: {
    flexDirection: 'row',
    marginHorizontal: 30,
  },
    StarIcon: { 
      marginTop:8,
  },
  LikeButton: {
    margin: 20,
  },
});
