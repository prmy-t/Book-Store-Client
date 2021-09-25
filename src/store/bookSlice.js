import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAll = createAsyncThunk("books/fetchAll", async () =>
  axios.get("http://localhost:3000/get-all-books")
);

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], status: "pending" },
  extraReducers: {
    [fetchAll.pending]: (state) => {
      state.status = "pending";
    },
    [fetchAll.fulfilled]: (state, { payload }) => {
      state.books = payload.data;
      state.state = "success";
    },
    [fetchAll.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default bookSlice.reducer;
