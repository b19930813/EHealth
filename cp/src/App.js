import './App.css';
import React, { Component } from 'react';
import Bar from './Component/Frame/bar'
import Main from './Component/Frame/main'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from './Component/Frame/register'
function App() {
  return (
    <div>
    <Bar/>
    <BrowserRouter>
      <Routes  >
        <Route path="/" element={<Main />} />
        <Route path='/Register' element={<Register />} />
      </Routes  >
    </BrowserRouter>
  </div>
  );
}

export default App;
