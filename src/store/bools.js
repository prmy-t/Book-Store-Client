import { createSlice } from "@reduxjs/toolkit";

const boolsSlice = createSlice({
  name: "bools",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn(state, { payload }) {
      state.isLoggedIn = payload;
    },
  },
});

export const boolsAction = boolsSlice.actions;
export default boolsSlice.reducer;
