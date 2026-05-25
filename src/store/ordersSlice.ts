import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export type Order = {
  id: string;
  items: CartItem[];
  total: string;
  date: string;
  paymentMethod: 'apple' | 'card';
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: [] as Order[],
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.unshift(action.payload);
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
