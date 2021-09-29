import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import cartReducer from "./cartSlice";
import boolsReducer from "./bools";
const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer,
    bools: boolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
