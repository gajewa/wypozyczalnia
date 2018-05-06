import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';

@Injectable()
export class DataServiceService {
  private serverAdress = 'http://localhost:3001/';
  constructor(private http: HttpClient) { }

  getAllCarData() {
    return this.http.get(this.serverAdress + 'cars');
  }

  postNewCar(car) {
    return this.http.post(this.serverAdress + 'cars', car);
  }

  postNewRental(rental) {
    return this.http.post(this.serverAdress + 'rentals', rental);
  }

  postNewUser(user) {
    return this.http.post(this.serverAdress + 'users', user);
  }

  getCarById(id) {
    return this.http.get(this.serverAdress + 'cars/'+id);
  }

  deleteCar(id, car) {
    return this.http.delete(this.serverAdress + id, car);
  }

  getCarByName(name) {
    return this.http.get(this.serverAdress + 'cars/name/'+name);
  }

  getUserByIdCardNumberPost(idNumberObject){
    return this.http.post('http://localhost:3001/users/idNumber', idNumberObject);
  }

  getUserByIdCardNumber(idNumber) {
    return this.http.get('http://localhost:3001/users/idNumber/' + idNumber);
  }

  getUserRanking() {
    return this.http.get(this.serverAdress +  'users/ranking');
  }

  getPopulatedRentals() {
    return this.http.get(this.serverAdress + 'rentals/test');
  }

  updateRental(id, rental) {
    return this.http.put(this.serverAdress + 'rentals/' + id, rental);
  }

  getRentalsByUserIdNumber(idNumber) {
    return this.http.get(this.serverAdress + 'rentals/test/' + idNumber);
  }

  getRentals() {
    return this.http.get(this.serverAdress + 'stats/rentals');
  }

  getUserRentalsByUserId(id) {
    return this.http.get(this.serverAdress + 'rentals/user/'+id);
  }

  getUsers() {
    return this.http.get(this.serverAdress + 'users');
  }

  getUsersById(id) {
    return this.http.get(this.serverAdress + 'users/' + id);
  }

  getCarRentalByCarId(id) {
    return this.http.get('http://localhost:3001/rentals/' + id);
  }
}
