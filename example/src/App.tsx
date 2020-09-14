import React from 'react';
import DoubleElimination from './components/double-elimination';
import LoadingBracket from './components/loading';
import SingleElimination from './components/single-elimination';

const App = () => {
  return (
    <div>
      <h3>Loading Skeleton</h3>
      <hr />
      <LoadingBracket />
      <h3>Single Elimination</h3>
      <hr />
      <SingleElimination />
      <h3>Double Elimination</h3>
      <hr />
      <DoubleElimination />
    </div>
  );
};

export default App;
