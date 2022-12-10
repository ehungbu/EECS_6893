// components/Team.js
import React from 'react';
import {Heading} from "@aws-amplify/ui-react";
import * as d3 from "d3";
import LineGraph from "./LineGraph";

export function Team() {
  return (
    <div>
      <Heading level={2}>Team</Heading>
      <br/>
      <select id="selectButtonTeam"></select>
      <select id="selectButtonCat"></select>
      {/*<div id="dataviz">*/}
      {/*  <BarChart></BarChart>*/}
      {/*</div>*/}

      <div id="linegraph">
        <LineGraph></LineGraph>
      </div>
    </div>
  );
}