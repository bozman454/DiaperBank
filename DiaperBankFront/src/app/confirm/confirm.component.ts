import { Component, OnInit } from '@angular/core';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public confirmForm

  constructor() {
    this.confirmForm = new FormGroup({
      confirmFirstName: new FormControl(),
      confirmLastName: new FormControl(),
    });
   }

  ngOnInit() {
  }

}
