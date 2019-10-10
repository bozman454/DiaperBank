import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  pass(first, last, address, city, state, zip, county, phone){
    console.log('Service: ' + {first, last, address, city, state, zip, county, phone})
    return this.http.post('http://localhost:3000/addpatron', {first, last, address, city, state, zip, county, phone})
    .subscribe(
      

    )
  }
 

}
