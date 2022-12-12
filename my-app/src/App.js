//App.js
import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import { League } from './components/League';
import { Predict } from './components/Predict';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Team } from './components/Team';

import {
  BrowserRouter,
  // Switch,
  Route,
  // Link,
  Routes
} from "react-router-dom";

import './App.css';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Predict />} />
          <Route
            path="/league"
            element= {<League />}
          />
          <Route path="/team" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <MyRoutes />
  );
}

export default App;