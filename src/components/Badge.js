import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';

const Badge = ({
  count,
  size = 'medium',
  color = COLORS.primaryDark,
  textColor = COLORS.white,
  position,
  children,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          minWidth: 16,
          height: 16,
          fontSize: 10,
          padding: 2,
        };
      case 'large':
        return {
          minWidth: 24,
          height: 24,
          fontSize: 14,
          padding: 4,
        };
      default:
        return {
          minWidth: 20,
          height: 20,
          fontSize: 12,
          padding: 3,
        };
    }
  };

  const sizeStyle = getSize();
  const isStandalone = !children;

  const renderBadge = () => (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color,
          minWidth: sizeStyle.minWidth,
          height: sizeStyle.height,
          padding: sizeStyle.padding,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: sizeStyle.fontSize,
          },
        ]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );

  if (isStandalone) {
    return renderBadge();
  }

  return (
    <View style={styles.container}>
      {children}
      <View style={[styles.positionContainer, styles[position || 'topRight']]}>
        {renderBadge()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  positionContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  badge: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
  },
  topLeft: {
    top: -8,
    left: -8,
  },
  topRight: {
    top: -8,
    right: -8,
  },
  bottomLeft: {
    bottom: -8,
    left: -8,
  },
  bottomRight: {
    bottom: -8,
    right: -8,
  },
});

export default Badge;