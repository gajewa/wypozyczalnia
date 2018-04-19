import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: any;
  editCar = false;
  showHistory = false;
  startDate : string;
  endDate : string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCarDetail(this.route.snapshot.params['id']);
  }

  getCarDetail(id){
    this.http.get('http://localhost:3001/cars/'+id).subscribe( data => {
      this.car = data;
    });
  }

  toggleEdit(){
    this.editCar = !this.editCar;
  }

  deleteCar(id){
    this.http.delete('http://localhost:3001/cars/'+id, this.car)
      .subscribe(res => {
        this.router.navigate(['/cars'])
      }, (err) => {
        console.log(err);
      })
  }

 

  RentCar(carId){
    console.log(this.startDate);
    console.log(this.endDate);

    // this.http.get('http://localhost:3001/rentals').subscribe(
    //   data => {
    //     console.log(data);

    //     var userStart = new Date(this.startDate).getTime();
    //     var userEnd = new Date(this.endDate).getTime();

    //     for(let i in data){

    //       var elementStart = new Date(data[i].startDate).getTime();
    //       var elementEnd = new Date(data[i].endDate).getTime()

    //       if(userStart < elementEnd && userEnd > elementStart){ //if dates overlap
    //         window.alert("Overlap dla " + i);
    //         return
    //       }
    //     }

    //   }
    // )

    if(this.startDate == undefined || this.endDate == undefined) {
      window.alert("Proszę podać pełne daty wraz z godzinami!")
      return
    }

    if(Date.now() - new Date(this.startDate).getTime()>0){
      window.alert("Proszę zaznaczyć przyszłą datę wypożyczenia!")
      return
    }

    if(new Date(this.startDate).getTime() > new Date(this.endDate).getTime()){
      window.alert("Data wypozyczenia przed datą przyjęcia!");
      return
    }

    let rental = { "carId" : carId,
      "startDate" : new Date(this.startDate + ':00.000Z'),
      "endDate" : new Date(this.endDate + ':00.000Z'),
      "status" : "Oczekujące",
    };

    this.car.totalRentals += 1;

    var time1 =  new Date(this.endDate + ':00.000Z').getTime();
    var time2 = new Date(this.startDate + ':00.000Z').getTime();

    var days = this.dhm(time1 - time2);
    var payment = days * this.car.price;
    this.car.totalIncome += payment;
    console.log(payment);
    console.log(this.car.totalIncome);
    window.alert("sometext");

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
        this.router.navigate(['/myRentals']);
      }, (err) => {
        console.log(err);
      }
    )
  }

  func(){
    console.log(this.endDate);
    console.log(this.startDate);
    console.log(new Date(Date.now()).getHours() + ' ' +new Date(Date.now()).getMinutes());
    console.log(Date.now() - new Date(this.startDate).getTime());
  }

  toggleHistory(){
    this.showHistory = !this.showHistory;
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

