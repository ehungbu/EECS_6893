// components/Home.js
import React from 'react';
import {Button, Col, Row, Card, Badge} from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import {Heading} from "@aws-amplify/ui-react";


export function Home() {
  function handleButton() {
    console.log('BUTTON')
  }


  return (
    <div>
      <Heading level={2}>This is our home page!</Heading>
      <br/>
      <Button onClick={handleButton}>Click Me!</Button>

    </div>
  );


}