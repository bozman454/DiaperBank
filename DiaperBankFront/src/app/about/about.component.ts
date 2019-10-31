import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
