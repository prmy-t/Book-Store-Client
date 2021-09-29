import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, totalPrice: 0 },
  reducers: {
    placeCart(state, { payload }) {
      state.items = payload.items;
      state.totalQuantity = payload.totalQuantity;
      state.totalPrice = payload.totalPrice;
    },
    addToCart(state, { payload }) {
      let newBook = payload;
      const bookExist = state.items.find((book) => book._id === newBook._id);
      if (bookExist) {
        bookExist.quantity++;
        state.totalPrice = state.totalPrice + bookExist.price;
      } else {
        state.totalPrice = state.totalPrice + newBook.price;
        state.items.push({ ...newBook, quantity: 1 });
      }
      state.totalQuantity++;
    },
    addItemById(state, { payload }) {
      const book = state.items.find((book) => book._id === payload);
      book.quantity++;
      state.totalPrice = state.totalPrice + book.price;
      state.totalQuantity++;
    },
    removeItemById(state, { payload }) {
      const book = state.items.find((book) => book._id === payload);
      if (book.quantity === 1)
        state.items = state.items.filter((book) => book._id !== payload);
      else book.quantity--;
      state.totalPrice = state.totalPrice - book.price;
      state.totalQuantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
