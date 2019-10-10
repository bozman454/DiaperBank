import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegisterService } from '../register.service'

@Component({
  selector: 'app-parentinfo',
  templateUrl: './parentinfo.component.html',
  styleUrls: ['./parentinfo.component.css']
})
export class ParentinfoComponent implements OnInit {

  constructor(public http: HttpClient, public register: RegisterService) { }

  ngOnInit() {
  }


  submit(first, last, address, city, state, zip, county, phone){
    console.log('Component: ' + first, last, address, city, state, zip, county, phone)
    this.register.pass(first, last, address, city, state, zip, county, phone)
  }
}
