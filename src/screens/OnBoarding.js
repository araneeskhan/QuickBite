import {
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

const OnBoarding = ({navigation}) => {
  return (
    <LinearGradient colors={['#F7C762', '#FFBB2B']} style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          resizeMode="contain"
          source={require('../assets/images/intro.png')}
        />
      </View>

      <View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            activeOpacity={0.8}
            style={styles.buttonContainer}>
            <Text style={styles.buttonsText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}
            style={styles.buttonContainer}>
            <Text style={styles.buttonsText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
      alignItems: 'center',
    marginBottom:100,
  },
  image: {
    height: 515,
    width: 444,
  },
  buttonsText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
    buttonContainer: {
    backgroundColor: 'white',
    height: 60,
    width: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default OnBoarding;
