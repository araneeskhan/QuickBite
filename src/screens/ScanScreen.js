import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import CustomIcon from '../components/CustomIcon';
import { FONTFAMILY } from '../theme/theme';
import { useStore } from '../store/Store';

const { width, height } = Dimensions.get('window');

const ScanScreen = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(true);
  const scanLineAnim = new Animated.Value(0);

  const PizzaList = useStore(state => state.PizzaList);
  const BurgerList = useStore(state => state.BurgerList);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 200,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Mock ML processing delay
    const timer = setTimeout(() => {
      setIsScanning(false);
      handleMockRecognition();
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleMockRecognition = () => {
    // Pick a random item to simulate AI recognition
    const allItems = [...PizzaList, ...BurgerList];
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
    
    // Navigate to Details with the recognized item
    navigation.replace('Details', {
      index: randomItem.index,
      id: randomItem.id,
      type: randomItem.type,
    });
  };

  return (
    <View style={styles.container}>
      {/* Mock Camera View Background */}
      <View style={styles.mockCamera}>
        <View style={styles.overlay}>
          <Text style={styles.headerText}>Point at food to scan...</Text>
          
          {/* Scanner Box */}
          <View style={styles.scannerBox}>
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: scanLineAnim }],
                },
              ]}
            />
          </View>
          
          <Text style={styles.statusText}>
            {isScanning ? '⚡ AI Processing Image...' : 'Match Found!'}
          </Text>
          
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mockCamera: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Simulate dark camera feed
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: 20,
    position: 'absolute',
    top: 60,
  },
  scannerBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#F7C762',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#F7C762',
    shadowColor: '#F7C762',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  statusText: {
    color: '#F7C762',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    marginTop: 40,
  },
  closeBtn: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  closeBtnText: {
    color: 'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
  }
});

export default ScanScreen;
