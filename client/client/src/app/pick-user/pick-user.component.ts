import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-pick-user',
  templateUrl: './pick-user.component.html',
  styleUrls: ['./pick-user.component.css']
})
export class PickUserComponent implements OnInit {

  idNumber : String;
  user: any;
  rankData: any;
  userFound: boolean;
  message: string;
  notFound: boolean = false;
  showUserSearch: boolean;
  // discount: Number;

  constructor(private http: HttpClient, private data: UserServiceService) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    this.data.currentUserFound.subscribe(value => this.userFound = value);
    this.data.currentshowUserSearch.subscribe(value => this.showUserSearch = value);
    // this.data.currentDiscount.subscribe(value => this.discount = value);
  }

  search(){
    console.log(this.idNumber);
    var sendObject = { "idNumber": this.idNumber};

    this.http.post('http://localhost:3001/users/idNumber', sendObject).subscribe( data => {
      if(data[0] === undefined){
        this.data.changeNewUser(true);
        this.data.changeUserFound(false);
        this.data.changeDiscount(0);
        this.data.changeIdNumber(this.idNumber);
      } else {
        this.data.changeNewUser(false);
        this.user = data[0];
        this.data.changeUserId(this.user._id);
        this.userFound = true;
        this.data.changeUserFound(true);

        this.http.get('http://localhost:3001/users/ranking').subscribe( rankData => {
          this.rankData = rankData;
          if(this.rankData[0]._id == this.user._id){
            this.data.changeDiscount(0.2);
          } else if(this.rankData[1]._id == this.user._id){
            this.data.changeDiscount(0.15);
          } else if(this.rankData[2]._id == this.user._id){
            this.data.changeDiscount(0.1);
          }
        })
      }
    })
  }
}
