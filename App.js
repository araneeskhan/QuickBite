import React, {memo, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './src/navigators/TabNavigator';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OnBoarding from './src/screens/OnBoarding';
import ScanScreen from './src/screens/ScanScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [initialRoute, setInitialRoute] = useState('AuthFlow');

  const checkAuthState = async () => {
    try {
      setHasError(false);
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setInitialRoute('Home');
      }
    } catch (error) {
      console.warn('Failed to get auth state:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthFlow" component={AuthFlow} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen onRetry={checkAuthState} />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <MainNavigator initialRouteName={initialRoute} />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default memo(App);
