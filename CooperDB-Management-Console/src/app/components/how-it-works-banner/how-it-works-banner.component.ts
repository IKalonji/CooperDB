import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works-banner',
  templateUrl: './how-it-works-banner.component.html',
  styleUrls: ['./how-it-works-banner.component.css']
})
export class HowItWorksBannerComponent implements OnInit {

  diagram = "../../assets/diagram.png"

  constructor() {}

  ngOnInit(): void {}

  

}
