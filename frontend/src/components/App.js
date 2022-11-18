import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import GameModePicker from './GameModePicker';
import Login from './Login'
import Register from './Register';

export default function App(props) {
  return (
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/game/*' element={<GameModePicker />} />
      <Route path='/login/' element={<Login defaultNext="/game/" />} />
      <Route path='/register/' element={<Register defaultNext="/game/" />} />
    </Routes>
  );
}
