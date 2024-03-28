import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';

const Badge = ({text, type = 'default'}) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'success':
        return {backgroundColor: '#4CAF50', color: '#fff'};
      case 'warning':
        return {backgroundColor: '#FFC107', color: '#000'};
      case 'error':
        return {backgroundColor: '#F44336', color: '#fff'};
      default:
        return {backgroundColor: COLORS.primaryLight, color: COLORS.dark};
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[styles.badge, {backgroundColor: badgeStyle.backgroundColor}]}>
      <Text style={[styles.text, {color: badgeStyle.color}]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 12,
  },
});

export default Badge;