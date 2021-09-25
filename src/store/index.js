import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
const store = configureStore({
  reducer: {
    books: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
