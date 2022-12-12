import React, {Component} from 'react';
import * as d3 from "d3";

class TopPlayers extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("TopPlayers Component")
    let curYear = "2016"
    let curPitchCat = "IP"
    let curHitterCat = "AB"
    var margin = {top: 20, right: 50, bottom: 50, left: 60},
      width = 350,
      height = 330;

    // append the svg object to the body of the page
    var svg1 = d3.select("#toppitchers")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    var svg2 = d3.select("#tophitters")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    let hitter_data = []
    let pitcher_data = []
    d3.csv('https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/hitter_top10.csv', function (hd) {
      // console.log('data', data)
      hitter_data.push(hd)
    }).then(_ => {
      d3.csv('https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/pitcher_top10.csv', function (pd) {
        pitcher_data.push(pd)
      }).then(_ => {
        console.log(hitter_data[0])
        console.log(pitcher_data[0])

        var years = ["2016", "2017", "2018", "2019", "2020", "2021"]
        var pitcher_cat = ["IP", "H", "R", "ER", "BB", "K", "HR", "ERA"]
        var hitter_cat = ["AB", "R", "H", "RBI", "BB", "K", "SLG", "AVG", "OBP"]

        d3.select("#selectButtonSeasonTopPlayers")
          .selectAll('myYears')
          .data(years)
          .enter()
          .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button

        d3.select("#selectButtonCatPitch")
          .selectAll('myOptions')
          .data(pitcher_cat)
          .enter()
          .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; })

        d3.select("#selectButtonCatHitter")
          .selectAll('myOptions')
          .data(hitter_cat)
          .enter()
          .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; })

        var filter_pitcher_data = pitcher_data.filter(function(d){
          return d['Season'] === curYear && d['Indicator'] === curPitchCat;
        }).map(function(d){ return {name: d['Pitcher'], team: d['Team'], value: parseFloat(d['Value'])}; })


        var filter_hitter_data = hitter_data.filter(function(d){
          return d['Season'] === curYear && d['Indicator'] === curHitterCat;
        }).map(function(d){ return {name: d['Hitter'], team: d['Team'], value: parseFloat(d['Value'])}; })

        var pitcher_x = d3.scaleBand()
          .range([0, width])
          .domain(filter_pitcher_data.map(function(d) { return d.name; }))
          .padding(0.2);
        var pitcher_xAxis = d3.axisBottom(pitcher_x)
        svg1.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class", "myXaxis")
          .call(pitcher_xAxis)
          .selectAll("text")
          .attr("transform", "rotate(-20)")

        var pitcher_xlabel = svg1.append("text")
          .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .text("Pitcher");

        var hitter_x = d3.scaleBand()
          .range([0, width])
          .domain(filter_hitter_data.map(function(d) { return d.name; }))
          .padding(0.2);
        var hitter_xAxis = d3.axisBottom(hitter_x)
        svg2.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class", "myXaxis")
          .call(hitter_xAxis)
          .selectAll("text")
          .attr("transform", "rotate(-20)")

        var hitter_xlabel = svg2.append("text")
          .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .text("Hitter");



        var pitcher_y = d3.scaleLinear()
          .range([height, 0]);
        pitcher_y.domain([0, d3.max(filter_pitcher_data, function(d) {return +d.value; })]);

        var pitcher_yAxis = d3.axisLeft().scale(pitcher_y);
        svg1.append("g")
          .attr("class", "myYaxis")
          .call(pitcher_yAxis);

        // text label for the y axis
        var pitcher_ylabel = svg1.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Value");

        // text label for the y axis
        svg1.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")

        // var pitcher_u = svg1.selectAll("mybar")
        // .data(filter_pitcher_data)
        // .enter()
        // .append("rect")
        // .attr("x", function(d) { return pitcher_x(d.name); })
        // .attr("y", function(d) { return pitcher_y(d.value); })
        // .attr("width", pitcher_x.bandwidth())
        // .attr("height", function(d) { return height - pitcher_y(d.value); })
        // .style("fill", "#69b3a2")

        var hitter_y = d3.scaleLinear()
          .range([height, 0]);
        hitter_y.domain([0, d3.max(filter_hitter_data, function(d) {return +d.value; })]);
        var hitter_yAxis = d3.axisLeft().scale(hitter_y);
        svg2.append("g")
          .attr("class", "myYaxis")
          .call(hitter_yAxis);

        // text label for the y axis
        var hitter_ylabel = svg2.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Value");

        // text label for the y axis
        svg2.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")

        // var hitter_u = svg2.selectAll("mybar")
        // .data(filter_hitter_data)
        // .enter()
        // .append("rect")
        // .attr("x", function(d) { return hitter_x(d.name); })
        // .attr("y", function(d) { return hitter_y(d.value); })
        // .attr("width", hitter_x.bandwidth())
        // .attr("height", function(d) { return height - hitter_y(d.value); })
        // .style("fill", "#69b3a2")

        function update(selectedYear, selectedPitchCat, selectedHitterCat) {
          console.log("update TopPlayers:", selectedYear. selectedPitchCat, selectedHitterCat)
          var new_pitch_data = pitcher_data.filter(function(d){
            return d['Season'] === selectedYear && d['Indicator'] === selectedPitchCat;
          }).map(function(d){ return {name: d['Pitcher'], team: d['Team'], value: d['Value']}; })
          console.log(new_pitch_data)

          var new_hitter_data = hitter_data.filter(function(d){
            return d['Season'] === selectedYear && d['Indicator'] === selectedHitterCat;
          }).map(function(d){ return {name: d['Hitter'], team: d['Team'], value: d['Value']}; })
          console.log(new_hitter_data)

          pitcher_x.domain(new_pitch_data.map(function(d) { return d.name; }))
          svg1.selectAll(".myXaxis")
            .transition()
            .duration(1000)
            .call(pitcher_xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-20)")
          hitter_x.domain(new_hitter_data.map(function(d) { return d.name; }))
          svg2.selectAll(".myXaxis")
            .transition()
            .duration(1000)
            .call(hitter_xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-20)")

          pitcher_y.domain([0, d3.max(new_pitch_data, function(d) {return +d.value; })]);
          svg1.selectAll(".myYaxis")
            .transition()
            .duration(1000)
            .call(pitcher_yAxis);

          hitter_y.domain([0, d3.max(new_hitter_data, function(d) {return +d.value; })]);
          svg2.selectAll(".myYaxis")
            .transition()
            .duration(1000)
            .call(hitter_yAxis);

          var pitcher_u = svg1.selectAll("rect").data(new_pitch_data)
          pitcher_u
            .enter()
            .append("rect")
            .merge(pitcher_u)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return pitcher_x(d.name); })
            .attr("y", function(d) { return pitcher_y(d.value); })
            .attr("width", pitcher_x.bandwidth())
            .attr("height", function(d) { return height - pitcher_y(d.value); })
            .style("fill", "#69b3a2")
          pitcher_u.exit().remove()

          var hitter_u = svg2.selectAll("rect").data(new_hitter_data)
          hitter_u
            .enter()
            .append("rect")
            .merge(hitter_u)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return hitter_x(d.name); })
            .attr("y", function(d) { return hitter_y(d.value); })
            .attr("width", hitter_x.bandwidth())
            .attr("height", function(d) { return height - hitter_y(d.value); })
            .style("fill", "#69b3a2")
          hitter_u.exit().remove()
        }

        update(curYear, curPitchCat, curHitterCat);

        // When the button is changed, run the updateChart function
        d3.select("#selectButtonCatPitch").on("change", function(d) {
          // recover the option that has been chosen
          curPitchCat = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(curYear, curPitchCat, curHitterCat);
        })

        // When the button is changed, run the updateChart function
        d3.select("#selectButtonCatHitter").on("change", function(d) {
          // recover the option that has been chosen
          curHitterCat = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(curYear, curPitchCat, curHitterCat);
        })

        // When the button is changed, run the updateChart function
        d3.select("#selectButtonSeasonTopPlayers").on("change", function(d) {
          // recover the option that has been chosen
          curYear = d3.select(this).property("value")
          // run the updateChart function with this selected option
          update(curYear, curPitchCat, curHitterCat);
        })

      })
    })
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default TopPlayers;
