import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TFlight } from '../../types/flight';

export interface FlightsState {
  isLoading: boolean;
  isError: boolean;
  past: TFlight[];
  next: TFlight[];
  my: TFlight[];
  isOrderProcessing: boolean;
  isOrderError: boolean;
  currentFlight: string | null;
  isCancelProcessing: boolean;
  isCancelError: boolean;
  oneFlight: TFlight | null;
  flightId: string | null;
  flightLoading: boolean;
  flightError: boolean;
}

const initialState: FlightsState = {
  isLoading: false,
  isError: false,
  past: [],
  next: [],
  my: [],
  isOrderProcessing: false,
  isOrderError: false,
  currentFlight: null,
  isCancelProcessing: false,
  isCancelError: false,
  flightLoading: false,
  flightId: null,
  flightError: false,
  oneFlight: null,
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    getFlights: (state: FlightsState): void => {
      state.isError = false;
      state.isLoading = true;
    },
    getFlightsSuccess: (state: FlightsState): void => {
      state.isError = false;
      state.isLoading = false;
    },
    getFlightsFailure: (state: FlightsState): void => {
      state.isError = true;
      state.isLoading = false;
    },
    setPast: (state: FlightsState, action: PayloadAction<TFlight[]>): void => {
      state.past = action.payload;
    },
    setNext: (state: FlightsState, action: PayloadAction<TFlight[]>): void => {
      state.next = action.payload;
    },
    setMy: (state: FlightsState, action: PayloadAction<TFlight[]>): void => {
      state.my = action.payload;
    },
    makeOrder: (state: FlightsState, action: PayloadAction<string>): void => {
      state.isOrderProcessing = true;
      state.isOrderError = false;
      state.currentFlight = action.payload;
    },
    makeOrderSuccess: (state: FlightsState): void => {
      state.isOrderError = false;
      state.isOrderProcessing = false;
      state.currentFlight = null;
    },
    makeOrderFailure: (state: FlightsState): void => {
      state.isOrderProcessing = false;
      state.isOrderError = true;
      state.currentFlight = null;
    },
    cancelOrder: (state: FlightsState, action: PayloadAction<string>): void => {
      state.isCancelProcessing = true;
      state.isCancelError = false;
      state.currentFlight = action.payload;
    },
    cancelOrderSuccess: (state: FlightsState): void => {
      state.isCancelError = false;
      state.isCancelProcessing = false;
      state.currentFlight = null;
    },
    cancelOrderFailure: (state: FlightsState): void => {
      state.isCancelProcessing = false;
      state.isCancelError = true;
      state.currentFlight = null;
    },
    getFlight: (state: FlightsState, action: PayloadAction<string>): void => {
      state.flightLoading = true;
      state.flightError = false;
      state.flightId = action.payload;
    },
    getFlightSuccess: (state: FlightsState): void => {
      state.flightLoading = false;
      state.flightError = false;
    },
    getFlightFailure: (state: FlightsState): void => {
      state.flightLoading = false;
      state.flightError = true;
    },
    setFlight: (state: FlightsState, action: PayloadAction<TFlight>): void => {
      state.oneFlight = action.payload;
    },
  },
});

export const {
  getFlights,
  getFlightsSuccess,
  getFlightsFailure,
  getFlight,
  getFlightSuccess,
  getFlightFailure,
  setFlight,
  setPast,
  setNext,
  setMy,
  makeOrder,
  makeOrderSuccess,
  makeOrderFailure,
  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,
} = flightsSlice.actions;

export default flightsSlice.reducer;
