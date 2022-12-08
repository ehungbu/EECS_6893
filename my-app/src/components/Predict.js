// components/Predict.js
import { Heading } from '@aws-amplify/ui-react';
import {Button, Card, Col, Row} from "react-bootstrap";
import { useState } from 'react';
import SearchBar from "./SearchBar";
// import React from "@types/react";

export function Predict() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    console.log(inputs)
  }

  function handleSearchUserQuery(event) {
    console.log(inputs)
  }

  return (
    <div>
      <br/>
      <Heading level={2}>Predict Your MLB Outcome!</Heading>
      <br/>

      <SearchBar
        handleSubmit={handleSearchUserQuery}
        handleChange={handleChange}
        inputs={inputs}>
      </SearchBar>
    </div>
  )
}