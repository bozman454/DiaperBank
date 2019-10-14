import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ParentinfoComponent } from '../parentinfo/parentinfo.component'
import { Injectable } from '@angular/core'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


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
  private children: object[] = []
  children2 = []
  
  // public parent: ParentinfoComponent
  constructor(public parent: ParentinfoComponent) {
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

  getChildren2(){
    // console.log('Get Children2 ... : ' + JSON.stringify(this.children2))
    return this.children2
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

      this.children2.push(JSON.stringify({fname}))
      this.children2.push(JSON.stringify({lname}))
      this.children2.push(JSON.stringify({DOB}))





      this.parent.childArray.push(fname)
      this.parent.childArray.push(lname)
      this.parent.childArray.push(DOB)



      
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
