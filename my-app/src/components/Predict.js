// components/Predict.js
import React from 'react';
import Classification from "./Classification";

export function Predict() {
  return (
    <div>
      <h2 className='mb-3'>Prediction Result</h2>
      <br/>
      Select Date:
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