import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { readPizzaData } from '../../FireStore/PizzaService';

const FireStoreRead = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzaData = await readPizzaData();
        console.log('Fetched Pizza Data:', pizzaData);
      } catch (error) {
        console.error('Error fetching pizza data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <View>
          
    </View>
  );
};

export default FireStoreRead;

const styles = StyleSheet.create({})