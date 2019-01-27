import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar';
import Timer from './Timer';

import Footer from './Footer';


const App = () => {
  return(
    <div className="App">
      <Navbar/>
      <Timer/>
      <Footer/>
    </div>
  );
};

export default App;
