import { Component, OnInit } from '@angular/core';
import { CooperDbService } from 'src/app/services/cooper-db.service';

import { Database, Table, Column } from 'src/app/models/Database';

@Component({
  selector: 'app-manage-databases',
  templateUrl: './manage-databases.component.html',
  styleUrls: ['./manage-databases.component.css']
})
export class ManageDatabasesComponent implements OnInit {

  selected:string = "";

  databases: Database[] = [];

  database: any;

  newColumn: any; 

  newTable: any;

  types: string[] = [
    "String", "Integer", "Boolean"
  ];

  tableNames: string[] = [];

  constructor(private databaseService: CooperDbService) { }

  ngOnInit(): void {
    this.databases = this.databaseService.getDatabases();
    this.createEmptyColumn();
    this.createEmptyTable();
  }

  showDB(database: any){
    this.database = this.databaseService.getDatabase(database)
    console.log(this.database);
    this.tableNames = this.database.tables.map((t:Table) => t.name);
  }

  getColumnNames(tableName: string): string[] {
    return !tableName ? null : this.database.tables.find((t:Table) => t.name == tableName).columns.map((c:Column) => c.name);
  }

  createEmptyColumn(): void {
    this.newColumn = {
      name: "",
      type: "",
      attributes: {
        primary_key: false,
        unique: false,
        foreign_key: {
          table: "",
          column: ""
        }
      }
    }
  }

  createEmptyTable() : void {
    this.newTable = {
      name: "",
      rows: [],
      columns: [this.newColumn]
    }
  }

}
