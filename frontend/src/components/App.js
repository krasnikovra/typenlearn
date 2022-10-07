import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import HomePage from './HomePage';
import GameModePicker from './GameModePicker';

export default function App(props) {
  return (
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/game/*' element={<GameModePicker />} />
    </Routes>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
