import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   items: [],
}

export const basketSlice = createSlice({
   name: "basket",
   initialState,
   reducers: {
      // addToBasket: (state, action) => {
      //    state.items = [...state.items, action.payload]
      // },

      addToBasket: (state, action) => {
         const { id, title, price,  description, image, pdf  } = action.payload
      
         state.items = [...state.items, {
            id,
            title,
            price,
            description,
            image,
            pdf,
      
         }]
      },
      
      removeFromBasket: (state, action) => {
         const index = state.items.findIndex(
            (basketItem) => basketItem.id === action.payload.id
         )

         let newBasket = [...state.items]
         if (index >= 0) {
            // the item exist in the basket
            newBasket.splice(index, 1)
         } else {
            console.warn(
               `Cant remove book (id: ${action.payload.id}) as its not found`
            )
         }
         state.items = newBasket
      },
   },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items
export const selectTotal = (state) =>
   state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer


