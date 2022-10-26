import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import GameModePicker from './GameModePicker';
import Login from './Login'

export default function App(props) {
  return (
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/game/*' element={<GameModePicker />} />
      <Route path='/login/' element={<Login />} />
    </Routes>
  );
}
