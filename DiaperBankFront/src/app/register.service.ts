import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Child } from './child';
import { ConfirmComponent } from './confirm/confirm.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(public http: HttpClient, private router: Router) {

  }

  //Passes the parent and child information to the express server
  pass(first, last, address, city, state, zip, county, dob, phone, childrenArray, id){

    var jsonObj = {first, last, dob, address, city, state, zip, county, phone} //The parent part of the json

    console.log('id: ' + id)
    console.log('prejson: ' + childrenArray)
    var idx = 0
    var childNum = 1
    var numOfChildren = (childrenArray.length/3)
    var num = 1
    childrenArray.forEach(element => {
      // jsonObj['child ' + idx++] = element.fname + ' ' + element.lname + ', ' + element.DOB

      if((childNum) < numOfChildren){
        jsonObj['child ' + childNum++] = childrenArray[num-1] + ' ' + childrenArray[num] + ', ' + childrenArray[num+1]
        idx = idx +3
        num = num + 3
      }
    });


    console.log('JSON: ' + JSON.stringify(jsonObj))


    return this.http.post('http://localhost:5001/addpatron', jsonObj)
      .subscribe((data) => {
        console.log("newly added patron" + data);
        // this.router.navigate(['show'])
    }),(
    //   this.confirmPerson(id)
    // ),(
      this.router.navigate(['show'])
    )
  }



  //Calls the express server to return the already scanned patrons
  getPreRegistered(){
    return this.http.get('http://localhost:5000/preregistered')
  }
  removeEveryone(){
    return this.http.get('http://localhost:5000/deletedata')
  }

  confirmPerson(id){
    console.log('Service delete: ' + id)
    var url = 'http://localhost:5000/deleteperson/' + id
    console.log('URL: ' + url)
    return this.http.post(url,{}).subscribe(res=>console.log("deleted person"))
  }

}
