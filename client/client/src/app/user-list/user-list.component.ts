import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any;
  searchQuery: any;
  constructor(private http: HttpClient, private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe( res => {
      this.users = res;
    })
  }

  getSearch(){
    if(this.searchQuery === ""){
      this.dataService.getUsers().subscribe( res => {
        this.users = res;
      })
    } else {
      this.dataService.getUserByIdCardNumber(this.searchQuery).subscribe( res => {
        this.users = res;
      })
    }
  }

}
