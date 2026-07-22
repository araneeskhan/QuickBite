import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import {COLORS} from '../theme/theme';
import CustomIcon from './CustomIcon';

const Collapsible = ({
  children,
  header,
  initiallyExpanded = false,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const animation = React.useRef(new Animated.Value(initiallyExpanded ? 1 : 0))
    .current;

  const toggleExpanded = () => {
    const newValue = !expanded;
    setExpanded(newValue);
    onToggle?.(newValue);

    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500], // Adjust this value based on your content
  });

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.7}
        onPress={toggleExpanded}>
        {header}
        <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
          <CustomIcon
            name="chevron-down"
            size={24}
            color={COLORS.dark}
          />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.content,
          {
            height: contentHeight,
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  content: {
    overflow: 'hidden',
  },
});

export default Collapsible;