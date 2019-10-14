import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterService } from '../register.service'
import { ChildinfoComponent } from '../childinfo/childinfo.component'
import { Injectable } from '@angular/core'


@Component({
  selector: 'app-parentinfo',
  templateUrl: './parentinfo.component.html',
  styleUrls: ['./parentinfo.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ParentinfoComponent implements OnInit {

  private parentForm
  childArray: string[] = [];
  childArray2 = [];
  childfirst;
  childlast;
  childbirth;
  jsonObj = {};

  //public childComp: ChildinfoComponent
  constructor(public http: HttpClient, public register: RegisterService, ) { 
    this.parentForm = new FormGroup({
      parentFirstName: new FormControl(),
      parentLastName: new FormControl(),
      parentAddress: new FormControl(),
      parentCity: new FormControl(),
      parentState: new FormControl(),
      parentZIP: new FormControl(),
      parentCounty: new FormControl(),
      parentPhone: new FormControl()
    });
  }

  ngOnInit() {
  }


  submit(first, last, address, city, state, zip, county, phone){
    // console.log('Component: ' + first, last, address, city, state, zip, county, phone)
    // console.log('Child Array... ' + this.childArray)

    
    this.register.pass(first, last, address, city, state, zip, county, phone, this.childArray)
  }


  

}
