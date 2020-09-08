import React from 'react';

import { CircularProgress } from '@material-ui/core';

export const Preloader = ({ size, isCenter }) => {
  return (
    <div style={isCenter && { width: size, margin: '0 auto' }}>
      <CircularProgress size={size} />
    </div>
  );
};
