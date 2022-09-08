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

  selectedQuery:string = "";

  queries: any[] = [
    {
      query: "create_database",
      description: "Create Database"
    },
    {
      query: "create_table",
      description: "Create Table"
    },
    {
      query: "delete_all_from_database",
      description: "Delete All From Database"
    },
    {
      query: "delete_all_from_table",
      description: "Delete All From Table"
    },
    {
      query: "delete_database",
      description: "Delete Database"
    },
    {
      query: "delete_row_from_table",
      description: "Delete Row From Table"
    },
    {
      query: "get_all_from_database",
      description: "Get All From Database"
    },
    {
      query: "get_all_from_table",
      description: "Get All From Table"
    },
    {
      query: "get_value",
      description: "Get Value"
    },
    {
      query: "insert_into_table",
      description: "Insert Into Table"
    },
    {
      query: "join_tables",
      description: "Join Tables"
    }
  ]


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

  getDatabaseNames(): string[] {
    return this.databases.map(d => d.name);
  }

  showDB(database: any): void {
    this.database = this.databaseService.getDatabase(database);
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

  dummyArray(obj:any) {
    return [0];
  }

  createEmptyTable() : void {
    this.newTable = {
      name: "",
      rows: [],
      columns: [this.newColumn]
    }
  }
}
