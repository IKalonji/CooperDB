import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsor-card',
  templateUrl: './sponsor-card.component.html',
  styleUrls: ['./sponsor-card.component.css']
})
export class SponsorCardComponent implements OnInit {
  @Input() name: string = "";
  @Input() logo: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
