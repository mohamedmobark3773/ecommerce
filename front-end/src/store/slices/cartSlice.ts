import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem } from "@/types";

const initialState: Cart = {
  id: "",
  user: null,
  items: [],
  itemsCount: 0,
  totalItems: 0,
  subtotal: 0,
  total: 0,
  currency: "USD",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Partial<Cart> | null | undefined>) => {
      if (!action.payload) {
        Object.assign(state, initialState);
        return;
      }

      state.id = action.payload.id ?? state.id;
      state.user = action.payload.user ?? state.user;
      state.items = action.payload.items ?? state.items;
      state.itemsCount = action.payload.itemsCount ?? state.items.length;
      state.totalItems = action.payload.totalItems ?? state.items.length;
      state.subtotal = action.payload.subtotal ?? state.subtotal;
      state.total = action.payload.total ?? state.total;
      state.currency = action.payload.currency ?? state.currency;
      state.createdAt = action.payload.createdAt ?? state.createdAt;
      state.updatedAt = action.payload.updatedAt ?? state.updatedAt;
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.itemsCount = state.items.length;
      state.totalItems = state.items.length;
      state.subtotal = state.items.reduce((sum, item) => sum + (item.subtotal ?? item.quantity * item.price), 0);
      state.total = state.subtotal;
    },
    removeCartItemById: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.itemsCount = state.items.length;
      state.totalItems = state.items.length;
      state.subtotal = state.items.reduce((sum, item) => sum + (item.subtotal ?? item.quantity * item.price), 0);
      state.total = state.subtotal;
    },
    clearCart: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setCart, addCartItem, removeCartItemById, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
