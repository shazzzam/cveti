import { configureStore } from '@reduxjs/toolkit';
import { all, call } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import flightsSlice from './flights/flights.slice';
import { flightsSaga } from './flights/flights.saga';

const saga = createSagaMiddleware();
function* rootSaga() {
  yield all([call(flightsSaga)]);
}

export const store = configureStore({
  reducer: {
    flights: flightsSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
