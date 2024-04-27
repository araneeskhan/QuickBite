/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {firebase} from '@react-native-firebase/app';
import {initializeApp} from '@react-native-firebase/app';



const firebaseConfig = {
  apiKey: 'AIzaSyC36aQ3h_0KHzb2fgwUdt2YnHlc0-pfbwM',
  authDomain: 'quick-bite-app-64957.firebaseapp.com',
  projectId: 'quick-bite-app-64957',
  storageBucket: 'quick-bite-app-64957.appspot.com',
  messagingSenderId: '393806143413',
  appId: '1:393806143413:android:7d8ea52ee526ee0d5a03fc',
};

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
