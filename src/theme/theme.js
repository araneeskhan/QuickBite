import {DefaultTheme} from 'react-native-paper';

export const FONTFAMILY = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

export const COLORS = {
  primaryDark: '#FF6B6B',
  primaryLight: '#FF8787',
  secondaryDark: '#4ECDC4',
  secondaryLight: '#7BDFF2',
  dark: '#2C3E50',
  light: '#F8F9FA',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#A9A9A9',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B',
    accent: '#4ECDC4',
    background: '#ffffff',
  },
};
