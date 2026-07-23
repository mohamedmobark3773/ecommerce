import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/types";

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<{ user: User | null; token?: string | null; refreshToken?: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token ?? state.token;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      state.isAuthenticated = Boolean(action.payload.user);
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
