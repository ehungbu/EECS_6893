import React, {Component} from 'react';
import * as d3 from "d3";

class Spider extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    console.log("Spider Component")

    var margin = {top: 20, right: 60, bottom: 50, left: 30},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    // let features = ["A","B","C","D","E","F"];
    let features = ["Score","Strikeouts","Stolen Bases","Total Bases","Walked Issued"];
    let table_feature = [{"Score": 0, "Score Ranking": 1, "Strikeouts": 0,"Strikeouts Ranking": 1, "Stolen Bases": 0, "Stolen Bases Ranking": 1, "Total Bases": 0, "Total Bases Ranking": 1, "Walked Issued": 0, "Walked Issued Ranking": 1}]

    let svg = d3.select("#spider")
      .append("svg")
      .attr("width", 650)
      .attr("height", 650)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    let team_rank_table = d3.select('#teamranktable').append('table')
      .style("border-collapse", "collapse")
      .style("margin", "auto")
      .style("margin-top", "200px")
      .style("border", "2px black solid")


    let radialScale = d3.scaleLinear()
      .domain([0,10])
      .range([0,200]);
    let ticks = [2,4,6,8,10];

    let data = []
    d3.csv("https://raw.githubusercontent.com/ehungbu/EECS_6893/main/data_processed/data.csv", function(d) {
      // console.log('data', data)
      data.push(d)
    }).then(_ => {
      // console.log(data[0])
      var teams = ["STL", "PIT", "TOR", "TB", "NYM", "KC", "SF", "MIL", "MIN", "BAL", "SEA", "TEX", "WSH", "ATL", "PHI", "CIN", "LAD", "SD", "COL", "ARI", "CHC", "LAA", "CHW", "OAK", "HOU", "NYY", "BOS", "CLE", "DET", "MIA"].sort()
      var years = ["2016", "2017", "2018", "2019", "2020", "2021"]
      var point = {}
      var curTeam = "ARI", curYear = "2016"
      var mx_score = 0, mx_so = 0, mx_sb = 0, mx_tb = 0, mx_wi = 0
      for(var i = 0; i < data.length; i++) {
        if(data[i]['season'] == curYear) {
          mx_score = Math.max(mx_score, data[i]['score'])
          mx_so = Math.max(mx_so, data[i]['strikeouts'])
          mx_sb = Math.max(mx_sb, data[i]['stolen_bases'])
          mx_tb = Math.max(mx_tb, data[i]['total_bases'])
          mx_wi = Math.max(mx_wi, data[i]['walks_issued'])
        }
        if (data[i]["team"] == curTeam && data[i]['season'] == curYear) {
          point['Score'] = data[i]['score']
          point['Strikeouts'] = (data[i]['strikeouts'])
          point['Stolen Bases'] = (data[i]['stolen_bases'])
          point['Total Bases'] = (data[i]['total_bases'])
          point['Walked Issued'] = (data[i]['walks_issued'])
        }
      }
      table_feature[0]['Score'] = point['Score']
      table_feature[0]['Strikeouts'] = point['Strikeouts']
      table_feature[0]['Stolen Bases'] = point['Stolen Bases']
      table_feature[0]['Total Bases'] = point['Total Bases']
      table_feature[0]['Walked Issued'] = point['Walked Issued']
      point['Score'] = point['Score']/mx_score*10
      point['Strikeouts'] = point['Strikeouts']/mx_so*10
      point['Stolen Bases'] = point['Stolen Bases']/mx_sb*10
      point['Total Bases'] = point['Total Bases']/mx_tb*10
      point['Walked Issued'] = point['Walked Issued']/mx_wi*10

      for(var i = 0; i < data.length; i++) {
        if(data[i]['season'] == curYear) {
          if(data[i]['score'] > table_feature[0]['Score']) {
            table_feature[0]['Score Ranking'] += 1
          }
          if(data[i]['strikeouts'] > table_feature[0]['Strikeouts']) {
            table_feature[0]['Strikeouts Ranking'] += 1
          }
          if(data[i]['stolen_bases'] > table_feature[0]['Stolen Bases']) {
            table_feature[0]['Stolen Bases Ranking'] += 1
          }
          if(data[i]['total_bases'] > table_feature[0]['Total Bases']) {
            table_feature[0]['Total Bases Ranking'] += 1
          }
          if(data[i]['walks_issued'] < table_feature[0]['Walked Issued']) {
            table_feature[0]['Walked Issued Ranking'] += 1
          }
        }
      }

      let table_feature_array = [['Statistic', 'Value', 'League Ranking']]

      for (const [key, value] of Object.entries(table_feature[0])) {
        if (!key.includes("Ranking")) {
          table_feature_array.push([key, parseInt(value), table_feature[0][key + " Ranking"]])
        }
      }
      // console.log("table_feature_array", table_feature_array)

      // let table_feature_array = [[], []]
      // console.log('keys', Object.keys(table_feature[0]))
      // table_feature_array[0] = Object.keys(table_feature[0])
      // table_feature_array[1]= Object.values(table_feature[0])
      // console.log(table_feature_array)


      d3.select("#selectButtonTeamSpider")
        .selectAll('myOptions')
        .data(teams)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; }) // corresponding value returned by the button

      d3.select("#selectButtonSeasonSpider")
        .selectAll('myYears')
        .data(years)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; })

      ticks.forEach(t =>
        svg.append("circle")
          .attr("cx", 300)
          .attr("cy", 300)
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("r", radialScale(t))
      );

      ticks.forEach(t =>
        svg.append("text")
          .attr("x", 305)
          .attr("y", 300 - radialScale(t))
          .text(t.toString())
      );

      function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": 300 + x, "y": 300 - y};
      }

      for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 10);
        let label_coordinate = angleToCoordinate(angle, 10.5);

        //draw axis line
        svg.append("line")
          .attr("x1", 300)
          .attr("y1", 300)
          .attr("x2", line_coordinate.x)
          .attr("y2", line_coordinate.y)
          .attr("stroke","black");

        //draw axis label
        svg.append("text")
          .attr("x", label_coordinate.x)
          .attr("y", label_coordinate.y)
          .text(ft_name);
      }

      let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);


      function getPathCoordinates(data_point){
        let coordinates = [];
        for (var i = 0; i < features.length; i++){
          let ft_name = features[i];
          let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
          coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
        }
        return coordinates;
      }


      let color = "darkorange";
      let coordinates = getPathCoordinates(point);

      //draw the path element
      var spider = svg.append("path")
        .datum(coordinates)
        .attr("d",line)
        .attr("stroke-width", 3)
        .attr("stroke", color)
        .attr("fill", color)
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.5);

      // headers
      team_rank_table.append("thead").append("tr")
        .selectAll("th")
        .data(table_feature_array[0])
        .enter().append("th")
        .text(function(d) { return d; })
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "lightgray")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase");

      // data
      team_rank_table.append("tbody")
        .selectAll("tr").data(table_feature_array.slice(0))
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
        console.log("update spider:", selectedTeam, selectedYear)
        var newpoint = {}
        mx_score = 0
        mx_so = 0
        mx_sb = 0
        mx_tb = 0
        mx_wi = 0
        table_feature = [{"Score": 0, "Score Ranking": 1, "Strikeouts": 0,"Strikeouts Ranking": 1, "Stolen Bases": 0, "Stolen Bases Ranking": 1, "Total Bases": 0, "Total Bases Ranking": 1, "Walked Issued": 0, "Walked Issued Ranking": 1}]
        for(var i = 0; i < data.length; i++) {
          if(data[i]['season'] == selectedYear) {
            mx_score = Math.max(mx_score, data[i]['score'])
            mx_so = Math.max(mx_so, data[i]['strikeouts'])
            mx_sb = Math.max(mx_sb, data[i]['stolen_bases'])
            mx_tb = Math.max(mx_tb, data[i]['total_bases'])
            mx_wi = Math.max(mx_wi, data[i]['walks_issued'])
          }
          if (data[i]["team"] == selectedTeam && data[i]['season'] == selectedYear) {
            newpoint['Score'] = (data[i]['score'])
            newpoint['Strikeouts'] = (data[i]['strikeouts'])
            newpoint['Stolen Bases'] = (data[i]['stolen_bases'])
            newpoint['Total Bases'] = (data[i]['total_bases'])
            newpoint['Walked Issued'] = (data[i]['walks_issued'])
          }
        }
        table_feature[0]['Score'] = newpoint['Score']
        table_feature[0]['Strikeouts'] = newpoint['Strikeouts']
        table_feature[0]['Stolen Bases'] = newpoint['Stolen Bases']
        table_feature[0]['Total Bases'] = newpoint['Total Bases']
        table_feature[0]['Walked Issued'] = newpoint['Walked Issued']

        newpoint['Score'] = newpoint['Score']/mx_score*10
        newpoint['Strikeouts'] = newpoint['Strikeouts']/mx_so*10
        newpoint['Stolen Bases'] = newpoint['Stolen Bases']/mx_sb*10
        newpoint['Total Bases'] = newpoint['Total Bases']/mx_tb*10
        newpoint['Walked Issued'] = newpoint['Walked Issued']/mx_wi*10

        for(var i = 0; i < data.length; i++) {
          if(data[i]['season'] == curYear) {
            if(data[i]['score'] > table_feature[0]['Score']) {
              table_feature[0]['Score Ranking'] += 1
            }
            if(data[i]['strikeouts'] > table_feature[0]['Strikeouts']) {
              table_feature[0]['Strikeouts Ranking'] += 1
            }
            if(data[i]['stolen_bases'] > table_feature[0]['Stolen Bases']) {
              table_feature[0]['Stolen Bases Ranking'] += 1
            }
            if(data[i]['total_bases'] > table_feature[0]['Total Bases']) {
              table_feature[0]['Total Bases Ranking'] += 1
            }
            if(data[i]['walks_issued'] < table_feature[0]['Walked Issued']) {
              table_feature[0]['Walked Issued Ranking'] += 1
            }
          }
        }

        let newcoordinates = getPathCoordinates(newpoint);

        spider.datum(newcoordinates)
          .transition()
          .duration(1000)
          .attr("d",line)


        // let table_feature_array = [[], []]
        // console.log('keys', Object.keys(table_feature[0]))
        // table_feature_array[0] = Object.keys(table_feature[0])
        // table_feature_array[1]= Object.values(table_feature[0])
        // console.log(table_feature_array)

        let table_feature_array = [['Statistic', 'Value', 'League Ranking']]

        for (const [key, value] of Object.entries(table_feature[0])) {
          if (!key.includes("Ranking")) {
            table_feature_array.push([key, parseInt(value), table_feature[0][key + " Ranking"]])
          }
          // console.log(key, value);
        }
        // console.log("table_feature_array", table_feature_array)

        team_rank_table.selectAll("tr").remove()
        team_rank_table.append("thead").append("tr")
          .selectAll("th")
          .data(table_feature_array[0])
          .enter().append("th")
          .merge(team_rank_table)
          .transition()
          .duration(1000)
          .text(function(d) { return d; })
          .style("border", "1px black solid")
          .style("padding", "5px")
          .style("background-color", "lightgray")
          .style("font-weight", "bold")
          .style("text-transform", "uppercase");

        team_rank_table
          .selectAll('tr')
          .data(table_feature_array.slice(0))
          .enter().append("tr")
          .selectAll("td")
          .data(function(d){return d;})
          .enter().append("td")
          .merge(team_rank_table)
          .transition()
          .duration(1000)
          .style("border", "1px black solid")
          .style("padding", "5px")
          .text(function(d) { return d; })
          .style("font-size", "12px");
      }

      update(curTeam, curYear);

      // When the button is changed, run the updateChart function
      d3.select("#selectButtonTeamSpider").on("change", function(d) {
        // recover the option that has been chosen
        curTeam = d3.select(this).property("value")
        // console.log("curTeam", curTeam)
        // console.log("curYear", curYear)
        // run the updateChart function with this selected option
        update(curTeam, curYear)
      })

      // When the button is changed, run the updateChart function
      d3.select("#selectButtonSeasonSpider").on("change", function(d) {
        // recover the option that has been chosen
        curYear = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(curTeam, curYear)
      })
    })
  }

  render(){
    return <div id={"#" + this.props.id}></div>
  }
}

export default Spider;
