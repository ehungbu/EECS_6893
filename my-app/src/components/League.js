// components/Team.js
import React from 'react';
import {Heading} from "@aws-amplify/ui-react";
import LeagueTeamBar from "./LeagueTeamBar";


export function League() {
  return (
    <div>
      <Heading level={2}>League</Heading>
      <br/>
      <select id="selectButtonSeason"></select>
      <select id="selectButtonCat"></select>

      <div id="teambar">
        <LeagueTeamBar></LeagueTeamBar>
      </div>
    </div>
  );

}