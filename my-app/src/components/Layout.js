// components/Layout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';

export function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/predict')}>
          Predictor
        </Button>
        <Button onClick={() => navigate('/league')}>
          League
        </Button>
        <Button onClick={() => navigate('/team')}>
          Team
        </Button>
      </nav>
      <Heading level={1}>MLB Outcome Predictor</Heading>
      <Outlet />
    </>
  );
}