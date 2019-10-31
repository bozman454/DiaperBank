import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
@Injectable({
  providedIn: 'root',
})

export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
