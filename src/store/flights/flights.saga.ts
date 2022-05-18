import { call, put, select, takeEvery } from 'redux-saga/effects';

import { API_LAUNCHES } from '../../consts/api.routes';
import { TFlight } from '../../types/flight';

import { RootState } from '..';

import {
  cancelOrderFailure,
  cancelOrderSuccess,
  getFlightFailure,
  getFlightsFailure,
  getFlightsSuccess,
  getFlightSuccess,
  makeOrderFailure,
  makeOrderSuccess,
  setFlight,
  setMy,
  setNext,
  setPast,
} from './flights.slice';

function* workGetFlights() {
  try {
    const response: Response = yield call(() => fetch(API_LAUNCHES));
    const jsonFlights: TFlight[] = yield response.json();
    const now = Date.now() / 1000;
    const past: TFlight[] = [];
    const next: TFlight[] = [];
    jsonFlights.map((flight) => {
      flight.date_unix < now ? past.push(flight) : next.push(flight);
    });
    yield put(setPast(past));
    yield put(setNext(next));
    yield put(setMy([]));
    yield put(getFlightsSuccess());
  } catch {
    yield put(getFlightsFailure());
  }
}

function* workMakeOrder() {
  try {
    const {
      flights: { currentFlight, next, my },
    }: RootState = yield select((state: RootState) => state);
    const nextLocal = [...next];

    const idx = next.findIndex(
      (flight: TFlight) => flight.id === currentFlight
    );

    const order = nextLocal.splice(idx, 1);
    yield put(setMy([...my, ...order]));
    yield put(setNext([...nextLocal]));
    yield put(makeOrderSuccess());
  } catch (e) {
    yield put(makeOrderFailure());
  }
}

function* workCancelOrder() {
  try {
    const {
      flights: { currentFlight, next, my },
    }: RootState = yield select((state: RootState) => state);
    const myLocal = [...my];

    const idx = my.findIndex((flight: TFlight) => flight.id === currentFlight);

    const order = myLocal.splice(idx, 1);
    yield put(setMy([...myLocal]));
    yield put(setNext([...order, ...next]));
    yield put(cancelOrderSuccess());
  } catch {
    yield put(cancelOrderFailure());
  }
}

function* workGetFlight() {
  try {
    const flightId: string = yield select(
      (state: RootState) => state.flights.flightId
    );
    const response: Response = yield call(() =>
      fetch(`${API_LAUNCHES}/${flightId}`)
    );
    const jsonFlight: TFlight = yield response.json();
    if (jsonFlight) {
      yield put(setFlight(jsonFlight));
      yield put(getFlightSuccess());
    } else {
      yield put(getFlightFailure());
    }
  } catch {
    yield put(getFlightFailure());
  }
}

export function* flightsSaga() {
  yield takeEvery('flights/getFlights', workGetFlights);
  yield takeEvery('flights/makeOrder', workMakeOrder);
  yield takeEvery('flights/cancelOrder', workCancelOrder);
  yield takeEvery('flights/getFlight', workGetFlight);
}
