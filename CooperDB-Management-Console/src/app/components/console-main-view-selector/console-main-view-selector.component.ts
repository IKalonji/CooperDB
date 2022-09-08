import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-console-main-view-selector',
  templateUrl: './console-main-view-selector.component.html',
  styleUrls: ['./console-main-view-selector.component.css']
})
export class ConsoleMainViewSelectorComponent implements OnInit {

  @Input() component: string = "mydb";

  constructor() { }

  ngOnInit(): void {
    console.log(this.component)
  }

  /*
  notes:
  Look into slots
  
  */

}
