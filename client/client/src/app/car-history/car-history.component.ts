import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-history',
  templateUrl: './car-history.component.html',
  styleUrls: ['./car-history.component.css']
})
export class CarHistoryComponent implements OnInit {

  carId: any;
  carHistory: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.carId = this.route.snapshot.params['id'];

    this.http.get('http://localhost:3001/rentals/'+this.carId).subscribe( rentalData => {
        this.carHistory = rentalData;
      }

    )
  }

  

}
