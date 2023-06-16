// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//    items: [],
// }

// export const basketSlice = createSlice({
//    name: "basket",
//    initialState,
//    reducers: {
//       // addToBasket: (state, action) => {
//       //    state.items = [...state.items, action.payload]
//       // },

//       addToBasket: (state, action) => {
//          const { id, title, price, image } = action.payload
      
//          state.items = [...state.items, {
//             id,
//             title,
//             price,
//             image,
//          }]
//       },
      
//       removeFromBasket: (state, action) => {
//          const index = state.items.findIndex(
//             (basketItem) => basketItem.id === action.payload.id
//          )

//          let newBasket = [...state.items]
//          if (index >= 0) {
//             // the item exist in the basket
//             newBasket.splice(index, 1)
//          } else {
//             console.warn(
//                `Cant remove book (id: ${action.payload.id}) as its not found`
//             )
//          }
//          state.items = newBasket
//       },
//    },
// })

// export const { addToBasket, removeFromBasket } = basketSlice.actions

// // Selectors - This is how we pull information from the Global store slice
// export const selectItems = (state) => state.basket.items
// export const selectTotal = (state) =>
//    state.basket.items.reduce((total, item) => total + item.price, 0)

// export default basketSlice.reducer



import { createSlice } from '@reduxjs/toolkit';
// import { storeCheckoutItems } from '@/utils/localStorage';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { id, title, price, image } = action.payload;

      state.items = [
        ...state.items,
        {
          id,
          title,
          price,
          image,
        },
      ];
    },

    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exists in the basket
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove book (id: ${action.payload.id}) as it's not found`);
      }
      state.items = newBasket;
    },

    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;

// Retrieve checkout items from local storage
export const getCheckoutItems = () => {
  try {
    const serializedItems = localStorage.getItem('checkoutItems');
    if (serializedItems === null) {
      return [];
    }
    return JSON.parse(serializedItems);
  } catch (error) {
    console.log('Error retrieving checkout items from local storage:', error);
    return [];
  }
};

// Store checkout items in local storage
export const storeCheckoutItems = (items) => {
  try {
    const serializedItems = JSON.stringify(items);
    localStorage.setItem('checkoutItems', serializedItems);
  } catch (error) {
    console.log('Error storing checkout items in local storage:', error);
  }
};
