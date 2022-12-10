// components/Team.js
import React from 'react';
import BarChart from './BarChart';
import ChartWrapper from './ChartWrapper'

import {Heading} from "@aws-amplify/ui-react";
import * as d3 from "d3";

export function Team() {
  return (
    <div>
      <Heading level={2}>Team</Heading>
      <BarChart></BarChart>
    </div>
  );
}