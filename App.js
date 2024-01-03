import React, {memo, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import existing components
import TabNavigator from './src/navigators/TabNavigator';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OnBoarding from './src/screens/OnBoarding';

const Stack = createStackNavigator();

// Custom theme configuration
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B6B',
    accent: '#4ECDC4',
    background: '#ffffff',
  },
};

const AuthFlow = memo(() => (
  <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      animationEnabled: true,
    }}
  >
    <Stack.Screen 
      name="OnBoarding" 
      component={OnBoarding}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
));

const MainStack = memo(() => (
  <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      animationEnabled: true,
    }}
  >
    <Stack.Screen 
      name="AuthFlow" 
      component={AuthFlow}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('AuthFlow');

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setInitialRoute('Home');
      }
    } catch (error) {
      console.warn('Failed to get auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner component
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainStack initialRouteName={initialRoute} />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default memo(App);
