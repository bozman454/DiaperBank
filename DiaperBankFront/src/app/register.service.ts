import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  pass(first, last, address, city, state, zip, county, phone, child){
    console.log('Service: ' + {first, last, address, city, state, zip, county, phone, child})
    console.log('Trial: ' + child + ' ' + child.length)
  
    var jsonObj = {first, last, address, city, state, zip, county, phone}
    var childnum = 1;
    var childComp = 1;
    var childInfo ='';

    child.forEach(element => {
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
    });
    console.log('jsonobj: ' + JSON.stringify(jsonObj))



    return this.http.post('http://localhost:3000/addpatron', jsonObj)
    .subscribe(
      

    )
  }
 

}
