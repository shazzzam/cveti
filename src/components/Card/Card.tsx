import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import { FC } from 'react';

import { TFlight } from '../../types/flight';
import { ROUTES } from '../../consts/router';

import { CardProps } from './Card.props';

export const Card: FC<CardProps> = ({
  flight,
  isDnd = false,
  type = 'NEXT',
  dropCallback,
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type,
    item: flight,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<TFlight>();
      if (item && dropResult) {
        dropCallback && dropCallback(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`${ROUTES.FLIGHT}/${flight.id}`);
  };

  return isDnd ? (
    <div ref={dragPreview}>
      <Box
        sx={{
          border: '1px solid black',
          borderRadius: '8px',
          padding: 1,
          opacity: isDragging ? 0.5 : 1,
        }}
        role="Handle"
        ref={drag}
        onClick={clickHandler}
      >
        <Typography variant="h4">{flight.name}</Typography>
        <Typography variant="subtitle1">{flight.details}</Typography>
      </Box>
    </div>
  ) : (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '8px',
        padding: 1,
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={clickHandler}
    >
      <Typography variant="h4">{flight.name}</Typography>
      <Typography variant="subtitle1">{flight.details}</Typography>
    </Box>
  );
};
