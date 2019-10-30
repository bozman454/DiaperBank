import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Child } from '../child';
import { ChildinfoComponent } from '../childinfo/childinfo.component'
import { ParentInfoClass } from '../parentInfoClass'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parentinfo',
  templateUrl: './parentinfo.component.html',
  styleUrls: ['./parentinfo.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class ParentinfoComponent implements OnInit {

  public parentForm
  childArray: Array<Child> = []
  patronList;
  childfirst;
  childlast;
  childbirth;
  parentInfoObject;

  //public childComp: ChildinfoComponent
  // public register: RegisterService,
  constructor(public http: HttpClient,  public pinfo: ParentInfoClass, private router: Router,  private route: ActivatedRoute) {
    this.parentForm = new FormGroup({
      parentFirstName: new FormControl('', [Validators.required]),
      parentLastName: new FormControl('', [Validators.required]),
      parentAddress: new FormControl('', [Validators.required]),
      parentCity: new FormControl('', [Validators.required]),
      parentState: new FormControl('', [Validators.required]),
      parentZIP: new FormControl('', [Validators.required]),
      parentCounty: new FormControl('', [Validators.required]),
      parentPhone: new FormControl('', [Validators.required]),
      parentDOB: new FormControl('', [Validators.required])
    });

    this.parentInfoObject = new ParentInfoClass()

    this.route.queryParams.subscribe(params => {
      if (params.first != null) {
        this.parentInfoObject.FirstName = params.first;
        this.parentInfoObject.LastName = params.last;
        this.parentInfoObject.Address = params.address;
        this.parentInfoObject.City = params.city;
        this.parentInfoObject.State = params.state;
        this.parentInfoObject.ZipCode = params.zip;
        this.parentInfoObject.County = params.county;
        this.parentInfoObject.DOB = params.dob;
        this.parentInfoObject.PhoneNumber = params.phone;
        this.parentInfoObject.id = params.id;
      }
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

  submit(first, last, address, city, state, zip, county, dob, phone, id){
    if(this.childArray[0] != null) { 
      var childString = '';

      for (var child of this.childArray) {
        childString += child.fname + ' ' + child.lname + ' ' + child.DOB + ' '
      
      }

      console.log('childstring: ' + childString)
      this.router.navigate(['Confirm'], { queryParams: { first, last, address, city, state, zip, county, dob, phone, id, childString }});
    } else {
      window.alert("You have not added any childeren to this form!");
    }
  }


}
