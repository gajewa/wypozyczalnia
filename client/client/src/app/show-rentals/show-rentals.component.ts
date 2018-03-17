import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-show-rentals',
  templateUrl: './show-rentals.component.html',
  styleUrls: ['./show-rentals.component.css']
})
export class ShowRentalsComponent implements OnInit {

  rentalsData : any;
  carData : any;
  showRentals = [];
  bufRentals = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/rentals').subscribe( data => {
        this.rentalsData = data;

        this.http.get('http://localhost:3001/cars').subscribe( carData => {
          this.carData = carData;

          var car;
          for(let element of this.rentalsData){

            car = this.carData.filter( function (object) {
              return object._id == element.carId;
            })
            var time1 = new Date(element.endDate);
            var time2 = new Date(element.startDate);

            var days = this.dhm(time1 - time2);

            var payment = days * car[0].price;

            console.log(payment);

            element.startDate = element.startDate.substring(0,10)+ ' , ' + element.startDate.substring(11,16);
            element.endDate = element.endDate.substring(0,10)+ ' , ' + element.endDate.substring(11,16);
            this.showRentals.push( {
              "rental" : element,
              "car" : car[0],
              "payment" : payment
            })
          }
          this.bufRentals = this.showRentals;
        })
      }
    );
  }


  dhm(t){
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor( (t - d * cd) / ch)

    if(h>0)
      d++;

    return d;
  }

  getPresentRentals(){
    this.bufRentals =  [];
    for(var i = 0; i<this.showRentals.length; i++){
      var bufDate = new Date(this.showRentals[i].rental.endDate);
      if(bufDate > Date.now())
        this.bufRentals.push(this.showRentals[i])
    }
    console.log(this.showRentals);
  }

  getPastRentals(){
    this.bufRentals = [];

    for(var i = 0; i<this.showRentals.length; i++){
      var bufDate = new Date(this.showRentals[i].rental.endDate);
      if(bufDate < Date.now())
        this.bufRentals.push(this.showRentals[i])
    }
    console.log(this.showRentals);
  }

  getAllRentals(){
    this.bufRentals = this.showRentals;
  }
}
