import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import dataReducer from './dataSlice';
import filterSlice from './filterSlice';

const rootReducer = combineReducers({
  data: dataReducer,
  filter: filterSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filter', 'data'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof rootReducer>;
