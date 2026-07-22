import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/theme';
import CustomIcon from './CustomIcon';

const OrderTimeline = ({steps}) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={styles.leftColumn}>
            <View style={[
              styles.dot,
              step.completed && styles.completedDot,
              step.current && styles.currentDot,
            ]}>
              {step.completed && (
                <CustomIcon name="check" size={12} color={COLORS.white} />
              )}
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.line,
                step.completed && styles.completedLine,
              ]} />
            )}
          </View>
          
          <View style={styles.stepInfo}>
            <Text style={[
              styles.stepTitle,
              (step.completed || step.current) && styles.activeText,
            ]}>
              {step.title}
            </Text>
            <Text style={styles.stepTime}>{step.time}</Text>
            {step.description && (
              <Text style={styles.stepDescription}>{step.description}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    minHeight: 60,
  },
  leftColumn: {
    alignItems: 'center',
    width: 30,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedDot: {
    backgroundColor: COLORS.primaryDark,
  },
  currentDot: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.light,
    marginVertical: 4,
  },
  completedLine: {
    backgroundColor: COLORS.primaryDark,
  },
  stepInfo: {
    flex: 1,
    marginLeft: 12,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.grey,
  },
  activeText: {
    color: COLORS.dark,
  },
  stepTime: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 2,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.grey,
    marginTop: 4,
  },
});

export default OrderTimeline;