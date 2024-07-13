// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import dataReducer from './dataSlice';
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    filter: filterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;

