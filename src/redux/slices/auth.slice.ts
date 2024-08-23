import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
}

const key = "authToken";

const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem(key, token);
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(key);
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(key);
};

const authSlice = createSlice({
  name: "auth", // Cambia esto para que sea consistente
  initialState: {
    token: getTokenFromLocalStorage(),
  } as AuthState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      saveTokenToLocalStorage(action.payload.token);
    },
    logout(state) {
      state.token = null;
      removeTokenFromLocalStorage();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer; // Exporta el reducer con el nombre `auth` aquí
