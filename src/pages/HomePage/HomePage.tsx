import { Typography } from '@mui/material';
import { Container, Box } from '@mui/system';
import PublicIcon from '@mui/icons-material/Public';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import * as React from 'react';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFlights } from '../../store/flights/flights.slice';
import { RootState } from '../../store';

import { Past, Next, My } from './components/';
import { HomePageProps } from './HomePage.props';

export const HomePage: FC<HomePageProps> = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector(
    (state: RootState) => state.flights
  );

  useEffect(() => {
    dispatch(getFlights());
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        sx={{
          margin: 'auto',
          textAlign: 'center',
        }}
      >
        Explore The Space
        <PublicIcon sx={{ fontSize: 60 }} />
      </Typography>
      {isError && (
        <Typography variant="h4" sx={{ margin: 'auto', textAlign: 'center' }}>
          Something went wrong. Can`t load flights.
        </Typography>
      )}
      {!isError && isLoading ? (
        <Typography variant="h4" sx={{ margin: 'auto', textAlign: 'center' }}>
          Loading flights
        </Typography>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '30%' }}>
              <Past />
            </Box>
            <Box sx={{ width: '30%' }}>
              <Next />
            </Box>
            <Box sx={{ width: '30%' }}>
              <My />
            </Box>
          </Box>
        </DndProvider>
      )}
    </Container>
  );
};
