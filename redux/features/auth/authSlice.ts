import { fullUserType } from '@/types/full-user';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface fullUserInterface {
  fullUser: fullUserType | null;
}

const initialState: fullUserInterface = {
  fullUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<fullUserType>) => {
      state.fullUser = action.payload;
    },

    logout: (state) => {
      state.fullUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
