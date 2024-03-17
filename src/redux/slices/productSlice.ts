import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store.ts';

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type Product = {
	id: number;
	image: string;
	title: string;
	price: number;
	description: string;
	count: number;
};

interface ProductSliceState {
	items: Product[];
	status: Status;
}

const initialState: ProductSliceState = {
	items: [],
	status: Status.LOADING,
};

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
	const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products');
	return data;
});

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count++;
			}
		},
		removeItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem && findItem.count > 1) {
				findItem.count--;
			}
		},
		deleteItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		setProducts(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.items = [];
			state.status = Status.LOADING;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.items = action.payload;
			state.items.forEach((obj) => (obj.count = 1));
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchProducts.rejected, (state) => {
			state.items = [];
			state.status = Status.ERROR;
		});
	},
});

export const selectProducts = (state: RootState) => state.productSlice.items;
export const selectProductsData = (state: RootState) => state.productSlice;
export const selectProductById = (id: number) => (state: RootState) => state.productSlice.items.find((obj) => obj.id === id);

export const { addItem, removeItem, deleteItem, setProducts } = productSlice.actions;

export default productSlice.reducer;
