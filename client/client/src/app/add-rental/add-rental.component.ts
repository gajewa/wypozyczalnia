import { Component, OnInit, Input,ViewContainerRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.css']
})
export class AddRentalComponent implements OnInit {

  message: string;
  startDate : string;
  endDate : string;
  newUser: boolean = false;
  pickUser: boolean = false;
  userFound: boolean = false;
  userId: String;
  discount: Number;
  @Input() car: any;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router, private data: UserServiceService, public toastr: ToastsManager,  private vcr: ViewContainerRef) {
    }

  ngOnInit() {
    this.data.currentUserFound.subscribe(value => this.userFound = value);
    this.data.currentNewUser.subscribe(value => this.newUser = value);
    this.data.currentPickUser.subscribe(value => this.pickUser = value);
    this.data.currentUserId.subscribe(value => this.userId = value);
    this.data.currentDiscount.subscribe(value => this.discount = value);
    this.toastr.setRootViewContainerRef(this.vcr);

  }

  toggleUsersAddComponent(){
    if(this.newUser){
      this.newUser = !this.newUser;
    } else {
      this.newUser = !this.newUser;
      this.pickUser = false;
    }
  }

  togglePickUserComponent(){
    if(this.pickUser){
      this.pickUser = !this.pickUser;
    } else {
      this.pickUser = !this.pickUser;
      this.newUser = false;
    }
  }

  RentCar(carId){

    if(this.startDate == undefined || this.endDate == undefined) {
      this.toastr.error('Proszę wybrać dwie poprawne daty wraz z godzinami!');
      return
    }

    if(Date.now() - new Date(this.startDate).getTime()>0){
      this.toastr.error("Proszę zaznaczyć przyszłą datę wypożyczenia!")
      return
    }

    if(new Date(this.startDate).getTime() > new Date(this.endDate).getTime()){
      this.toastr.error("Data oddadnia przed datą wypozyczenia!");
      return
    }

    let rental = { "carId" : carId,
      "userId": this.userId,
      "startDate" : new Date(this.startDate + ':00.000Z'),
      "endDate" : new Date(this.endDate + ':00.000Z'),
      "status" : "Oczekujące",
      "discount": this.discount
    };

    this.http.post('http://localhost:3001/rentals', rental).subscribe(
      res => {
        this.data.changeDiscount(0);
        this.router.navigate(['/myRentals']);
      }, (err) => {
        console.log(err);
      }
    )
  }
}
