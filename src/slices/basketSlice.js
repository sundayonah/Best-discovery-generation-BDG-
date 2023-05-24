// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//    items: [],
// }

// export const basketSlice = createSlice({
//    name: "basket",
//    initialState,
//    reducers: {
//       addToBasket: (state, action) => {
//          state.items = [...state.items, action.payload]
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

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   items: [],
}

// Load basket state from local storage if available
if (typeof window !== "undefined") {
   const savedBasket = localStorage.getItem("basket")
   if (savedBasket) {
      initialState.items = JSON.parse(savedBasket)
   }
}

export const basketSlice = createSlice({
   name: "basket",
   initialState,
   reducers: {
      addToBasket: (state, action) => {
         state.items = [...state.items, action.payload]
         if (typeof window !== "undefined") {
            localStorage.setItem("basket", JSON.stringify(state.items)) // Save basket state to local storage
         }
      },
      removeFromBasket: (state, action) => {
         const index = state.items.findIndex(
            (basketItem) => basketItem.id === action.payload.id
         )

         let newBasket = [...state.items]
         if (index >= 0) {
            // the item exists in the basket
            newBasket.splice(index, 1)
            state.items = newBasket
            if (typeof window !== "undefined") {
               localStorage.setItem("basket", JSON.stringify(state.items)) // Save basket state to local storage
            }
         } else {
            console.warn(
               `Can't remove book (id: ${action.payload.id}) as it's not found`
            )
         }
      },
   },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items
export const selectTotal = (state) =>
   state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer
