import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { TCard } from '../../types/flight';

export interface ColumnProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isTarget?: boolean;
  isDnd?: boolean;
  accept?: TCard;
}
