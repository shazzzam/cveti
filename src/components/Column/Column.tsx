import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useDrop } from 'react-dnd';

import * as React from 'react';
import { FC } from 'react';

import { ColumnProps } from './Column.props';

export const Column: FC<ColumnProps> = ({ children, accept = 'NEXT' }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const bgColor: string = isOver ? (canDrop ? 'green' : 'red') : 'white';

  return (
    <Box
      sx={{
        border: '2px solid black',
        borderRadius: '10px',
        padding: 2,
        height: '100%',
        backgroundColor: bgColor,
      }}
      ref={drop}
      role="Dustbin"
    >
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
};
