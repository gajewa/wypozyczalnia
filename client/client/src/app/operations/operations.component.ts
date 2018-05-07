import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: any;

  constructor(private dataService: DataServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getOperationsByCarId(this.route.snapshot.params['id']).subscribe( data => {
      this.operations = data;
    })
  }

}
