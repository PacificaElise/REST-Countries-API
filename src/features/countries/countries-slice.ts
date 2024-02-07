import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Country, Extra, Status } from 'types';

export const loadCountries = createAsyncThunk<
  Country[],
  undefined,
  { state: { countries: CountrySlice }; extra: Extra; rejectValue: string }
>(
  'countries/load-countries',
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const allCountries: Country[] = await client
        .get(api.ALL_COUNTRIES)
        .json();
      return allCountries;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Unknown Error');
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        countries: { status },
      } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  }
);

type CountrySlice = {
  status: Status;
  error: string | null;
  list: Country[];
};

const initialState: CountrySlice = {
  status: 'idle',
  error: null,
  list: [],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCountries.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadCountries.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload || 'Cannot load data';
    });
    builder.addCase(loadCountries.fulfilled, (state, action) => {
      state.status = 'received';
      state.list = action.payload;
    });
  },
});

export const countriesReducer = countriesSlice.reducer;
