import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  userType: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.token = action.payload?.token;
      state.isAuthenticated = true;
      state.user = action.payload?.data;
      state.userType = action.payload?.data?.role; // Added userType
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.userType = action.payload?.role; // Added userType
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.userType = "";
    },
  },
});

export const { setUserLoggedIn, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
export const currentUser = (state) => state.auth;
