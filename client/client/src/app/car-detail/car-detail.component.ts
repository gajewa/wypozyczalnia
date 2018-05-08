import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DataServiceService} from "../data-service.service";
import {AddOperationComponent} from "../add-operation/add-operation.component";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {

  car: any;
  editCar = false;
  showHistory = false;
  showOperations = false;
  startDate : string;
  endDate : string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private dataService: DataServiceService) { }

  ngOnInit() {
    this.getCarDetail(this.route.snapshot.params['id']);
  }

  getCarDetail(id){
    this.dataService.getCarById(id).subscribe( data => {
      this.car = data;
    });
  }

  toggleEdit(){
    this.editCar = !this.editCar;
  }

  deleteCar(id){
    this.dataService.deleteCar(id, this.car)
      .subscribe(res => {
        this.router.navigate(['/cars'])
      }, (err) => {
        console.log(err);
      })
  }

  toggleHistory(){
    this.showHistory = !this.showHistory;
  }

  toggleOperations(){
    this.showOperations = !this.showOperations;
  }


}

