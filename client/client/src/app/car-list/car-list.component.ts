import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: any;
  carSearch: any;

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getAllCarData().subscribe(data => {
      this.cars = data;
      console.log(this.cars);
    });
  }

  getSearch() {
    if(this.carSearch === ''){
      this.dataService.getAllCarData().subscribe(data => {
        this.cars = data;
      });
    } else {
      this.dataService.getCarByName(this.carSearch).subscribe( data => {
        this.cars = data;
      });
    }


  }

}



