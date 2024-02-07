import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

type DetailsSlice = {
  currentCountry: Country | null;
  neighbors: string[];
  status: Status;
  error: string | null;
};

const initialState: DetailsSlice = {
  currentCountry: null,
  neighbors: [],
  status: 'idle',
  error: null,
};

export const loadCountryByName = createAsyncThunk<
  Country[],
  string,
  { extra: Extra; rejectValue: string }
>(
  'details/load-country',
  async (name, { extra: { client, api }, rejectWithValue }) => {
    try {
      const country: Country[] = await client
        .get(api.searchByCountry(name))
        .json();
      return country;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown Error');
    }
  }
);

export const loadNeighborsByBorder = createAsyncThunk<
  Country[],
  string[],
  { extra: Extra; rejectValue: string }
>(
  'details/load-neighbors',
  async (borders, { extra: { client, api }, rejectWithValue }) => {
    try {
      const neighbors: Country[] = await client
        .get(api.filterByCode(borders))
        .json();
      return neighbors;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown Error');
    }
  }
);

export const detailsSlice = createSlice({
  name: 'details',
  initialState: initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'received';
        state.currentCountry = action.payload[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.status = 'received';
        state.neighbors = action.payload.map((c) => c.name);
      })
      .addMatcher(
        (action: { type: string }) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        (action: PayloadAction<string>) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.status = 'rejected';
          state.error = action.payload || 'Cannot load data';
        }
      );
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
