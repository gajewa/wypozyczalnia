import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCarComponent implements OnInit {

  car = {
    "make":"",
    "model":"",
    "year": "",
    "seats": "",
    "body": "",
    "engine": "",
    "price": "",
    "totalRentals": 0,
    "totalIncome" : 0,
  };

  constructor(private http: HttpClient,  private router: Router, private dataService: DataServiceService ) { }

  ngOnInit() {
  }

  addCar() {

    this.dataService.postNewCar(this.car).subscribe(
      res => {
        console.log(this.car);
        this.router.navigate(['/cars']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  test(){
    console.log(this.car);
  }

}
