import React, {memo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './src/navigators/TabNavigator';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OnBoarding from './src/screens/OnBoarding';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const AuthFlow = memo(() => (
  <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      animationEnabled: true,
    }}
  >
    <Stack.Screen name="OnBoarding" component={OnBoarding} />
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
    <Stack.Screen name="AuthFlow" component={AuthFlow} />
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
));

const App = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default memo(App);
