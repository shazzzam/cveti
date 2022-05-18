import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { TCard, TFlight } from '../../types/flight';

// eslint-disable-next-line
type FlightReducerType = (flight: TFlight) => void;

export interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isDnd?: boolean;
  flight: TFlight;
  type?: TCard;
  dropCallback?: FlightReducerType;
}
