import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  car: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/cars/'+this.route.snapshot.params['id']).subscribe( data => {
      this.car = data;
    });
  }
  updateCar(id){
    this.http.put('http://localhost:3001/cars/'+id, this.car)
      .subscribe(res => {
        location.reload();
      }, (err) => {
        console.log(err);
      })
  }
}
