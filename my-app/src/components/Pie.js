import React, {Component} from 'react';
import * as d3 from "d3";
// const d3 = require('d3');

class Pie extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("Pie Component")
    let data = []
    d3.csv("https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/data.csv", function (d) {
      // console.log('data', data)
      data.push(d)
    }).then(_ => {
      // console.log(data[0])

      var teams = ["STL", "PIT", "TOR", "TB", "NYM", "KC", "SF", "MIL", "MIN", "BAL", "SEA", "TEX", "WSH", "ATL", "PHI", "CIN", "LAD", "SD", "COL", "ARI", "CHC", "LAA", "CHW", "OAK", "HOU", "NYY", "BOS", "CLE", "DET", "MIA"].sort()
      var years = ["2016", "2017", "2018", "2019", "2020", "2021"]



      d3.select("#selectButtonTeamPie")
        .selectAll('myOptions')
        .data(teams)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      d3.select("#selectButtonSeason")
        .selectAll('myOptions')
        .data(years)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      // console.log(data);

      function format_arr(data, team, season) {
        // console.log('data:', data)
        var retdata = {}

        for (var i = 0; i < data.length; i++) {
          // console.log(data[i]['team'], data[i]['season'])
          if (data[i]['team'] === team && data[i]['season'] === season) {
            retdata['wins'] = data[i]['wins']
            retdata['losses'] = data[i]['losses']
            break;
          }
        }
        // console.log('retdata:', retdata)
        return retdata;
      }

      function update(selectedTeam, selectedYear) {
        // Update both graphs using hidden button
        let element_season_table = document.getElementById("selectButtonSeasonTable");
        element_season_table.value = selectedYear;
        var event_season_table = new Event('change');
        element_season_table.dispatchEvent(event_season_table);

        // Update both graphs using hidden button
        let element_season_spider = document.getElementById("selectButtonSeasonSpider");
        element_season_spider.value = selectedYear;
        var event_season_spider = new Event('change');
        element_season_spider.dispatchEvent(event_season_spider);

        d3.select('#pie')
          .select('svg')
          .remove();

        // console.log(selectedTeam, selectedYear)
        var wins_losses_dict = format_arr(data, selectedTeam, selectedYear)
        // console.log(wins_losses_dict)
        var total_games = parseInt(wins_losses_dict['wins'])+ parseInt(wins_losses_dict['losses'])
        // console.log(total_games)

        console.log('update pie:', selectedTeam, selectedYear, wins_losses_dict)

        // // set the dimensions and margins of the graph
        var width = 450
        // let height = 450
        // let margin = 40
        height = 450
        let margin = 40

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#pie")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // set the color scale
        var color = d3.scaleOrdinal()
          .domain(data)
          .range(d3.schemeSet2);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.value; })
          .sort(function (d) {
            return d3.ascending(d.key);
          })

        let wins_losses_array_dict = [{}, {}]
        let index = 0
        for (const [key, value] of Object.entries(wins_losses_dict)) {
          wins_losses_array_dict[index]['key'] = key
          wins_losses_array_dict[index]['value'] = value
          index++
        }
        var data_ready = pie(wins_losses_array_dict)


        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        var arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(radius)

        var label = d3.arc()
          .outerRadius(radius + 230)
          .innerRadius(0);

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('path')
          .merge(svg)
          .transition()
          .duration(1000)
          .attr('d', arcGenerator)
          .attr('fill', function(d){ return(color(d.data.key)) })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)

        // Now add the annotation. Use the centroid method to get the best coordinates
        svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('text')
          .text(function(d){ return d.data.value + " " + d.data.key})
          .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
          .style("text-anchor", "middle")
          .style("font-size", 17)


        // Now add the label
        svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('text')
          .text(function(d){ return (d.data.value / total_games * 100).toFixed(2) + '%'})
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")";  })
          .style("text-anchor", "middle")
          .style("font-size", 12)

        // appending the svg object to the svg id of the page
        var svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          radius = Math.min(width, height) / 2,
          g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      }

      // When the button is changed, run the updateChart function
      d3.select("#selectButtonTeamPie").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        selectedTeam = selectedOption
        // run the updateChart function with this selected option
        update(selectedOption, selectedYear)
      })

      // When the button is changed, run the updateChart function
      d3.select("#selectButtonSeason").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        selectedYear = selectedOption
        // run the updateChart function with this selected option
        update(selectedTeam, selectedOption)
      })

      var selectedTeam = "ARI"
      var selectedYear = "2016"
      update(selectedTeam, selectedYear);
    })
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default Pie;
