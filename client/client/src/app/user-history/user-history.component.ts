import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  rentals: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private dataService: DataServiceService) { }

  ngOnInit() {
    this.getUserDetail(this.route.snapshot.params['id']);
  }

  getUserDetail(id){
    this.dataService.getUserRentalsByUserId(id).subscribe( data => {
      this.rentals = data;
      console.log(this.rentals)
    });
  }
}
