import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: {},
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signup: (state, action) => {
      console.log(action.payload);
      state.signupData = action.payload;
      console.log(state.signupData, "fugfuyr4fuf4rhfifh4ifh4");
    },
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
