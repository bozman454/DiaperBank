import { Component, OnInit } from '@angular/core';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmInfoClass } from '../confirmInfoClass'
import { RegisterService } from '../register.service'

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public confirmForm
  confirmInfoObject;
  childString;
  // childArray;
  

  constructor(private router: Router, private route: ActivatedRoute, public register: RegisterService, public parent: ParentinfoComponent) {
    this.confirmForm = new FormGroup({
      confirmFirstName: new FormControl(),
      confirmLastName: new FormControl(),
      confirmAddress: new FormControl(),
      confirmCity: new FormControl(),
      confirmState: new FormControl(),
      confirmZip: new FormControl(),
      confirmCounty: new FormControl(),
      confirmPhone: new FormControl(),
      confirmChildren: new FormControl()
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
      }
    });
    
  }

  ngOnInit() {
  }


  submit(first, last, dob, address, city, state, zip, county, phone, id){
    console.log('Confirming person...')
    let childrenArray = this.printChildren(this.confirmInfoObject.childString)
    console.log('childrenarray confirm: ' + childrenArray)
    this.register.pass(first, last, dob, address, city, state, zip, county, phone, childrenArray)
  }

  printChildren(s){
    console.log('s: ' + s)
    var temp = s.split(" ")
    console.log('temp ' + temp)
    return temp
  }

}
