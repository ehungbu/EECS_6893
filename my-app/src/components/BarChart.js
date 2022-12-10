import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("Chart Component")

    // set the dimensions and margins of the graph
    // You can change these values these are just sample values given
    var margin = {top: 20, right: 50, bottom: 50, left: 60},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    // svg.selectAll("*").remove()

    // console.log(result)
    let data = []
    d3.csv("https://raw.githubusercontent.com/vega/vega/main/docs/data/seattle-weather.csv", function(d) {
      // console.log('data', data)
      data.push({ date : d3.timeParse("%Y-%m-%d")(d.date), value: d.precipitation })
    }).then(_ => {
        console.log(data)
        console.log(data[0])
        // Setting the X axis
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.date; }))
          .range( [0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Setting the Y axis
        var y = d3.scaleLinear()
          // .domain([0, d3.max(data, function(d) { return +d.precipitation; })])
          .domain([0, d3.max(data, function(d) { return +d.value; })])
          .range([ height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // x axis label
        svg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width - 350)
          .attr("y", height + 50)
          .text("Date");

        // y axis label
        svg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", -40)
          .attr("x", -100)
          // .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("precipitation");


        // Adding the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .x(function(d) { return x(d.date) })
              .y(function(d) { return y(d.value)})
            // .y(function(d) { return y(d.precipitation)})
          )
      }
    )

    // var w =  700;
    // var h = 500,
    //
    // data = [12, 5, 6, 6, 9, 10];
    //
    // const svg = d3.select("body")
    //   .append("svg")
    //   .attr("width", w)
    //   .attr("height", h)
    //   .style("margin-left", 100);
    //
    // svg.selectAll("rect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => i * 70)
    //   .attr("y", (d, i) => h - 10 * d)
    //   .attr("width", 65)
    //   .attr("height", (d, i) => d * 10)
    //   .attr("fill", "green")
  }

  render(){
    console.log("#" + this.props.id)
    return <div id={"#" + this.props.id}></div>
    // return <div ref="bar"></div>
  }
}

export default BarChart;