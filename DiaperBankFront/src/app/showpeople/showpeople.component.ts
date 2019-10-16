import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterService } from '../register.service';
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
  
  dataSource;

  constructor(public register: RegisterService) { }

  @ViewChild(MatSort, {static : true}) sort : MatSort;

  ngOnInit() {
    this.showPeople();
    console.log(this.dataSource);
  }

  displayedColumns : string[] = ['id', 'first', 'last', 'address', 'city', 'state', 'zip', 'county', 'phone'];

  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Calls the service to get the already scanned people and subscribes to the returned record
  showPeople(){
    this.register.getPreRegistered()
    .subscribe(record => {
      this.dataSource = new MatTableDataSource(record);
      this.dataSource.sort = this.sort;
      return this.dataSource;
    })
  }
}
