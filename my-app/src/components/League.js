// components/Team.js
import React from 'react';
import {Heading} from "@aws-amplify/ui-react";
import LeagueTeamBar from "./LeagueTeamBar";
import {Col, Container, Row} from "react-bootstrap";
import TopPlayers from "./TopPlayers";


export function League() {
  return (
    <div>
      <Heading level={2}>League Visualizations</Heading>
      Select Year:
      <select id="selectButtonSeason"></select>
      <br/>
      <br/>
      <select id="selectButtonCat"></select>
      <br/>
      <div id="teambar">
        <LeagueTeamBar></LeagueTeamBar>
      </div>

      <br/>
      <br/>
      <select id="selectButtonSeasonTopPlayers" hidden></select>

      <br/>
      <TopPlayers></TopPlayers>
      <Container>
        <Row>
          <Col>
            <select id="selectButtonCatPitch"></select>

            <div id="toppitchers"></div>
          </Col>
          <Col>
            <select id="selectButtonCatHitter"></select>
            <div id="tophitters"></div>
          </Col>
        </Row>
      </Container>

    </div>
  );

}