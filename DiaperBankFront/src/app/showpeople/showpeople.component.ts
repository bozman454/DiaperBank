import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-showpeople',
  templateUrl: './showpeople.component.html',
  styleUrls: ['./showpeople.component.css']
})
export class ShowpeopleComponent implements OnInit {
  patronList;

  constructor(public register: RegisterService) { }

  ngOnInit() {
  }


    //Calls the service to get the already scanned people and subscribes to the returned record
    showPeople(){
      this.register.getPreRegistered()
      .subscribe(record => {
        this.patronList = record;
        // console.log('showPeople(): ' + this.patronList)
      })
    }
}
