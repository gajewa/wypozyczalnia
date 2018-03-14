import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCarComponent implements OnInit {

  car = {};

  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit() {
  }

  addCar() {
    this.http.post('http://localhost:3001/cars', this.car).subscribe(
      res => {
        console.log(this.car);
        this.router.navigate(['/cars']);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
