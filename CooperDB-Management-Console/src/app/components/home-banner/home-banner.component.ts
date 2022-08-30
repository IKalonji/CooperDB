import { Component, OnInit } from '@angular/core';
import { Sponsors } from 'src/app/models/sponsor';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  sponsors = Sponsors;


  constructor() { }

  ngOnInit(): void {
  }

}
