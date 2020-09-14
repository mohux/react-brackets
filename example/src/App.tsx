import React from 'react';
// import DoubleEl from './doubleElimination';
// import SingleEl from './components/singleElimination';
import DoubleEl from './components/doubleElimination';

const App = () => {
  return (
    <div>
      <h2>Single Elimination</h2>
      {/* <SingleEl /> */}
      <hr style={{ marginTop: 50, marginBottom: 50 }} />
      <h2>Double Elimination</h2>
      <DoubleEl />
    </div>
  );
};

export default App;
