import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';

import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '../../consts/router';
import { RootState } from '../../store';
import { getFlight } from '../../store/flights/flights.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const FlightPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { oneFlight, flightLoading, flightError } = useAppSelector(
    (state: RootState) => state.flights
  );

  useEffect(() => {
    id && dispatch(getFlight(id));
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" sx={{ margin: 'auto', textAlign: 'center' }}>
        Flight Details
      </Typography>
      <Typography variant="h3" sx={{ margin: 'auto', textAlign: 'center' }}>
        Flight id: {id}
      </Typography>
      {flightError && (
        <Typography variant="h4" sx={{ margin: 'auto', textAlign: 'center' }}>
          Something went wrong. Can`t load flight.
        </Typography>
      )}
      {!flightError && flightLoading ? (
        <Typography variant="h4" sx={{ margin: 'auto', textAlign: 'center' }}>
          Loading flight info.
        </Typography>
      ) : (
        <>
          <Typography variant="h4" sx={{ margin: 'auto', textAlign: 'center' }}>
            {oneFlight?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ margin: 'auto', textAlign: 'center' }}
          >
            {oneFlight?.details}
          </Typography>
        </>
      )}
      <Button sx={{ marginTop: 2 }} onClick={() => navigate(ROUTES.HOME)}>
        Back to main page
      </Button>
    </Container>
  );
};
