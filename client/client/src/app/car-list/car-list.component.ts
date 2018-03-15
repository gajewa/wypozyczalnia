import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: any;
  carSearch: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/cars').subscribe(data => {
      this.cars = data;
    });
  }

  getSearch() {
    if(this.carSearch === ''){
      this.http.get('http://localhost:3001/cars').subscribe(data => {
        this.cars = data;
      });
    } else {
      this.http.get('http://localhost:3001/cars/name/'+this.carSearch).subscribe( data => {
        this.cars = data;
      });
    }


  }

}



