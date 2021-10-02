import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (_, { getState }) => {
    const state = getState();
    const id = state.user.id;
    const cart = state.user.cart;
    return await axios.post("http://localhost:3000/add-to-cart", {
      cart,
      id,
    });
  }
);
const userSlice = createSlice({
  name: "cart",
  initialState: {
    id: "",
    fname: "",
    lname: "",
    email: "",
    cart: { items: [], totalQuantity: 0, totalPrice: 0 },
  },
  reducers: {
    appendUser(state, { payload }) {
      state.id = payload._id;
      state.fname = payload.fname;
      state.lname = payload.lname;
      state.email = payload.email;
      state.cart.items = payload.cart.items;
      state.cart.totalQuantity = payload.cart.totalQuantity;
      state.cart.totalPrice = payload.cart.totalPrice;
    },
    addToCart: (state, { payload }) => {
      let newBook = payload;
      const bookExist = state.cart.items.find(
        (book) => book._id === newBook._id
      );
      if (bookExist) {
        bookExist.quantity++;
        state.cart.totalPrice = state.cart.totalPrice + bookExist.price;
      } else {
        state.cart.totalPrice = state.cart.totalPrice + newBook.price;
        state.cart.items.push({ ...newBook, quantity: 1 });
      }
      state.cart.totalQuantity++;
    },
    addItemById(state, { payload }) {
      const book = state.cart.items.find((book) => book._id === payload);
      book.quantity++;
      state.cart.totalPrice = state.cart.totalPrice + book.price;
      state.cart.totalQuantity++;
    },
    removeItemById(state, { payload }) {
      const book = state.cart.items.find((book) => book._id === payload);
      if (book.quantity === 1)
        state.cart.items = state.cart.items.filter(
          (book) => book._id !== payload
        );
      else book.quantity--;
      state.cart.totalPrice = state.cart.totalPrice - book.price;
      state.cart.totalQuantity--;
    },
  },
  extraReducers: {
    [addItem.pending]: (state) => {
      console.log("pending");
    },
    [addItem.fulfilled]: (state, { payload }) => {
      console.log("full");
    },
    [addItem.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
