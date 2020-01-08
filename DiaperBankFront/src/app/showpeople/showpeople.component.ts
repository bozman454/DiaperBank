import { Component, OnInit, ViewChild, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { RegisterService } from '../register.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component'
import { ParentInfoClass } from '../parentInfoClass';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core'
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-showpeople',
  templateUrl: './showpeople.component.html',
  styleUrls: ['./showpeople.component.css']
})
@Injectable({
  providedIn: 'root',
})

export class ShowpeopleComponent implements OnInit {

  showbool: boolean = false;
  patronList = 0;
  clickedPerson;
  dataSource;
  myDate = new Date();

  constructor(public register: RegisterService, private router: Router, public parent: ParentinfoComponent, public parentClass: ParentInfoClass) {
    this.showbool = true
   }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.showPeople();
  }

  displayedColumns: string[] = ['first', 'last', 'dob', 'address', 'city', 'state'];

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
    let id = person._id;
    let dob = person.DOB;
    this.router.navigate(['FamilyReg'], { queryParams: { first, last, dob, address, city, state, zip, county, phone, id } });


  }

  removePeople() {
    if (confirm("Delete all cached scans? All people who were scanned previously will be removed for the database. Continue?")) {
      this.register.removeEveryone().subscribe(record => { console.log(record); this.showPeople() });
    }


  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Calls the service to get the already scanned people and subscribes to the returned record
  showPeople() {
    console.log(this.myDate);
    this.register.getPreRegistered()
      .subscribe(record => {
        if (record) {
          this.dataSource = new MatTableDataSource(<any>record);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return this.dataSource;
        }
        else{
            console.log('yo')
            this.showbool = false;
        }
      })
  }

  printTest(i) {
    console.log(i.first);
  }
}
