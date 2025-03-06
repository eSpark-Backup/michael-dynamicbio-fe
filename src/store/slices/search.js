import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { handleChange } = slice.actions;

export default slice.reducer;
