// SortButton.js
import React from 'react';

const SortButton = ({ onClick, sortOrder }) => (
  <button onClick={onClick}>
    Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
  </button>
);

export default SortButton;
