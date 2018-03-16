import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-show-rentals',
  templateUrl: './show-rentals.component.html',
  styleUrls: ['./show-rentals.component.css']
})
export class ShowRentalsComponent implements OnInit {

  rentals : any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let bufRentals : any;

    this.http.get('http://localhost:3001/rentals').subscribe( data => {
        this.rentals = data;
      }
    )



  }

  func() {
    for(let element in this.rentals){

    }
  }

}
