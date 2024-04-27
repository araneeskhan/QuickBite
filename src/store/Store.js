import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {PizzaData} from '../data/PizzaData';
import {BurgerData} from '../data/BurgerData';

export const useStore = create(
  persist(
    (set, get) => ({
      PizzaList: PizzaData,
      BurgerList: BurgerData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: cartItem =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                found = true;
                let size = false;
                for (
                  let j = 0;
                  j < (state.CartList[i].prices || []).length;
                  j++
                ) {
                  if (
                    state.CartList[i].prices[j]?.size ===
                    cartItem.prices?.[0]?.size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (!size) {
                  state.CartList[i].prices = state.CartList[i].prices || [];
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a, b) => {
                  if (a && a.size && b && b.size) {
                    return a.size.localeCompare(b.size);
                  } else {
                    return 0;
                  }
                });
                break;
              }
            }

            if (!found) {
              state.CartList.push(cartItem);
            }
          }),
        ),

      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              for (
                let j = 0;
                j < (state.CartList[i].prices || []).length;
                j++
              ) {
                tempPrice +=
                  parseFloat(state.CartList[i].prices[j]?.price || 0) *
                  (state.CartList[i].prices[j]?.quantity || 0);
              }
              state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice = totalPrice + tempPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),

      addToFavoriteList: (type, id) =>
        set(
          produce(state => {
            if (type === 'Pizza') {
              for (let i = 0; i < state.PizzaList.length; i++) {
                if (state.PizzaList[i].id === id) {
                  if (state.PizzaList[i].favorite === false) {
                    state.PizzaList[i].favorite = true;
                    state.FavoritesList.unshift(state.PizzaList[i]);
                  }
                  break;
                }
              }
            } else if (type === 'Burger') {
              for (let i = 0; i < state.BurgerList.length; i++) {
                if (state.BurgerList[i].id === id) {
                  if (state.BurgerList[i].favorite === false) {
                    state.BurgerList[i].favorite = true;
                    state.FavoritesList.unshift(state.BurgerList[i]);
                  }
                  break;
                }
              }
            }
          }),
        ),

      deleteFromFavoriteList: (type, id) =>
        set(
          produce(state => {
            if (type === 'Pizza') {
              for (let i = 0; i < state.PizzaList.length; i++) {
                if (state.PizzaList[i].id === id) {
                  if (state.PizzaList[i].favorite === true) {
                    state.PizzaList[i].favorite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Burger') {
              for (let i = 0; i < state.BurgerList.length; i++) {
                if (state.BurgerList[i].id === id) {
                  if (state.BurgerList[i].favorite === true) {
                    state.BurgerList[i].favorite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id === id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),

      incrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),

      decrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),

      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator, currentValue) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            let currentCartListTotalPrice = temp.toFixed(2).toString();
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate: new Date().toDateString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate: new Date().toDateString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        ),
    }),

    {
      name: 'Async',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
