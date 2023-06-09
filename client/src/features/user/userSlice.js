import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "63701cc1f03239f09e00018a",
  name: "",
  email: "",
  role: "",
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
