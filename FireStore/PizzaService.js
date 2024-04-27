// PizzaService.js
import firestore from '@react-native-firebase/firestore';

export const readPizzaData = async () => {
  try {
    const pizzaDocument = await firestore()
      .collection('pizzas')
      .doc('P1')
      .get();

    if (pizzaDocument.exists) {
      const pizzaData = pizzaDocument.data();
      return pizzaData;
    } else {
      console.log('Document does not exist!');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};
 