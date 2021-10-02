import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import userReducer from "./userSlice";
import boolsReducer from "./bools";
const store = configureStore({
  reducer: {
    books: bookReducer,
    user: userReducer,
    bools: boolsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
