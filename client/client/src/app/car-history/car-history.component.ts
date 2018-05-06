import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-car-history',
  templateUrl: './car-history.component.html',
  styleUrls: ['./car-history.component.css']
})
export class CarHistoryComponent implements OnInit {

  carId: any;
  carHistory: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,
              private dataService: DataServiceService) { }

  ngOnInit() {
    this.carId = this.route.snapshot.params['id'];

    this.dataService.getCarById(this.carId).subscribe( rentalData => {
        this.carHistory = rentalData;
      }

    )
  }

}
