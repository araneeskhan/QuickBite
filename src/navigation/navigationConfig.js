import {Platform} from 'react-native';

export const screenOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: '#fff'},
  animationEnabled: true,
  gestureEnabled: Platform.OS === 'ios',
};

export const tabBarOptions = {
  activeTintColor: '#FF6B6B',
  inactiveTintColor: '#A9A9A9',
  style: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
};