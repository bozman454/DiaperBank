import { Component, OnInit, Injectable } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';
import {MatButton } from '@angular/material/button';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AboutComponent implements OnInit {
  showit = false;
  constructor() { }

  ngOnInit() {

  }
  show(){
    this.showit = !this.showit;

    // if(this.showit)
    // this.showit = false;
    // else
    // this.showit = true;
  }
  // redirect(){
  //   if(confirm("Do you wish to leave DiaperBank?")){
      
  //   }

}
