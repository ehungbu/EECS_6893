import React, {Component} from 'react';
import * as d3 from "d3";

class LeagueTeamBar extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("LeagueTeamBar Component")
    // set the dimensions and margins of the graph
    // You can change these values these are just sample values given
    var margin = {top: 10, right: 10, bottom: 30, left: 60},
      width = 860 - margin.left - margin.right + 70,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#teambar")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    let curseason = "2016";
    let curCat = "score";

    let data = []
    d3.csv("https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/data.csv", function(d) {
      // console.log('data', data)
      data.push(d)
    }).then(_ => {
      // console.log(data[0])
      var allCat = ["score", "walks_issued", "total_bases", "strikeouts", "stolen_bases"]
      var seasons = ["2016", "2017", "2018", "2019", "2020", "2021"]

      d3.select("#selectButtonSeason")
        .selectAll('myOptions')
        .data(seasons)
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
        return d['season'] === curseason;
      }).map(function(d){ return {team: d['team'], value: parseInt(d[curCat])}; })
        .sort(function(a, b) {
          return d3.ascending(a.value, b.value)
        });

      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(filter_data.map(function(d) { return d.team; }))
        .padding(0.2);

      var xAxis = d3.axisBottom(x)
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")
        .call(xAxis);
      // text label for the x axis

      var xlabel = svg.append("text")
        .attr("transform",
          "translate(" + (width/2) + " ," +
          (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Teams");

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

      var u = svg.selectAll("mybar")
        .data(filter_data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.team); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", "#69b3a2")



      function update(selectButtonseason, selectButtonCat) {
        console.log('update TeamBar: ', selectButtonseason, selectButtonCat)

        // Update both graphs using hidden button
        let element = document.getElementById("selectButtonSeasonTopPlayers");
        element.value = selectButtonseason;
        var event = new Event('change');
        element.dispatchEvent(event);

        var new_data = data.filter(function(d){
          return d['season'] === selectButtonseason;
        }).map(function(d){ return {team: d['team'], value: parseInt(d[selectButtonCat])}; })
          .sort(function(a, b) {
            // return b.value - a.value;
            return d3.ascending(a.value, b.value)
          });

        x.domain(new_data.map(function(d) { return d.team; }))
        svg.selectAll(".myXaxis")
          .transition()
          .duration(1000)
          .call(xAxis);

        y.domain([0, d3.max(new_data, function(d) {return +d.value; })]);
        svg.selectAll(".myYaxis")
          .transition()
          .duration(1000)
          .call(yAxis);

        // console.log(new_data)


        u
          .data(new_data)
          .enter()
          .append("rect")
          .merge(u)
          .transition()
          .duration(1000)
          .attr("x", function(d) { return x(d.team); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .style("fill", "#69b3a2")

      }

      update(curseason, curCat);

      // When the button is changed, run the updateChart function
      d3.select("#selectButtonSeason").on("change", function(d) {
        // recover the option that has been chosen
        curseason = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(curseason, curCat)
      })

      d3.select("#selectButtonCat").on("change", function(d) {
        // recover the option that has been chosen
        curCat = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(curseason, curCat)
      })
    })
  }


  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default LeagueTeamBar;
