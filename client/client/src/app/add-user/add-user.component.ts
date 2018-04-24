import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: any;
  resMessage: any;

  constructor(private http: HttpClient, private data: UserServiceService) { }
  

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
  }

  addUser(){
    this.http.post('http://localhost:3001/users', this.user).subscribe( res => {
      this.resMessage = res;
      if(this.resMessage.msg = "ok")
        console.log('ok');
    })
  }

  test(){
    this.http.post('http://localhost:3001/users', this.user).subscribe( res => {
        this.resMessage = res;
        // console.log(this.resMessage);
         if(this.resMessage.msg = "ok"){
           this.data.changeUser(this.user);
           this.data.changeUserFound(true);
           this.data.changePickUser(true);
           this.data.chengeNewUser(false);
           this.data.changeShowUserSearch(false);
          //  console.log(this.resMessage.userId)
           this.data.changeUserId(this.resMessage.id);
         } else {
           window.alert('Jesteś już zarejestrowana/y!');
         }
    })
  }

}
