import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private dataService: DataServiceService) { }

  ngOnInit() {
    this.getUserDetail(this.route.snapshot.params['id']);
  }

  getUserDetail(id){
    this.dataService.getUsersById(id).subscribe( data => {
      this.user = data;
    });
  }


}
