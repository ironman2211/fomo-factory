import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface DataState {
  data: { _id: string; symbol: string; price: number; timestamp: string }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};


export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (symbol: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/data/${symbol}`);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;
