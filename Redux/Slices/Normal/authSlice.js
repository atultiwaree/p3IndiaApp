import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    token: undefined,
    userId: undefined,
    userName: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUserInformation: (state, action) => {
      
      console.log(action.payload, "::::")

      state.user = { ...action?.payload };
    },
  },
});

export const { currentUserInformation } = authSlice.actions;

export default authSlice.reducer;
