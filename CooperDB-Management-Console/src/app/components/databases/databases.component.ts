import { Component, OnInit } from '@angular/core';
import { CooperDbService } from 'src/app/services/cooper-db.service';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})
export class DatabasesComponent implements OnInit {

  databases: string[] = [];

  newDB: string = "";

  constructor(private databaseService:CooperDbService) { }

  ngOnInit(): void {
  }

  getDBs(){
    this.databases = this.databaseService.getDatabases()
  }

  addDBs(){
    if (this.newDB) this.databaseService.addDatabase(this.newDB);
    this.getDBs()
  }

}
