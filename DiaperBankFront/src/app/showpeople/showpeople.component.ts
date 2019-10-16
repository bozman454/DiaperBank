import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component'
import { ParentInfoClass } from '../parentInfoClass';

@Component({
  selector: 'app-showpeople',
  templateUrl: './showpeople.component.html',
  styleUrls: ['./showpeople.component.css']
})
export class ShowpeopleComponent implements OnInit {
  patronList;
  clickedPerson;

  constructor(public register: RegisterService, private router: Router, public parent: ParentinfoComponent) { }

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

  //When the person is clicked their info is sent to the html so that children can be added
  //Also deletes the person from the DB - not in yet
  verifyPerson(id, first, last, address, city, state, zip, county, phone) {

    this.router.navigate(['FamilyReg'], { queryParams: { first, last, address, city, state, zip, county, phone }});

  }

  
}
