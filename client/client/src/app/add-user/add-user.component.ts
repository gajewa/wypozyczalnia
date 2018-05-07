import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: any;
  resMessage: any;
  idNumber: String;

  constructor(private http: HttpClient, private data: UserServiceService,
              private dataService: DataServiceService) { }


  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    this.data.currentIdNumber.subscribe(value => this.user.idNumber = value);

  }

  addUser(){
    this.dataService.postNewUser(this.user).subscribe( res => {
        this.resMessage = res;

         if(this.resMessage.msg = "ok"){
           this.data.changeUser(this.user);
           this.data.changeUserFound(true);
           this.data.changePickUser(true);
           this.data.changeNewUser(false);
           this.data.changeShowUserSearch(false);

           this.data.changeUserId(this.resMessage.id);
         } else {
           window.alert('Jesteś już zarejestrowana/y!');
         }
    })
  }

}
