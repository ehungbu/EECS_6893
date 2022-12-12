import React, {Component} from 'react';
import * as d3 from "d3";

class Classification extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("Classification Component")
    // set the dimensions and margins of the graph
    // You can change these values these are just sample values given
    var margin = {top: 10, right: 10, bottom: 30, left: 60},
      width = 860 - margin.left - margin.right + 70,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var table = d3.select('#chart').append('table')
                  .style("border-collapse", "collapse")
                  .style("margin", "auto")
                  .style("margin-top", "50px")
                  .style("border", "2px black solid")



    var curDate = "2019/08/18"
    var curMatch = "ARI-SF"

    let data = []
    d3.csv("https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/classification.csv", function(d) {
      data.push(d)
    }).then(_ => {
      var dateCol = [...new Set(data.map(function(d) {return d.date}))]
      var sortedDates = Array.from(dateCol).sort();
      // var sortedDatesSet = new Set(sortedDates)
      var strArray = curMatch.split("-");
      var matchData = data.filter(function(d){
            return d['date'] === curDate;
        }).map(function(d){ return d.team1 + '-' + d.team2})
      var displayData = data.filter(function(d){
        return d['date'] === curDate && d['team1'] === strArray[0] && d['team2'] == strArray[1];
      })
      var table_column = ['date', 'team1','team2','team1_pred_score','team2_pred_score','team1_act_score','team2_act_score']
      console.log(displayData)
      
      d3.select("#selectButtonDate")
        .selectAll('myYears')
        .data(sortedDates)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      d3.select("#selectButtonMatch")
        .selectAll('matches')
        .data(matchData)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; })

      // headers
      table.append("thead").append("tr")
        .selectAll("th")
        .data(table_column)
        .enter().append("th")
        .text(function(d) { return d; })
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "lightgray")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase")
        .style("font-size", "12px");

      // data
      table.append("tbody")
        .selectAll("tr").data(displayData)
        .enter().append("tr")
        .selectAll("td")
        .data(function(row) {return table_column.map(function (column) {return { column: column, value: row[column] }})})
        .enter().append("td")
        .style("border", "1px black solid")
        .style("padding", "5px")
        .text(function(d){return d.value;})
        .style("font-size", "12px");


      function updateDate(selectButtonDate) {
        matchData = data.filter(function(d){
            return d['date'] === selectButtonDate;
        }).map(function(d){ return d.team1 + '-' + d.team2})
        curMatch = matchData[0]

        var matchbutton = d3.select("#selectButtonMatch")
        .selectAll('option')
        .data(matchData)

        matchbutton.exit().remove();

        matchbutton
        .enter()
        .append('option')
        .merge(matchbutton)
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; })
        .property("selected", function(d){return d === curMatch})

        
        var strArray = curMatch.split("-");
        var displayData = data.filter(function(d){
          return d['date'] === curDate && d['team1'] === strArray[0] && d['team2'] == strArray[1];})

        table.selectAll("tr").remove()
        table.append("thead").append("tr")
          .selectAll("th")
          .data(table_column)
          .enter().append("th")
          .merge(table)
          .transition()
          .duration(100)
          .text(function(d) { return d; })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase")
          .style("font-size", "12px");

        table.append("tbody")
          .selectAll('tr')
          .data(displayData)
          .enter().append("tr")
          .selectAll("td")
          .data(function(row) {return table_column.map(function (column) {return { column: column, value: row[column] }})})
          .enter().append("td")
          .merge(table)
          .transition()
          .duration(100)
          .style("border", "1px black solid")
          .style("padding", "5px")
          .text(function(d){return d.value;})
          .style("font-size", "12px");

      }

      function updateMatch(selectButtonMatch) {
        var strArray = curMatch.split("-");
        var displayData = data.filter(function(d){
          return d['date'] === curDate && d['team1'] === strArray[0] && d['team2'] == strArray[1];})

        table.selectAll("tr").remove()
        table.append("thead").append("tr")
          .selectAll("th")
          .data(table_column)
          .enter().append("th")
          .merge(table)
          .transition()
          .duration(100)
          .text(function(d) { return d; })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase")
          .style("font-size", "12px");

        table.append("tbody")
          .selectAll('tr')
          .data(displayData)
          .enter().append("tr")
          .selectAll("td")
          .data(function(row) {return table_column.map(function (column) {return { column: column, value: row[column] }})})
          .enter().append("td")
          .merge(table)
          .transition()
          .duration(100)
          .style("border", "1px black solid")
          .style("padding", "5px")
          .text(function(d){return d.value;})
          .style("font-size", "12px");
      }

  updateDate(curDate);

      // When the button is changed, run the updateChart function
  d3.select("#selectButtonDate").on("change", function(d) {
    // recover the option that has been chosen
    curDate = d3.select(this).property("value")
    // run the updateChart function with this selected option
    updateDate(curDate)
  })

  d3.select("#selectButtonMatch").on("change", function(d) {
    // recover the option that has been chosen
    curMatch = d3.select(this).property("value")
    // run the updateChart function with this selected option
    updateMatch(curMatch)
  })
    })
  }


  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default Classification;
