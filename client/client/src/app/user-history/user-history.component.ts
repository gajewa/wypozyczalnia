import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  rentals: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserDetail(this.route.snapshot.params['id']);
  }

  getUserDetail(id){
    this.http.get('http://localhost:3001/rentals/user/'+id).subscribe( data => {
      this.rentals = data;
      console.log(this.rentals)
    });
  }
}
