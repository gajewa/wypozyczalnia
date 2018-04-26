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
  userId: String;
  discount: Number;
  @Input() car: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, 
    private router: Router, private data: UserServiceService, public toastr: ToastsManager,  private vcr: ViewContainerRef) { 
    }

  ngOnInit() {
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
    console.log('asdasdasd')
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
      "startDate" : new Date(this.startDate + ':00.000Z'),
      "endDate" : new Date(this.endDate + ':00.000Z'),
      "status" : "Oczekujące",
      "userId": this.userId,
      "discount": this.discount
    };
    console.log(rental);
    window.alert(rental);
    this.car.totalRentals += 1;

    var time1 =  new Date(this.endDate + ':00.000Z').getTime();
    var time2 = new Date(this.startDate + ':00.000Z').getTime();

    var days = this.dhm(time1 - time2);

    var payment = days * this.car.price * (1 - parseFloat(this.discount.toString()));
    this.car.totalIncome += payment;

    window.alert("sometext");

    this.http.put('http://localhost:3001/users/updateSpending', {"id" : this.userId, "payment": payment}).subscribe( res=> {
      console.log("user put");
    }, (err) => {
      console.log("user put err");
      console.log(err);
    })

    this.http.put('http://localhost:3001/cars/' + this.route.snapshot.params['id'], this.car )
      .subscribe( res => {
          console.log("put");
        }, (err) => {
          console.log(err)
        }
      )


    this.http.post('http://localhost:3001/rentals', rental).subscribe(
      res => {
        console.log(rental);
        this.data.changeDiscount(0);
        this.router.navigate(['/myRentals']);
      }, (err) => {
        console.log(err);
      }
    )
  }

  dhm(t){
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor( (t - d * cd) / ch)
  
    if(h>0)
      d++;
  
    return d;
  }




}
