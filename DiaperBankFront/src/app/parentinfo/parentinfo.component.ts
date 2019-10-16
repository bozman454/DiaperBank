import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterService } from '../register.service'
import { Injectable } from '@angular/core'
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Child } from '../child';


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
  childArray: Array<Child> = []
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
    this.parentForm.get('parentPhone').setValue('');
  }

  phoneFormat(str, key) {
    /*console.log("str: " + str)
    console.log("key: " + key)

    if (key.match("[0-9]")) {

    } else if (key.match("[(]") | key.match("[)]")) {
      console.log("paren")  
    } else if (key.match("[A-Za-z]")) {
      //console.log(str.slice(0, str.length - 1))
      this.parentForm.get('parentPhone').setValue(str.slice(0, str.length - 1))
    }*/

    //this.parentForm.get('parentPhone').setValue(str.replace('/^([0-9])/gi', ''))
  }

  submit(first, last, address, city, state, zip, county, phone){
    var confStr = 'Name: ' + first + ' ' + last + '\nAddr: ' + address + '\nCity: ' + city +
    '\nState: ' + state + '\nZIP: ' + zip + '\nCounty: ' + county  + '\nPhone: ' + phone

    console.log(this.childArray)

    for (var child of this.childArray) {
      confStr += '\nChild name: ' + child.fname + ' ' + child.lname + '\tDOB: ' + child.DOB
    }

    confStr += '\n\nWould you like to submit this information?'

    if (confirm(confStr)) {
    // console.log('Component: ' + first, last, address, city, state, zip, county, phone)
    // console.log('Child Array... ' + this.childArray)
      this.register.pass(first, last, address, city, state, zip, county, phone, this.childArray)
    }
  }


  

}
