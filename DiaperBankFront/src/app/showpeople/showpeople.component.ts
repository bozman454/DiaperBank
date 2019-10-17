import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../register.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component'
import { ParentInfoClass } from '../parentInfoClass';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Person {
  id: string;
  first: string;
  last: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  phone: string;
}


@Component({
  selector: 'app-showpeople',
  templateUrl: './showpeople.component.html',
  styleUrls: ['./showpeople.component.css']
})
export class ShowpeopleComponent implements OnInit {

  patronList;
  clickedPerson;
  dataSource;

  constructor(public register: RegisterService, private router: Router, public parent: ParentinfoComponent) { }

  @ViewChild(MatSort, {static : true}) sort : MatSort;

  ngOnInit() {
    this.showPeople();
    console.log(this.dataSource);
  }

  displayedColumns : string[] = ['first', 'last', 'address', 'city', 'state', 'zip', 'county', 'phone'];

  //When the person is clicked their info is sent to the html so that children can be added
  //Also deletes the person from the DB - not in yet
  verifyPerson(person) {
    let first = person.first;
    let last = person.last;
    let address = person.address;
    let city = person.city;
    let state = person.state;
    let zip = person.zip;
    let county = person.county;
    let phone = person.phone;
    this.router.navigate(['FamilyReg'], { queryParams: { first, last, address, city, state, zip, county, phone }});

  }

  
  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Calls the service to get the already scanned people and subscribes to the returned record
  showPeople(){
    this.register.getPreRegistered()
    .subscribe(record => {
      this.dataSource = new MatTableDataSource(<any> record);
      this.dataSource.sort = this.sort;
      return this.dataSource;
    })
  }

  printTest(i) {
    console.log(i.first);
  }
}
