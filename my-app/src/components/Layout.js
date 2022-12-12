// components/Layout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className='mb-3'>MLB Outcome Predictor</h1>
      <br/>
      <nav>
        <Button variant="outline-primary" onClick={() => navigate('/')}>Predict</Button>
        <Button variant="outline-primary" onClick={() => navigate('/league')}>
          League
        </Button>
        <Button variant="outline-primary" onClick={() => navigate('/team')}>
          Team
        </Button>
      </nav>

      <Outlet />
    </>
  );
}