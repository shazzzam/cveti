import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import * as React from 'react';
import { FC, useState } from 'react';

import { Column, Card } from '../../../../components';
import { cancelOrder } from '../../../../store/flights/flights.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { TFlight } from '../../../../types/flight';

import { MyProps } from './My.props';

export const My: FC<MyProps> = () => {
  const { my } = useAppSelector((state) => state.flights);
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentFlight, setCurrentFlight] = useState<string>('');

  const dropCallback = (flight: TFlight) => {
    setCurrentFlight(flight.id);
    setModalOpen(true);
  };

  const acceptCallback = () => {
    setModalOpen(false);
    dispatch(cancelOrder(currentFlight));
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Column accept="NEXT">
      {my.map((flight) => (
        <Card
          key={flight.id}
          flight={flight}
          isDnd={true}
          type="MY"
          dropCallback={dropCallback}
        />
      ))}
      <Dialog open={modalOpen}>
        <DialogContent>
          <DialogContentText>
            Do you really want to cancel your flight?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptCallback}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </Column>
  );
};
