import { Component, OnInit } from '@angular/core';
import * as d3 from "d3"
import { HttpClient } from '@angular/common/http';
// import { endianness } from 'os';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  //#region data init
  bodyData: any  = [
    {
      "body" : "Sedan",
      "count" : 0,
      "income": 0
    },
    {
      "body" : "Kombi",
      "count" : 0,
      "income": 0
    },
    {
      "body" : "Hatchback",
      "count" : 0,
      "income": 0
    }]; 

  rentalData: any;
  incomeData: any;

  engineData: any =  [
    {
      "engine" : "Benzyna",
      "count" : 0,
      "income": 0
    },
    {
      "engine" : "Diesel",
      "count" : 0,
      "income": 0
    }
  ];
  labelData = [];
  showData = [];
  engineSelect : boolean = true;
  bodySelect : boolean = true;
  carSelect : boolean = true;

  userIncomedata: any;
  userRentalData: any;
  userSelect: boolean = true;
  //#endregion data init

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get('http://localhost:3001/stats/rentals').subscribe( data => {
      this.rentalData = data;

      console.log('RENTAL INIT');
      console.log(this.rentalData);

      var kombiCount = 0;
      var sedanCount = 0;
      var hatchCount = 0;
      var dieselCount = 0;
      var petrolCount = 0;

      //#region body and engine count
      for(var i=0; i<this.rentalData.length; i++) {
        if (this.rentalData[i].totalRentals == 0) {
          
          this.rentalData.splice(i, 1);
          i--;
          continue;
        }
        console.log("ITERATOR " + i)
        console.log(this.rentalData)
        if(this.rentalData[i].body === "Kombi"){
          this.bodyData[1].count+=this.rentalData[i].totalRentals;
          this.bodyData[1].income += this.rentalData[i].totalIncome;
      } else if(this.rentalData[i].body === "Hatchback"){
          this.bodyData[2].count+=this.rentalData[i].totalRentals;
          this.bodyData[2].income += this.rentalData[i].totalIncome;
      } else if (this.rentalData[i].body === "Sedan"){
        this.bodyData[0].count+=this.rentalData[i].totalRentals;
        this.bodyData[0].income += this.rentalData[i].totalIncome;
      }
   
      if(this.rentalData[i].engine[0] === "B"){
          this.engineData[0].count+=this.rentalData[i].totalRentals;
          this.engineData[0].income+=this.rentalData[i].totalIncome;
        } else {
          this.engineData[1].count+=this.rentalData[i].totalRentals;
          this.engineData[1].income+=this.rentalData[i].totalIncome;
        }
      }
      //#endregion body and engine count   
  
      this.rentalData.sort(this.compareCarRentals);

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      //#region car stats chart
    d3.select("#par")
      .selectAll("div")
      .data(this.rentalData)
      .enter()
      .append("div")
      .transition().duration(1000)
      .style("width", function (d) {
        return 100*d.totalRentals + "px";
      })
      .style("top",function(d, i) {
        return 60 + ((i*30)) + "px";
      })
      .style("background-color", function (d,i) {
        return color(i);
      })
      .style("margin","0.2rem")
      .style("text-align", "right")
      .style("padding", "0.2rem")
      .style("color","white")
      .style("border-radius", "0px 7px 7px 0px")
      .text(function(d){
        return d.make + " " + d.model + " " + d.totalRentals;
      });
      //#endregion car stats chart
      
      this.bodyData.sort(this.compareEngineRentals);
      this.engineData.sort(this.compareEngineRentals);

      //#region body stats chart 
      d3.select("#para")
      .selectAll("div")
      .data(this.bodyData)
      .enter()
      .append("div")
      .transition().duration(1000)
      .style("width", function (d) {
        return 40*d.count + "px";
      })
      .style("background-color", function (d,i) {
        return color(i);
      })
      .style("margin","0.2rem")
      .style("text-align", "right")
      .style("padding", "0.2rem")
      .style("color","white")
      .style("border-radius", "0px 7px 7px 0px")
      .text(function(d){
        return d.body + " " + d.count;
      });
      //#endregion body stats chart
      
      //#region engine stats chart
      d3.select("#parb")
      .selectAll("div")
      .data(this.engineData)
      .enter()
      .append("div")
      .transition().duration(1000)
      .style("width", function (d) {
        return 30*d.count + "px";
      })
      .style("background-color", function (d,i) {
        return color(i);
      })
      .style("margin","0.2rem")
      .style("text-align", "right")
      .style("padding", "0.2rem")
      .style("color","white")
      .style("border-radius", "0px 7px 7px 0px")
      .text(function(d){
        return d.engine + " " + d.count;
      });
      //#endregion engine stats chart

    })

    this.http.get('http://localhost:3001/users/ranking').subscribe( data => {
      this.userRentalData = data;
      var max = this.userRentalData[0].moneySpent;
      
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      //#region engine stats chart
      d3.select("#userRank")
      .selectAll("div")
      .data(this.userRentalData)
      .enter()
      .append("div")
      .transition().duration(1000)
      .style("width", function (d) {
        return d.moneySpent*100/max + "%";
      })
      .style("background-color", function (d,i) {
        return color(i);
      })
      .style("margin","0.2rem")
      .style("text-align", "right")
      .style("padding", "0.2rem")
      .style("color","white")
      .style("border-radius", "0px 7px 7px 0px")
      .text(function(d){
        return d.name + " " + d.lastName;
      });
    })
  }

  //#region toggle car data method
  toggleCars(){
    if(this.carSelect){
      var color = d3.scaleOrdinal(d3.schemeCategory20);
      this.rentalData.sort(this.compareCarIncomes);
      d3.select("#par")
        .selectAll("#div")
        .data(this.rentalData)
        .enter()
        .selectAll("div")
        .transition().duration(1000)
        .style("width", function (d) {
          return d.totalIncome/10 + "px";
        })
        .style("top",function(d, i) {
          return 60 + i*30 + "px";
        })
        .text(function(d){
          return d.make + " " + d.model + " " + d.totalIncome + " PLN";
        });
        this.carSelect = false;
    } else {
      var color = d3.scaleOrdinal(d3.schemeCategory20);

      d3.select("#par")
        .selectAll("#div")
        .data(this.rentalData)
        .enter()
        .selectAll("div")
        .transition().duration(1000)
        .style("width", function (d) {
          return 100*d.totalRentals + "px";
        })
        .text(function(d){
          return d.make + " " + d.model + " " + d.totalRentals;
        });
        this.carSelect = true;
    }

   
  }
  //#endregion toggle car data method

  // toggle body data method
  toggleBody(){
    if(this.bodySelect){
      console.log(this.rentalData);
      this.bodyData.sort(this.compareEngineIncome);
  
      var color = d3.scaleOrdinal(d3.schemeCategory20);
  
      d3.select("#para")
        .selectAll("#div")
        .data(this.bodyData)
        .enter()
        .selectAll("div")
        .transition().duration(1000)
        .style("width", function (d) {
          return d.income/10 + "px";
        })
        .text(function(d){
          return d.body + " " + d.income + " PLN";
        });
        this.bodySelect = false;
    } else {
      var color = d3.scaleOrdinal(d3.schemeCategory20);
  
      d3.select("#para")
        .selectAll("#div")
        .data(this.bodyData)
        .enter()
        .selectAll("div")
        .transition().duration(1000)
        .style("width", function (d) {
          return 40*d.count + "px";
        })
        .text(function(d){
          return d.body + " " + d.count;
        });
        this.bodySelect = true;
    }
   
  }


  toggleEngine(){
    if(this.engineSelect){
      var color = d3.scaleOrdinal(d3.schemeCategory20);
      this,this.engineData.sort(this.compareEngineIncome);
      d3.select("#parb")
        .selectAll("#div")
        .data(this.engineData)
        .enter()
        .selectAll("div")
        .transition().duration(1000)
        .style("width", function (d) {
          return d.income/20 + "px";
        })
        .text(function(d){
          return d.engine + " " + d.income  + " PLN";
        });
        this.engineSelect = false;
    } else {
      var color = d3.scaleOrdinal(d3.schemeCategory20);

    d3.select("#parb")
      .selectAll("#div")
      .data(this.engineData)
      .enter()
      .selectAll("div")
      .transition().duration(1000)
      .style("width", function (d) {
        return d.count*30 + "px";
      })
      .text(function(d){
        return d.engine + " " + d.count;
      });
      this.engineSelect = true;
    }    
  }

  compareCarRentals(a,b) {
    if (a.totalRentals < b.totalRentals)
      return 1;
    if (a.totalRentals > b.totalRentals)
      return -1;
    return 0;
  }

  compareCarIncomes(a,b){
    if(a.totalIncome < b.totalIncome)
    return 1;
    if(a.totalIncome > b.totalIncome)
    return -1;
    return 0;
  }

  compareEngineRentals(a,b){
    if (a.count < b.count)
    return 1;
  if (a.count > b.count)
    return -1;
  return 0;
  }

  compareEngineIncome(a,b){
    if(a.income < b.income)
      return 1;
    if(a.income > b.income)
      return -1;
    return 0;
  } 
 }