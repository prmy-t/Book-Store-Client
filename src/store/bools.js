import { createSlice } from "@reduxjs/toolkit";

const boolsSlice = createSlice({
  name: "bools",
  initialState: {
    isLoggedIn: false,
    loginModal: { show: false, type: "", error: "" },
  },
  reducers: {
    setIsLoggedIn(state, { payload }) {
      state.isLoggedIn = payload;
    },
    setLoginModal(state, { payload }) {
      const [show, type, error] = payload;
      state.loginModal.show = show;
      state.loginModal.type = type;
      state.loginModal.error = error;
    },
    setLoginModalError(state, { payload }) {
      state.loginModal.error = payload;
    },
  },
});

export const boolsAction = boolsSlice.actions;
export default boolsSlice.reducer;
