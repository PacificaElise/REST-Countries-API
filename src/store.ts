import ky from 'ky';

import { configureStore } from '@reduxjs/toolkit';

import * as api from './config';
import { themeReducer } from './features/theme/theme-slice';
import { controlsReducer } from './features/controls/controls-slice';
import { countriesReducer } from './features/countries/countries-slice';
import { detailsReducer } from './features/details/details-slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countriesReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: ky,
          api,
        },
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
