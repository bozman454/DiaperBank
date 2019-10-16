import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../register.service';
<<<<<<< HEAD
import { Routes, RouterModule, Router } from '@angular/router';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component'
import { ParentInfoClass } from '../parentInfoClass';
=======
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
>>>>>>> e795c5a45d164519e1d23a6ee47134f4ca7a60b0

@Component({
  selector: 'app-showpeople',
  templateUrl: './showpeople.component.html',
  styleUrls: ['./showpeople.component.css']
})
export class ShowpeopleComponent implements OnInit {
<<<<<<< HEAD
  patronList;
  clickedPerson;
=======
  
  dataSource;
>>>>>>> e795c5a45d164519e1d23a6ee47134f4ca7a60b0

  constructor(public register: RegisterService, private router: Router, public parent: ParentinfoComponent) { }

  @ViewChild(MatSort, {static : true}) sort : MatSort;

  ngOnInit() {
    this.showPeople();
    console.log(this.dataSource);
  }

  displayedColumns : string[] = ['first', 'last', 'address', 'city', 'state', 'zip', 'county', 'phone'];

<<<<<<< HEAD
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

  
=======
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
>>>>>>> e795c5a45d164519e1d23a6ee47134f4ca7a60b0
}
