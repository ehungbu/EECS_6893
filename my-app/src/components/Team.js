// components/Team.js
import React from 'react';
import {Heading} from "@aws-amplify/ui-react";
import * as d3 from "d3";
import LineGraph from "./LineGraph";
import Pie from "./Pie"

export function Team() {
  return (
    <div>
      <Heading level={2}>Team</Heading>
      <br/>
      <select id="selectButtonTeam"></select>
      <select id="selectButtonTeamPie" hidden></select>
      <select id="selectButtonCat"></select>
      <select id="selectButtonSeason"></select>
      {/*<div id="dataviz">*/}
      {/*  <BarChart></BarChart>*/}
      {/*</div>*/}

      <div id="linegraph">
        <LineGraph></LineGraph>
      </div>
      <div id="pie">
        <Pie></Pie>
      </div>
    </div>
  );
}