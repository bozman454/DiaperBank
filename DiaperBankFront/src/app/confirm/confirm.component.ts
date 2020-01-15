import { Component, OnInit } from '@angular/core';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmInfoClass } from '../confirmInfoClass'
import { RegisterService } from '../register.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core'


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class ConfirmComponent implements OnInit {

  public confirmForm
  confirmInfoObject;
  childString;
  // childArray;


  constructor(private _snackBar : MatSnackBar, private router: Router, private route: ActivatedRoute, public register: RegisterService, public parent: ParentinfoComponent) {
    this.confirmForm = new FormGroup({
      confirmFirstName: new FormControl(),
      confirmLastName: new FormControl(),
      confirmAddress: new FormControl(),
      confirmCity: new FormControl(),
      confirmState: new FormControl(),
      confirmZip: new FormControl(),
      confirmCounty: new FormControl(),
      confirmPhone: new FormControl(),
      confirmChildren: new FormControl(),
      confirmDOB: new FormControl()
    });

    this.confirmInfoObject = new ConfirmInfoClass()

    this.route.queryParams.subscribe(params => {
      if (params.first != null) {
        this.confirmInfoObject.FirstName = params.first;
        this.confirmInfoObject.LastName = params.last;
        this.confirmInfoObject.Address = params.address;
        this.confirmInfoObject.City = params.city;
        this.confirmInfoObject.State = params.state;
        this.confirmInfoObject.ZipCode = params.zip;
        this.confirmInfoObject.County = params.county;
        this.confirmInfoObject.PhoneNumber = params.phone;
        this.confirmInfoObject.id = params.id;
        this.confirmInfoObject.childString = params.childString;
        this.confirmInfoObject.DOB = params.dob;
      }
    });
  }

  ngOnInit() {
  }

  openSnackBar(message : string, action : string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }


  submit(first, last, address, city, state, zip, county, dob, phone, id){
    console.log('Confirming person...')
    let childrenArray = this.printChildren(this.confirmInfoObject.childString)
    console.log('childrenarray confirm: ' + childrenArray)
    this.register.pass(first, last, address, city, state, zip, county, dob,  phone, childrenArray, this.confirmInfoObject.id)
    this.register.confirmPerson(id)
  }

  printChildren(s){
    console.log('s: ' + s)
    var temp = s.split(" ")
    console.log('temp ' + temp)
    return temp
  }

  back(first, last, address, city, state, zip, county, dob, phone, id){
    // let childrenArray = this.printChildren(this.confirmInfoObject.childString)
    let childrenString = this.confirmInfoObject.childString;
    var createChildPromise = new Promise((res,rej)=>{
      this.parent.backChildren(childrenString)
      res(1);
    })
    // console.log('CHILDREN STRING: ' + childrenString)
    // createChildPromise.then(()=>{
    //   console.log("LET THEM EAT CAKE SHE SAID JSUT LIKE MARIE ANTOINETTE")
    //   this.router.navigate(['FamilyReg'], { queryParams: { first, last, address, city, state, zip, county, dob, phone, id, childrenString }})

    // }
    // )
    this.router.navigate(['FamilyReg'], { queryParams: { first, last, address, city, state, zip, county, dob, phone, id, childrenString }})
  }

}
