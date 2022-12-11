// components/Team.js
import React from 'react';
import {Heading} from "@aws-amplify/ui-react";
import LineGraph from "./LineGraph";
import Pie from "./Pie"
import Spider from "./Spider"
import { Container, Col, Row} from "react-bootstrap";
import TeamPlayersTable from "./TeamPlayersTable";



export function Team() {
  return (
    <div>
      <Heading level={2}>Team</Heading>
      <br/>
      <select id="selectButtonTeam"></select>
      <select id="selectButtonTeamPie" hidden></select>
      <select id="selectButtonCat"></select>
      <select id="selectButtonSeason"></select>
      <select id="selectButtonSeasonTable" hidden></select>
      <select id="selectButtonTeamTable" hidden></select>
      <select id="selectButtonSeasonSpider" hidden></select>
      <select id="selectButtonTeamSpider" hidden></select>
      <Spider></Spider>
      <Container>
        <Row>
          <Col>
            <div id="linegraph">
              <LineGraph></LineGraph>
            </div>
          </Col>
          <Col>
            <div id="pie">
              <Pie></Pie>
            </div>
          </Col>
        </Row>
        <Row>
          <div id="mydataviz"></div>
          <div id="spider"></div>
        </Row>
        <Row>
          <TeamPlayersTable></TeamPlayersTable>
          <Col>
            <div id="tablehitters"></div>
          </Col>
          <Col>
            <div id="tablepitchers"></div>
          </Col>
        </Row>
      </Container>



    </div>
  );
}