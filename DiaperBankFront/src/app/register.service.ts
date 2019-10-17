import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Child } from './child';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }


  //Passes the parent and child information to the express server
  pass(first, last, address, city, state, zip, county, phone, children: Array<Child>){
    console.log('Service: ' + {first, last, address, city, state, zip, county, phone})
    //console.log('Trial: ' + child + ' ' + child.length)
  
    var jsonObj = {first, last, address, city, state, zip, county, phone} //The parent part of the json
    var childnum = 1;
    var childComp = 1;
    var childInfo ='';

    //Separates out each child individually in the json so that each one is added to a different cell

    var idx = 1
    for (var child of children) {
      jsonObj['child ' + idx++] = child.fname + ' ' + child.lname + ', ' + child.DOB
    }

    /*child.forEach(element => {
      if(childComp == 0){
        childComp = 1
      }
      if(childComp == 3 ){
        console.log('element 3: ' + element)
        childInfo = childInfo + element
        jsonObj['child' + ' ' + childnum] = childInfo
        childComp = 0
        childInfo = ''
        childnum++
      }
      if(childComp == 2 ){
        console.log('element 2: ' + element)
        childInfo = childInfo + element + ', '
        childComp++
      }
      if(childComp == 1 ){
        console.log('element 1: ' + element)
        childInfo = childInfo + element + ' '
        childComp++
      }
    });*/

    // console.log('jsonobj: ' + JSON.stringify(jsonObj))



    return this.http.post('http://localhost:3000/addpatron', jsonObj)
      .subscribe((data) => {
        console.log(data);
    })
  }


  //Calls the express server to return the already scanned patrons
  getPreRegistered(){
    return this.http.get('http://localhost:3000/preregistered')
  }  
 

  confirmPerson(id){
    console.log('Service delete: ' + id)
    var url = 'http://localhost:3000/deleteperson/' + id
    console.log('URL: ' + url)
    return this.http.delete(url)
    .subscribe(

    )
  }

}
