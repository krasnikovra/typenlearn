import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { HomePage } from './HomePage';
import { Game } from './Game';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/game' element={<Game />} />
      </Routes>
    );
  }
}

export default App;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
