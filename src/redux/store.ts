import { configureStore } from '@reduxjs/toolkit';
import NavigationReducer from './slices/Navigations.slice';

const store = configureStore({
  reducer: {
    navigation: NavigationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;