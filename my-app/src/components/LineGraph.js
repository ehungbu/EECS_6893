import React, {Component} from 'react';
import * as d3 from "d3";

class LineGraph extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("LineGraph Component")

    // set the dimensions and margins of the graph
    // You can change these values these are just sample values given
    var margin = {top: 10, right: 10, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right + 70,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#linegraph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    let curTeam = "ARI";
    let curCat = "score";
    // console.log('line:', curTeam, curCat)
    let data = []
    d3.csv("https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/data.csv", function(d) {
      // console.log('data', data)
      data.push(d)
    }).then(_ => {
      // console.log(data[0])
      var allCat = ["score", "walks_issued", "total_bases", "strikeouts", "stolen_bases"]
      var teams = ["STL", "PIT", "TOR", "TB", "NYM", "KC", "SF", "MIL", "MIN", "BAL", "SEA", "TEX", "WSH", "ATL", "PHI", "CIN", "LAD", "SD", "COL", "ARI", "CHC", "LAA", "CHW", "OAK", "HOU", "NYY", "BOS", "CLE", "DET", "MIA"].sort()
      d3.select("#selectButtonTeam")
        .selectAll('myOptions')
        .data(teams)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      d3.select("#selectButtonCat")
        .selectAll('myOptions')
        .data(allCat)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      var filter_data = data.filter(function(d){
        return d['team'] == curTeam;
      }).map(function(d){ return {season: d['season'], value: d[curCat]}; })

      // X axis: scale and draw:
      var x = d3.scaleLinear()
        // .domain(d3.extent(filter_data, function(d) { return d['season']; }))
        // .domain(["2016", "2017", "2018", "2019", "2020", "2021"])
        .domain([2016, 2021])
        .range([0, width]);
      var xAxis = d3.axisBottom(x).tickValues(d3.range(x.domain()[0], x.domain()[1] + 1, 1))
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
      // text label for the x axis
      var xlabel = svg.append("text")
        .attr("transform",
          "translate(" + (width/2) + " ," +
          (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("season");
      // Y axis: scale and draw:
      var y = d3.scaleLinear()
        .range([height, 0]);
      y.domain([0, d3.max(filter_data, function(d) {return +d.value; })]);
      var yAxis = d3.axisLeft().scale(y);
      svg.append("g")
        .attr("class", "myYaxis")
        .call(yAxis);
      // text label for the y axis
      var ylabel = svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Total Value");

      // text label for the y axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")

      // Add the line
      var line = svg.append('g').append("path")
        .datum(filter_data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 4)
        .attr("d", d3.line()
          .x(function(d) { return x(d.season) })
          .y(function(d) { return y(d.value) })
        )

      function update(selectButtonTeam, selectButtonCat) {
        console.log('update line: ', selectButtonTeam, selectButtonCat)

        // Update both graphs using hidden button
        let element_team_pie = document.getElementById("selectButtonTeamPie");
        element_team_pie.value = selectButtonTeam;
        var event_team_pie = new Event('change');
        element_team_pie.dispatchEvent(event_team_pie);

        // Update both graphs using hidden button
        let element_team_table = document.getElementById("selectButtonTeamTable");
        element_team_table.value = selectButtonTeam;
        var event_team_table = new Event('change');
        element_team_table.dispatchEvent(event_team_table);

        // Update both graphs using hidden button
        let element_team_spider = document.getElementById("selectButtonTeamSpider");
        element_team_spider.value = selectButtonTeam;
        var event_team_spider = new Event('change');
        element_team_spider.dispatchEvent(event_team_spider);

        var new_data = data.filter(function(d){
          return d['team'] == selectButtonTeam;
        }).map(function(d){ return {season: d['season'], value: d[selectButtonCat]}; })

        y.domain([0, d3.max(new_data, function(d) {return +d.value; })]);
        svg.selectAll(".myYaxis")
          .transition()
          .duration(500)
          .call(yAxis);
        // text label for the y axis

        line
          .datum(new_data)
          .transition()
          .duration(500)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 4)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.season) })
            .y(function(d) { return y(+d.value) })
          )

        // u.exit().remove();

      }

      update(curTeam, curCat);

      // When the button is changed, run the updateChart function
      d3.select("#selectButtonTeam").on("change", function(d) {
        // recover the option that has been chosen
        curTeam = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(curTeam, curCat)
      })

      d3.select("#selectButtonCat").on("change", function(d) {
        // recover the option that has been chosen
        curCat = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(curTeam, curCat)
      })

    })
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default LineGraph;
