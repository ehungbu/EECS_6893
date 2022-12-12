// components/Home.js
import React from 'react';
import {Button} from "react-bootstrap";
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