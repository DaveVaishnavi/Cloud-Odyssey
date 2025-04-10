import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload.order);
    },

    updateOrder: (state, action) => {
      state.orders[action.payload.index] = action.payload.order;
    },
  },
});

export const { addOrder, updateOrder } = orderSlice.actions;

export default orderSlice.reducer;