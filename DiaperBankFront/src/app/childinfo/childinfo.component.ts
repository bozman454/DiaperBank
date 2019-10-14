import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-childinfo',
  templateUrl: './childinfo.component.html',
  styleUrls: ['./childinfo.component.css']
})
export class ChildinfoComponent implements OnInit {

  
  private childForm
  private children: object[] = []
  
  constructor() {
    this.childForm = new FormGroup({
      childFirstName: new FormControl(),
      childLastName: new FormControl(),
      childDOB: new FormControl()
    });

    this.childForm.get('childFirstName').setValue('Christina');
    console.log(this.childForm.childFirstName)
    console.log("Test")
   }

  ngOnInit() {
  }

  getChildren() {
    return this.children;
  }

  addChild(fname, lname, DOB) {

    if (fname && lname && DOB) {
      var child = ({
        fname: fname,
        lname: lname,
        DOB: DOB
      })

      this.children.push(child)

      this.childForm.get('childFirstName').setValue('');
      this.childForm.get('childLastName').setValue('');
      this.childForm.get('childDOB').setValue('');
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
}
