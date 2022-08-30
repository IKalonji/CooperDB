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

  @ViewChild(ConsoleViewDirective, {static: true}) appConsoleView !: ConsoleViewDirective;

  constructor(private router: Router,
    private componentFactory: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  myDB(){
    this.loadComponent(DatabasesComponent)
  }

  manageDB(){
    this.loadComponent(ManageDatabasesComponent)
  }

  manageSubscription(){
    this.loadComponent(ManageSubscriptionComponent)
  }

  loadComponent(component:any){

    this.appConsoleView.viewContainerRef.createComponent(component)

  }

}
