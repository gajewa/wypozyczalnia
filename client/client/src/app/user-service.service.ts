import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserServiceService {

  private userSource = new BehaviorSubject<any>(
    {
      name: "",
      lastName: "",
      idNumber: "",
      phoneNumber: null,
      address: "",
      moneySpent: 0,
      numberOfRentals: 0
    });
  private userFoundSource = new BehaviorSubject<boolean>(false);
  private newUserSource = new BehaviorSubject<boolean>(false);
  private pickUserSource = new BehaviorSubject<boolean>(false);
  private showUserSearchSource = new BehaviorSubject<boolean>(true);
  private userIdSource = new BehaviorSubject<String>("");
  private discountSource = new BehaviorSubject<Number>(0);
  
  currentUser = this.userSource.asObservable();
  currentUserFound = this.userFoundSource.asObservable();
  currentNewUser = this.newUserSource.asObservable();
  currentPickUser = this.pickUserSource.asObservable();
  currentshowUserSearch = this.showUserSearchSource.asObservable();
  currentUserId = this.userIdSource.asObservable();
  currentDiscount = this.discountSource.asObservable();

  constructor() { }

  changeUser(user: any){
    this.userSource.next(user);
  }
  changeUserFound(value: boolean){
    this.userFoundSource.next(value);
  }
  changeNewUser(value: boolean){
    this.newUserSource.next(value);
  }
  changePickUser(value: boolean){
    this.pickUserSource.next(value);
  }
  changeShowUserSearch(value: boolean){
    this.showUserSearchSource.next(value);
  }
  changeUserId(value: String){
    this.userIdSource.next(value);
  }
  changeDiscount(value: Number){
    this.discountSource.next(value);
  }
}
