import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    value: string;
    category: 'crypto' | 'stock';
}

const initialState: FilterState = {
    category: 'crypto',
    value: 'bitcoin',
};

const filterSlice = createSlice({
    name: 'symbol',
    initialState,
    reducers: {
        setSymbol: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setCategory: (state, action: PayloadAction<'crypto' | 'stock'>) => {
            state.category = action.payload;
        },
    },
});

export const { setSymbol, setCategory } = filterSlice.actions;
export default filterSlice.reducer;
