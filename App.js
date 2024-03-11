import React, {memo, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigation/MainNavigator';
import LoadingScreen from './src/components/LoadingScreen';
import ErrorScreen from './src/components/ErrorBoundary';
import {theme} from './src/theme/theme';
import {navigationRef} from './src/navigation/NavigationService';

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

  useEffect(() => {
    checkAuthState();
  }, []);

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
