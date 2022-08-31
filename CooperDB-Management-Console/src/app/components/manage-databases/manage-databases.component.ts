import { Component, OnInit } from '@angular/core';
import { CooperDbService } from 'src/app/services/cooper-db.service';

@Component({
  selector: 'app-manage-databases',
  templateUrl: './manage-databases.component.html',
  styleUrls: ['./manage-databases.component.css']
})
export class ManageDatabasesComponent implements OnInit {

  selected:string = ""

  databases: string[] = []

  displayDB: any;

  constructor(private databaseService: CooperDbService) { }

  ngOnInit(): void {
    this.databases = this.databaseService.getDatabases()
  }

  showDB(){
    this.displayDB = this.databaseService.getDatabase(this.selected)
  }

}
