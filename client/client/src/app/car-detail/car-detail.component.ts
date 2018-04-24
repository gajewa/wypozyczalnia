import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: any;
  editCar = false;
  showHistory = false;
  startDate : string;
  endDate : string;

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

  toggleHistory(){
    this.showHistory = !this.showHistory;
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

}

