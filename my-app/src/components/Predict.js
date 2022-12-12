// components/Predict.js
import React from 'react';
import {Heading} from "@aws-amplify/ui-react";
import Classification from "./Classification";
import {Col, Container, Row} from "react-bootstrap";
// import React from "@types/react";

export function Predict() {
  return (
    <div>
      <Heading level={2}>Prediction Result</Heading>
      Select Year:
      <select id="selectButtonDate"></select>
      <br/>
      <br/>
      Select Match:
      <select id="selectButtonMatch"></select>

      <div id="chart">
          <Classification></Classification>
        </div>
      <br/>
      <br/>
      <br/>
      <br/>
      
    </div>
  )
}