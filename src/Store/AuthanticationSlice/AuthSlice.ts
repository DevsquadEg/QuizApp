import { createSlice } from "@reduxjs/toolkit";
import { quizApi } from "../../pages/Quizzes/quizApi";
const initialState = {
  token: localStorage.getItem("token") || null,
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      quizApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.data.accessToken;
        state.user = action.payload.data.profile;
        localStorage.setItem("token", action.payload.data.accessToken);
        sessionStorage.setItem(
          "user",
          JSON.stringify(action.payload.data.profile)
        );
      }
    );
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
