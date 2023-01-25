import { createSlice } from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";

const initialState = {
  auth: {},
  // followerList: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.auth = action.payload;
    },
    // getFollowerList: async (state, action) => {
    //   const followerList = await UserApi.getFollowingList(state.auth.token, state.auth.username)
    //   if (followerList.status == 200) {
    //     state.followerList = followerList
    //   }
    // }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
