import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar';
import Timer from './Timer';
import SetTime from './SetTime';
import Footer from './Footer';


const App = () => {
  return(
    <div className="App">
      <Navbar/>
      <Timer/>
      <SetTime/>
      <Footer/>
    </div>
  );
};

export default App;
