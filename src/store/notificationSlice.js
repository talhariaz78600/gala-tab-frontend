import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    unread: [],
  },
  reducers: {
    setUnreadNotifications: (state, action) => {
      state.unread = action.payload;
    },
    addNotification: (state, action) => {
      const exists = state.unread.find((n) => n._id === action.payload._id);
      if (!exists) {
        state.unread.unshift(action.payload);
      }
    },
    clearUnreadNotifications: (state) => {
      state.unread = [];
    },
  },
});

export const {
  setUnreadNotifications,
  addNotification,
  clearUnreadNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
