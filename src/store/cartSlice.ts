import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
};

type AddItemPayload = Omit<CartItem, 'quantity'>;
type UpdateQuantityPayload = { id: string; quantity: number };

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    // If product is already in cart, increment quantity; otherwise add with quantity 1
    addItem(state, action: PayloadAction<AddItemPayload>) {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      return state.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<UpdateQuantityPayload>) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => item.id !== id);
      }
      const item = state.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart() {
      return [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
