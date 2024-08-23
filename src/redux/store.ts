import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./slices/Navigations.slice";
import authReducer from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    navigation: NavigationReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
