import * as React from 'react';
import { FC } from 'react';

import { Column, Card } from '../../../../components';
import { useAppSelector } from '../../../../store/hooks';

import { PastProps } from './Past.props';

export const Past: FC<PastProps> = () => {
  const { past } = useAppSelector((state) => state.flights);

  return (
    <Column accept="PAST" isDnd={false}>
      {past.map((flight) => (
        <Card key={flight.id} flight={flight} isDnd={false} type="PAST" />
      ))}
    </Column>
  );
};
