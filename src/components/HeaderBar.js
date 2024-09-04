import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const HeaderBar = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBorder = true,
}) => {
  return (
    <View style={[styles.container, showBorder && styles.borderBottom]}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onLeftPress}
        disabled={!onLeftPress}>
        {leftIcon && (
          <CustomIcon name={leftIcon} size={24} color={COLORS.dark} />
        )}
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={onRightPress}
        disabled={!onRightPress}>
        {rightIcon && (
          <CustomIcon name={rightIcon} size={24} color={COLORS.dark} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.dark,
    textAlign: 'center',
    marginHorizontal: 8,
  },
});

export default HeaderBar;
