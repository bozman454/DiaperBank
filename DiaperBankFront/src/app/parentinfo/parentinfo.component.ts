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
  patronList;
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



  //Passes the parrent and child information from the html form to the service
  submit(first, last, address, city, state, zip, county, phone){
    
    this.register.pass(first, last, address, city, state, zip, county, phone, this.childArray)

  }

  //Calls the service to get the already scanned people and subscribes to the returned record
  showPeople(){
    this.register.getPreRegistered()
    .subscribe(record => {
      this.patronList = record;
      console.log('showPeople(): ' + this.patronList)
    })
  }


  

}
