import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import productSlice from './slices/productSlice.ts';

export const store = configureStore({
	reducer: {
		productSlice,
	},
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
