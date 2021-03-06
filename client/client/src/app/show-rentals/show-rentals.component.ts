import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DataServiceService} from "../data-service.service";


@Component({
  selector: 'app-show-rentals',
  templateUrl: './show-rentals.component.html',
  styleUrls: ['./show-rentals.component.css']
})
export class ShowRentalsComponent implements OnInit {

  rentalsData : any;
  carData : any;
  showRentals = [];
  bufRentals: any;
  searchQuery: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private dataService: DataServiceService) { }

  ngOnInit() {

    this.dataService.getPopulatedRentals().subscribe( data => {
      this.rentalsData = data;
      this.getActiveRentals();

    })
  }

  getActiveRentals(){
    this.bufRentals =  [];
    for(var i = 0; i<this.rentalsData.length; i++){

      if(this.rentalsData[i].status === 'Aktywne'){
        this.bufRentals.push(this.rentalsData[i]);
      }

    }
    console.log(this.bufRentals);
  }

  getPastRentals(){
    this.bufRentals = [];

    for(var i = 0; i<this.rentalsData.length; i++){

      if(this.rentalsData[i].status === 'Anulowano'){
        this.bufRentals.push(this.rentalsData[i]);
      }
    }
  }

  getAllRentals(){
    this.bufRentals = this.rentalsData;
  }

  ifReady(startDate) {

    var offDate = new Date(startDate.substring(0,10)+":"+startDate.substring(13,19)+":00.000Z");
    var offset = offDate.getTimezoneOffset() * 60000;
    var finalDate = new Date(offDate.getTime() + offset);

    if(finalDate.getTime() < Date.now())
      return true;
  }

  updateToActive(id, rental){

    rental.status = "Aktywne";

    this.dataService.updateRental(id, rental)
      .subscribe( res => {
      }, (err) => {
        console.log(err);
      }
    )
  }

  updateToCanceled(id, rental) {
    rental.status = "Anulowano";

    this.dataService.updateRental(id, rental)
      .subscribe( res => {
          console.log('Updated')
        }, (err) => {
          console.log(err);
        }
      )
  }

  updateToFinished(id, rental) {
    rental.status = "Zakończone";

    this.dataService.updateRental(id, rental)
      .subscribe( res => {
          console.log('Updated')
        }, (err) => {
          console.log(err);
        }
      )
  }

  getSearch(){
    this.dataService.getRentalsByUserIdNumber(this.searchQuery).subscribe(
      res => {
        this.bufRentals = res;
      }, (err) => {
        console.log(err);
      }
    )
  }
}
