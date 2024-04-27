import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './src/navigators/TabNavigator';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OnBoarding from './src/screens/OnBoarding';

const Stack = createStackNavigator();

const AuthFlow = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="OnBoarding" component={OnBoarding} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthFlow" component={AuthFlow} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
