import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      console.log(action.payload, "authreducer");
      state.auth = action.payload;
      console.log(state.auth, "fugfuyr4fuf4rhfifh4ifh4");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
