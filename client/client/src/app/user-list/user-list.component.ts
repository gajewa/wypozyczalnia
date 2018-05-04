import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  searchQuery: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3001/users').subscribe( res => {
      this.users = res;
    })
  }

  getSearch(){
    if(this.searchQuery === ""){
      this.http.get('http://localhost:3001/users').subscribe( res => {
        this.users = res;
      })
    } else {
      this.http.get('http://localhost:3001/users/idNumber/' + this.searchQuery).subscribe( res => {
        this.users = res;
      })
    }
  }

}
