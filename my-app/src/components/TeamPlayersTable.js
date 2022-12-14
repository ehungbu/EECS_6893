import React, {Component} from 'react';
import * as d3 from "d3";

class TeamPlayersTable extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("TeamPlayersTable Component")

    let curTeam = "ARI";
    let curYear = "2016"

    let hitter_data = []
    let pitcher_data = []
    let cols_hitter;
    let cols_pitcher;
    d3.csv('https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/hitter_data.csv', function (hd) {
      cols_hitter = Object.keys(hd)
      hitter_data.push(Object.values(hd))
    }).then(_ => {
      d3.csv('https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/pitcher_data.csv', function (pd) {
        cols_pitcher = Object.keys(pd)
        pitcher_data.push(Object.values(pd))
      }).then(_ => {
        hitter_data = [cols_hitter].concat(hitter_data)
        pitcher_data = [cols_pitcher].concat(pitcher_data)
        // console.log(hitter_data)
        // console.log(pitcher_data)
        var teams = ["STL", "PIT", "TOR", "TB", "NYM", "KC", "SF", "MIL", "MIN", "BAL", "SEA", "TEX", "WSH", "ATL", "PHI", "CIN", "LAD", "SD", "COL", "ARI", "CHC", "LAA", "CHW", "OAK", "HOU", "NYY", "BOS", "CLE", "DET", "MIA"].sort()
        var years = ["2016", "2017", "2018", "2019", "2020", "2021"]
        // var rows_hitter = d3.csvParseRows(hitter_data),
        //   rows_pitcher = d3.csvParseRows(pitcher_data),
        var rows_hitter = hitter_data,
          rows_pitcher = pitcher_data,
          table_hitter = d3.select('#tablehitters'),
          caption_hitter = table_hitter.append("caption").style("font-size", "20px").text("Hitter");
        table_hitter.append('table')
            .style("border-collapse", "collapse")
            .style("border", "2px black solid")
        var table_pitcher = d3.select('#tablepitchers');
        var caption_pitcher = table_pitcher.append("caption").style("font-size", "20px").text("Pitcher");
        table_pitcher.append('table')
          .style("border-collapse", "collapse")
          .style("border", "2px black solid");
        var display_rows_hitter = [rows_hitter[0]],
          display_rows_pitcher = [rows_pitcher[0]]
        for(var i = 0; i < rows_hitter.length; i++) {
          if(rows_hitter[i][0] == curYear && rows_hitter[i][1] == curTeam) {
            display_rows_hitter.push(rows_hitter[i])
          }
        }
        for(var i = 0; i < rows_pitcher.length; i++) {
          if(rows_pitcher[i][0] == curYear && rows_pitcher[i][1] == curTeam) {
            display_rows_pitcher.push(rows_pitcher[i])
          }
        }

        // console.log(display_rows_pitcher)

        d3.select("#selectButtonTeamTable")
          .selectAll('myOptions')
          .data(teams)
          .enter()
          .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button

        d3.select("#selectButtonSeasonTable")
          .selectAll('myYears')
          .data(years)
          .enter()
          .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; })

        // headers
        table_hitter.append("thead").append("tr")
          .selectAll("th")
          .data(rows_hitter[0])
          .enter().append("th")
          .text(function(d) { return d; })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase");

        // data
        table_hitter.append("tbody")
          .selectAll("tr").data(display_rows_hitter.slice(0))
          .enter().append("tr")
          .selectAll("td")
          .data(function(d){return d;})
          .enter().append("td")
          .style("border", "1px black solid")
          .style("padding", "5px")
          .on("mouseover", function(){
            d3.select(this).style("background-color", "powderblue");
          })
          .on("mouseout", function(){
            d3.select(this).style("background-color", "white");
          })
          .text(function(d){return d;})
          .style("font-size", "12px");

        // headers
        table_pitcher.append("thead").append("tr")
          .selectAll("th")
          .data(rows_pitcher[0])
          .enter().append("th")
          .text(function(d) { return d; })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase");

        // data
        table_pitcher.append("tbody")
          .selectAll("tr").data(display_rows_pitcher.slice(0))
          .enter().append("tr")
          .selectAll("td")
          .data(function(d){return d;})
          .enter().append("td")
          .style("border", "1px black solid")
          .style("padding", "5px")
          .on("mouseover", function(){
            d3.select(this).style("background-color", "powderblue");
          })
          .on("mouseout", function(){
            d3.select(this).style("background-color", "white");
          })
          .text(function(d){return d;})
          .style("font-size", "12px");

        function update(selectedTeam, selectedYear) {
          console.log("TeamPlayersTable", selectedTeam, selectedYear)
          var dr_hitter = [rows_hitter[0]], dr_pitcher = [rows_pitcher[0]]
          for(var i = 1; i < rows_hitter.length; i++) {
            if(rows_hitter[i][0] == selectedYear && rows_hitter[i][1] == selectedTeam) {
              dr_hitter.push(rows_hitter[i])
            }
          }
          for(var i = 1; i < rows_pitcher.length; i++) {
            if(rows_pitcher[i][0] == selectedYear && rows_pitcher[i][1] == selectedTeam) {
              dr_pitcher.push(rows_pitcher[i])
            }
          }

          table_hitter.selectAll("tr").remove()
          table_hitter.append("thead").append("tr")
            .selectAll("th")
            .data(dr_hitter[0])
            .enter().append("th")
            .merge(table_hitter)
            .transition()
            .duration(1000)
            .text(function(d) { return d; })
            .style("border", "1px black solid")
            .style("padding", "5px")
            .style("background-color", "lightgray")
            .style("font-weight", "bold")
            .style("text-transform", "uppercase");

          table_hitter
            .selectAll('tr')
            .data(dr_hitter.slice(0))
            .enter().append("tr")
            .selectAll("td")
            .data(function(d){return d;})
            .enter().append("td")
            .merge(table_hitter)
            .transition()
            .duration(1000)
            .style("border", "1px black solid")
            .style("padding", "5px")
            .text(function(d) { return d; })
            .style("font-size", "12px");

          table_pitcher.selectAll("tr").remove()
          table_pitcher.append("thead").append("tr")
            .selectAll("th")
            .data(dr_pitcher[0])
            .enter().append("th")
            .merge(table_pitcher)
            .transition()
            .duration(1000)
            .text(function(d) { return d; })
            .style("border", "1px black solid")
            .style("padding", "5px")
            .style("background-color", "lightgray")
            .style("font-weight", "bold")
            .style("text-transform", "uppercase");

          table_pitcher
            .selectAll('tr')
            .data(dr_pitcher.slice(0))
            .enter().append("tr")
            .selectAll("td")
            .data(function(d){return d;})
            .enter().append("td")
            .merge(table_pitcher)
            .transition()
            .duration(1000)
            .style("border", "1px black solid")
            .style("padding", "5px")
            .text(function(d) { return d; })
            .style("font-size", "12px");
        }

        update(curTeam, curYear);

        // When the button is changed, run the updateChart function
        d3.select("#selectButtonTeamTable").on("change", function(d) {
          // recover the option that has been chosen
          curTeam = d3.select(this).property("value")
          // console.log("curTeam", curTeam)
          // console.log("curYear", curYear)
          // run the updateChart function with this selected option
          update(curTeam, curYear)
        })

        // When the button is changed, run the updateChart function
        d3.select("#selectButtonSeasonTable").on("change", function(d) {
          // recover the option that has been chosen
          curYear = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(curTeam, curYear)
        })
      })
    })
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default TeamPlayersTable;
