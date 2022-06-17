import React from 'react';

import Navbar from './components/Navbar';
import MuiNav from './components/MuiNav';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="mainDiv">
        <MuiNav />
        <div id="routes">
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default App;
