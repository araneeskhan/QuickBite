import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const ReviewCard = ({review}) => {
  const renderStars = rating => {
    return [...Array(5)].map((_, index) => (
      <CustomIcon
        key={index}
        name="star"
        size={16}
        color={index < rating ? '#FFD700' : COLORS.light}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={review.userAvatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{review.userName}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>{renderStars(review.rating)}</View>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.comment}>{review.comment}</Text>

      {review.images && review.images.length > 0 && (
        <View style={styles.imageGrid}>
          {review.images.map((image, index) => (
            <Image key={index} source={image} style={styles.reviewImage} />
          ))}
        </View>
      )}

      {review.ownerReply && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyLabel}>Owner's Reply:</Text>
          <Text style={styles.replyText}>{review.ownerReply}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  date: {
    fontSize: 12,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginLeft: 8,
  },
  comment: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.dark,
    lineHeight: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  replyContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.light,
    borderRadius: 8,
  },
  replyLabel: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
    marginBottom: 4,
  },
  replyText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
  },
});

export default ReviewCard;