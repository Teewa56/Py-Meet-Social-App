import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div style={{
      position : 'absolute',
      top : "50%",
      left : "50%",
      transform : "translate(-50%, -50%)"
    }}>
      <CircularProgress disableShrink />
    </div>
  );
}
