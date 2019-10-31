import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component'
import { Injectable } from '@angular/core';
import { Child } from '../child';
import { ParentInfoClass } from '../parentInfoClass';


@Component({
  selector: 'app-childinfo',
  templateUrl: './childinfo.component.html',
  styleUrls: ['./childinfo.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class ChildinfoComponent implements OnInit {

  
  private childForm
  private children: Array<Child> = []
  minDate: Date;
  maxDate = new Date();

  
  // public parent: ParentinfoComponent
  constructor(public parent: ParentinfoComponent, public parentClass: ParentInfoClass) {
    this.childForm = new FormGroup({
      childFirstName: new FormControl(),
      childLastName: new FormControl(),
      childDOB: new FormControl()
    });

    // this.childForm.get('childFirstName').setValue('Christina');
    // console.log(this.childForm.childFirstName)
    // console.log("Test")
   }

  ngOnInit() {
    this.minDate = this.getMinDate();
  }

  getChildren() {
    return this.children
  }


  addChild(fname, lname, DOB) {
    if (fname && lname && DOB) {
      // var child = new Child(fname, lname, DOB)
      var child = new Child()
      child.fname = fname;
      child.lname = lname;
      child.DOB = DOB;

      this.children.push(child)

      this.childForm.get('childFirstName').setValue('');
      this.childForm.get('childLastName').setValue('');
      this.childForm.get('childDOB').setValue('');

      this.parent.childArray.push(child)      
    }

  }

  deleteChild = child => {
    if (confirm("Delete " + child.fname + "?")) {
      let index = this.children.indexOf(child);
      if (index > -1)
      {
        this.children.splice(index, 1)
      }
    }
  }

  getMinDate() {
    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 3);
    console.log(this.maxDate);
    console.log(minDate);
    return minDate;
  }
}
