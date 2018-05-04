import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserDetail(this.route.snapshot.params['id']);
  }

  getUserDetail(id){
    this.http.get('http://localhost:3001/users/'+id).subscribe( data => {
      this.user = data;
    });
  }


}
