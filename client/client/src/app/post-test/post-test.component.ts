import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.css']
})
export class PostTestComponent implements OnInit {

  number: Number;
  data: String;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  send(){
    this.http.post('http://27ac4cc4.ngrok.io/testStream', {"num": this.number, "data": this.data}).subscribe(res => {
      console.log('posted');
    });
  }
}
