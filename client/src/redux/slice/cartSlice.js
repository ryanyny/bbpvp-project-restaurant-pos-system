import {createSlice} from "@reduxjs/toolkit"

const initialState = []

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.push(action.payload)
    },
    removeItem: (state, action) => {
      return state.filter((item) => item._id !== action.payload)
    },
    clearCart: () => {
      return []
    },
  },
})

export const getTotalPrice = (state) =>
  state.cart.reduce((total, item) => total + (item.totalPrice || 0), 0)

export const {addItems, removeItem, clearCart} = cartSlice.actions
export default cartSlice.reducer