import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})
export class AddOperationComponent implements OnInit {

  description: String;
  operation: any = {};

  @Output() carAddedEvent = new EventEmitter<string>();
  @Output() myEvent = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private dataService: DataServiceService) { }

  ngOnInit() {
    this.operation.carId = this.route.snapshot.params['id'];
  }

  test() {
    console.log(this.operation);
  }

  callParent() {
    console.log('callparentmethod');
    this.myEvent.emit('eventDesc');
  }

  addOperation(){
    this.dataService.postNewOperation(this.operation).subscribe(
      res => {
        console.log('dodandddo operacje');
        this.carAddedEvent.emit('carAdded');
      }, (err) => {
        console.log(err);
      }
    )
  }

}
