import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Column, Database, Table } from 'src/app/models/Database';
import { CooperDbService } from 'src/app/services/cooper-db.service';

@Component({
  selector: 'app-data-manipulation-query',
  templateUrl: './data-manipulation-query.component.html',
  styleUrls: ['./data-manipulation-query.component.css']
})
export class DataManipulationQueryComponent implements OnInit {

  
  @Input() query: string = "";

  @Input() database!: Database;

  @Input() databaseNames: string[] = [];

  @Input() tableNames: string[] = [];

  types: string[] = [
    "String", "Integer", "Boolean"
  ];

  createDatabaseData: any = {
    database_name: ""
  }

  deleteDatabaseData: any = {
    database_name: ""
  }

  createTableData: any = {
    databse_name: "",
    table_name: "",
    columns: []
  }

  getValueData: any = {
      database_name: "",
      table_name: "",
      column_name: "",
      column_value: ""
  }

  getAllFromTableData: any = {
    database_name: "",
    table_name: ""
  }

  getAllFromDatabaseData: any = {
    database_name: ""
  }

  insertIntoTableData: any = {
    database_name: "",
    table_name: "",
    data: {}
  }

  deleteAllFromDatabaseData: any = {
    database_name: ""
  }

  deleteAllFromTableData: any = {
    database_name: "",
    table_name: ""
  }

  deleteRowFromTableData: any = {
    database_name: "",
    table_name: "",
    data: {},
    column_name: "",
    column_value: ""
  }

  joinTablesData: any = {
    database_name: "",
    table_name: "",
    join_table_name: "",
    join_column_name: "",
    join_type: ""
  }

  joinTypes: {[key: string]: string}[] = [
    {
      type: "innner",
      description: "Inner Join"
    },
    {
      type: "left",
      description: "Left Join"
    },
    {
      type: "outer",
      description: "Outer Join"
    },
    {
      type: "right",
      description: "Right Join"
    }
  ]

  createResults: any = {};

  getValueResults: {[key: string]: any}[] = [];
  getValueCols: string[] = [];

  getTablesResults: any[] = [];
  getTablesCols: string[][] = [];

  insertIntoTableResults: {[key: string]: any} = {};

  deleteResults: any = {}

  constructor(private dbService: CooperDbService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.database) {
      if(this.tableNames.length == 0) {
        this.tableNames = this.database.tables.map((t:Table) => t.name);
      }
    
      this.getValueData.database_name = this.database.name;
      this.getAllFromTableData.database_name = this.database.name;
      this.insertIntoTableData.database_name = this.database.name;
      this.deleteAllFromDatabaseData.database_name = this.database.name;
      this.deleteAllFromTableData.database_name = this.database.name;
      this.deleteRowFromTableData.database_name = this.database.name;
      this.joinTablesData.database_name = this.database.name;
      this.createTableData.database_name = this.database.name;
    }
  }

  getKeys(obj: any) : string[] {
    return Object.keys(obj);
  }

  createEmptyColumn(): void {
    this.createTableData.columns.push({
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
    });
  }

  removeColumn(name: string): void {
    let index = this.createTableData.columns.findIndex((c:any) => c.name == name);
    this.createTableData.columns.splice(index, 1);
  }

  setInsertColumn(table_name: string) {
    this.clearResults();
    let table = this.database.tables.find(t => t.name == table_name);
    if(table) {
      table.columns.forEach(c => this.insertIntoTableData.data[c.name] = "");
    }
  }

  getTableNamesExcept(tableName: string) : string[] {
    return this.tableNames.filter(t => t != tableName);
  }

  getColumnNames(table_name: string): string[] {
    let tables = this.database.tables.find((t:Table) => t.name == table_name);
    return tables ?  tables.columns.map((c:Column) => c.name) : [];
  }

  createDatabase() {
    this.createResults = this.dbService.execute(this.query, this.createDatabaseData);
  }

  deleteDatabase() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '440px',
      data: {
        header: "Delete Database",
        body: "Delete Database will remove your database and the data permanantly. Are you sure you want to continue?"
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteResults = this.dbService.execute(this.query, this.deleteDatabaseData);
      }
    });
  }

  createTable() {
    this.createTableData.database_name = this.database.name;
    this.createResults = this.dbService.execute(this.query, this.createTableData);

    if(this.database.tables.length == 1 && this.database.tables[0].name == "") {
      this.database.tables.slice(0, 1);
    }
  }

  getValue() {
    this.clearResults();
    this.getValueResults = this.dbService.execute(this.query, this.getValueData);
    
    if(this.getValueResults.length > 0) {
      this.getValueCols = Object.keys(this.getValueResults[0]);
    }
  }

  getAllFromTable() {
    this.clearResults();
    this.getValueResults = this.dbService.execute(this.query, this.getAllFromTableData);

    if(this.getValueResults.length > 0) {
      this.getValueCols = Object.keys(this.getValueResults[0]);
    }
  }

  getAllFromDatabase() {
    this.clearResults();
    this.getTablesResults = this.dbService.execute(this.query, this.getAllFromTableData);

    if(this.getTablesResults.length > 0) {
      this.getTablesResults.forEach(t => {
        if(t.rows.length > 0) {
          this.getTablesCols.push(Object.keys(t.rows[0]));
        }
      });
    }
  }

  insertIntoTable() {
    this.insertIntoTableResults = this.dbService.execute(this.query, this.insertIntoTableData);
  }

  clearResults() {
    this.getValueResults = [];
    this.getTablesResults = [];
    this.insertIntoTableData.data = {};
    this.deleteResults = {};
  }

  deleteAllFromDatabase() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '440px',
      data: {
        header: "Delete All From Database",
        body: "Delete All From Database will remove your data permanantly. Are you sure you want to continue?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteResults = this.dbService.execute(this.query, this.deleteAllFromDatabaseData);
      }
    });
  }

  deleteAllFromTable() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '440px',
      data: {
        header: "Delete All From Table",
        body: "Delete All From Table will remove your data permanantly. Are you sure you want to continue?"
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteResults = this.dbService.execute(this.query, this.deleteAllFromTableData);
      }
    });
  }

  deleteRowFromTable() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '440px',
      data: {
        header: "Delete Row From Table",
        body: "Delete Row From Table will remove your data permanantly. Are you sure you want to continue?"
      }
    });
    
    this.deleteRowFromTableData.data = {};
    this.deleteRowFromTableData.data[this.deleteRowFromTableData.column_name] = this.deleteRowFromTableData.column_value;
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteResults = this.dbService.execute(this.query, this.deleteRowFromTableData);
      }
    });
  }

  joinTables() {
    this.clearResults();
    this.getValueResults = this.dbService.execute(this.query, this.joinTablesData);

    if(this.getValueResults.length > 0) {
      this.getValueCols = Object.keys(this.getValueResults[0]);
    }
  }

}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./data-manipulation-query.component.css']
})
export class ConfirmDialog {
  isConfirmed = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onConfirm() {
    this.isConfirmed = true;
    this.dialogRef.close(this.isConfirmed);
    this.isConfirmed = false;
  }

  onCancel() {
    this.isConfirmed = false;
    this.dialogRef.close(this.isConfirmed);
  }
}