import React from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';

const ProgressBar = ({
  progress,
  height = 8,
  backgroundColor = COLORS.light,
  fillColor = COLORS.primaryDark,
  animated = true,
  showPercentage = false,
  style,
}) => {
  const width = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(width, {
        toValue: progress,
        duration: 600,
        useNativeDriver: false,
      }).start();
    } else {
      width.setValue(progress);
    }
  }, [progress, animated]);

  const progressWidth = width.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor,
            borderRadius: height / 2,
          },
        ]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: fillColor,
              width: progressWidth,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flex: 1,
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
  },
  percentage: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.dark,
  },
});

export default ProgressBar;