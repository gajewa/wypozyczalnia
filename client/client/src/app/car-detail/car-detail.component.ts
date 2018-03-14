import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car = {};
  editCar = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCarDetail(this.route.snapshot.params['id']);
  }

  getCarDetail(id){
    this.http.get('http://localhost:3001/cars/'+id).subscribe( data => {
      this.car = data;
    });
  }

  toggleEdit(){
    this.editCar = !this.editCar;
  }

  deleteCar(id){
    this.http.delete('http://localhost:3001/cars/'+id, this.car)
      .subscribe(res => {
        this.router.navigate(['/cars'])
      }, (err) => {
        console.log(err);
      })
  }

  updateCar(id){
    this.http.put('http://localhost:3001/cars/'+id, this.car)
      .subscribe(res => {
        this.editCar = false;
      }, (err) => {
        console.log(err);
      })
  }

}
