import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Child } from '../child';
import { ChildinfoComponent } from '../childinfo/childinfo.component'
import { ParentInfoClass } from '../parentInfoClass'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { format } from 'url';

@Component({
  selector: 'app-parentinfo',
  templateUrl: './parentinfo.component.html',
  styleUrls: ['./parentinfo.component.css']
})
@NgModule({
  providers: [Child]
})

@Injectable({
  providedIn: 'root',
})

export class ParentinfoComponent implements OnInit {

  public parentForm;
  childArray: Array<Child> = []
  patronList;
  childfirst;
  childlast;
  childbirth;
  parentInfoObject;
  listOfChildren;
  childTest: Child;
  states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  //public childComp: ChildinfoComponent
  // public register: RegisterService,
  constructor(
    public http: HttpClient,  
    public pinfo: ParentInfoClass, 
    private router: Router,  
    private route: ActivatedRoute, 
    public child: Child, 
    private formBuilder: FormBuilder,
    ) {
    
    
    this.parentInfoObject = new ParentInfoClass()

    this.route.queryParams.subscribe(params => {
      // if (params.first != null) {
        this.parentInfoObject.FirstName = params.first;
        if(this.parentInfoObject.FirstName == null){
          this.parentInfoObject.FirstName = ''
        }
        this.parentInfoObject.LastName = params.last;
        if(this.parentInfoObject.LastName == null){
          this.parentInfoObject.LastName = ''
        }
        this.parentInfoObject.Address = params.address;
        if(this.parentInfoObject.Address == null){
          this.parentInfoObject.Address = ''
        }
        this.parentInfoObject.City = params.city;
        if(this.parentInfoObject.City == null){
          this.parentInfoObject.City = ''
        }
        this.parentInfoObject.State = params.state;
        if(this.parentInfoObject.State == null){
          this.parentInfoObject.State = ''
        }
        this.parentInfoObject.ZipCode = params.zip;
        if(this.parentInfoObject.ZipCode == null){
          this.parentInfoObject.ZipCode = ''
        }
        if(this.parentInfoObject.ZipCode != ''){
          if(this.parentInfoObject.ZipCode.length > 5){
            this.parentInfoObject.ZipCode = this.parentInfoObject.ZipCode.substring(0,5)
          }
          this.findCounty(this.parentInfoObject.ZipCode)
        }
        // this.parentInfoObject.County = params.county;
        if(this.parentInfoObject.County == null){
          this.parentInfoObject.County = ''
        }

        this.parentInfoObject.DOB = params.dob;
        console.log(this.parentInfoObject.DOB)
        if(this.parentInfoObject.DOB == null){
          this.parentInfoObject.DOB = ''
        }
        this.parentInfoObject.PhoneNumber = params.phone;
        if(this.parentInfoObject.PhoneNumber == null){
          this.parentInfoObject.PhoneNumber = ''
        }
        this.parentInfoObject.id = params.id;
        if(params.childrenString != null){
          this.listOfChildren = params.childrenString;
          console.log('LIST OF CHILDREN: ' + this.listOfChildren)
          this.backChildren(this.listOfChildren)
          this.listOfChildren = ''
        }
    });
    this.parentForm = new FormGroup({
      parentFirstName: new FormControl('', [Validators.required]),
      parentLastName: new FormControl('', [Validators.required]),
      parentAddress: new FormControl('', [Validators.required]),
      parentCity: new FormControl('', [Validators.required]),
      parentState: new FormControl(this.parentInfoObject.State, [Validators.required]),
      parentZIP: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      parentCounty: new FormControl('', [Validators.required]),
      parentPhone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])),
      parentDOB: new FormControl('', [Validators.required]),
    });  
  }

  ngOnInit() {
    this.parentForm.get('parentPhone').setValue('');   
  } 

  updatePhone() {
    let currentPhoneString = document.getElementById('phone').value;

    // start by parsing out all special characters
    // leaving us with the raw number
    let rawPhoneNumberString = currentPhoneString
    .replace('(', '')
    .replace(')', '')
    .replace('-', '')
    .replace(' ', '');

    // Format the phone number such that it inputs nicely
    let numberLength = rawPhoneNumberString.length;
    let formattedString = '';
    if(numberLength === 0) {
      // There is no number, keep the string empty
    }
    else if(numberLength < 4) {
      // We just have the area code. Put the parenthesis at the start
      formattedString += '(' + parseInt(rawPhoneNumberString);
    }
    else if(numberLength < 7) {
      // We have the first part for the main phone number, 
      // add both parentheses for the area code and a space
      formattedString += '(' 
      + parseInt(rawPhoneNumberString.substring(0,3))
      + ') '
      + parseInt(rawPhoneNumberString.substring(3));
    }
    else {
      // We are past the hyphen
      formattedString += '(' 
      + parseInt(rawPhoneNumberString.substring(0,3))
      + ') '
      + parseInt(rawPhoneNumberString.substring(3,6))
      + '-'
      + parseInt(rawPhoneNumberString.substring(6));
    }

    // Now, set the string in the element
    this.parentInfoObject.PhoneNumber = formattedString;

  }

  submitForm(post) {
    let first = post.parentFirstName;
    let last = post.parentLastName;
    let address = post.parentAddress;
    let city = post.parentCity;
    let state = post.parentState;
    let zip = post.parentZIP;
    let county = post.parentCounty;
    let dob = post.parentDOB;
    let phone = post.parentPhone;
    let id = post.id;

    if(first && last  && address && city && state && zip && county && dob && phone){
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
    } else {
      window.alert("Please fill all required fields")
    }

  }


  backChildren(s){
    var temp = s.split(" ")
    console.log('TEMP' + temp)

    var idx = 0
    var childNum = 1
    var numOfChildren = (temp.length/3)
    var num = 1
    temp.forEach(element => {
      if((childNum) < numOfChildren){
        let fname = temp[num-1]
        let lname = temp[num]
        let DOB = temp[num+1]
        if (fname && lname && DOB) {
          var child = new Child()
          child.fname = fname;
          child.lname = lname;
          child.DOB = DOB;
          console.log(JSON.stringify(child))

          this.childArray.push(child)
        }
        idx = idx +3
        num = num + 3
      }      
    });
  }


  deleteChild = child => {
    if (confirm("Delete " + child.fname + "?")) {
      let index = this.childArray.indexOf(child);
      if (index > -1)
      {
        this.childArray.splice(index, 1)
      }
    }
  }

  findCounty(zip){
    if (zip.length == 5) {
      var url = 'http://localhost:5000/getcounty/' + zip
      // console.log('URL: ' + url)
      this.http.get(url)
        .subscribe((data) => {
          var countyString = JSON.stringify(data)
          var countyStringLength = (countyString.length - 2)
          this.parentInfoObject.County = (countyString.substring(11, countyStringLength))
        })
    }
    else{
      this.parentInfoObject.County = ''
    }
  }
}
