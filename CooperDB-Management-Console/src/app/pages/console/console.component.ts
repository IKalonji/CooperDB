import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatabasesComponent } from 'src/app/components/databases/databases.component';
import { ManageDatabasesComponent } from 'src/app/components/manage-databases/manage-databases.component';
import { ManageSubscriptionComponent } from 'src/app/components/manage-subscription/manage-subscription.component';
import { ConsoleViewDirective } from 'src/app/directives/console-view.directive';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {

  selectorComponent: string = "managedb"

  constructor() { }

  ngOnInit(): void {
  }

  myDB(){
    this.selectorComponent = "mydb"
  }

  manageDB(){
    this.selectorComponent = "managedb"
  }

  manageSubscription(){
    this.selectorComponent = "managesubscription"
  }

}
