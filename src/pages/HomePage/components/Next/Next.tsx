import * as React from 'react';
import { FC } from 'react';

import { Column, Card } from '../../../../components';
import { makeOrder } from '../../../../store/flights/flights.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { TFlight } from '../../../../types/flight';

import { NextProps } from './Next.props';

export const Next: FC<NextProps> = () => {
  const { next } = useAppSelector((state) => state.flights);
  const dispatch = useAppDispatch();

  const dropCallback = (flight: TFlight) => dispatch(makeOrder(flight.id));

  return (
    <Column accept="MY">
      {next.map((flight) => (
        <Card
          key={flight.id}
          flight={flight}
          isDnd={true}
          type="NEXT"
          dropCallback={dropCallback}
        />
      ))}
    </Column>
  );
};
