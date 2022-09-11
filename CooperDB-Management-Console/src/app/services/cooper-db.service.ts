import { Injectable } from '@angular/core';
import { appendFile } from 'fs';
import { Database, Table } from '../models/Database';

import { DBExamples } from './DBExamples';

@Injectable({
  providedIn: 'root'
})
export class CooperDbService {

  private databases: Database[] = new DBExamples().databases;

  constructor() { }

  getDatabases(){
    return this.databases;
  }

  addDatabase(name:string) {
    let database: Database = {
      name: name,
      tables: []
    };

    this.databases.push(database);
  }
  

  getDatabase(name:string) {
    let database = this.databases.find(e => e.name == name);
    return database ? database : null;
  }

  // For Demostration To Be Removed
  createDatabase(query:string, input: any) : any {
    this.addDatabase(input.database_name);
    return { status: "success", message: `Database ${input.database_name} created successfully... `};
  }

  // For Demostration To Be Removed
  deleteDatabase(query:string, input: any) : any {
    let index = this.databases.findIndex(d => d.name == input.database_name);
    if(index > -1){
      this.databases.splice(index, 1);
    }
    return { status: "success", message: `Database ${input.database_name} deleted successfully... `};
  }

  // For Demostration To Be Removed
  createTable(query: string, input: any): any {
    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table: Table = {
        name: input.table_name,
        columns: input.columns,
        rows: []
      };
      db.tables.push(table);
    }
    return { status: "success", message: `Table ${input.table_name} created successfully... `};
  }

  // For Demostration To Be Removed
  updateTable(query: string, input: any): any {
    return {};
  }

  // For Demostration To Be Removed
  getValue(query: string, input: any): any {
    let results: any = [];
    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.find(t => t.name == input.table_name);
      if(table) {
        table.rows.forEach(row => {
          if(Object.keys(row).includes(input.column_name) && row[input.column_name] == input.column_value) {
            results.push(row);
          }
        });
      }
    }

    return results;
  }

  // For Demostration To Be Removed
  getAllFromTable(query: string, input: any): any {
    let results: any = [];
    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.find(t => t.name == input.table_name);
      if(table) {
        table.rows.forEach(row => results.push(row));
      }
    }

    return results;
  }

  // For Demostration To Be Removed
  getAllFromDatabase(query: string, input: any): any {
    let results: any = [];
    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.forEach(t => {
        results.push({
          table: t.name,
          rows: t.rows
        });
      });
    }

    return results;
  }

  // For Demostration To Be Removed
  insertIntoTable(query: string, input: any): any {
    console.log(input);
    let results: any = {}
    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.find(t => t.name == input.table_name);
      if(table) {
        table.rows.push(input.data);
        results = input.data;
      }
    }
    return results;
  }

  // For Demostration To Be Removed
  deleteAllFromDatabase(query: string, input: any): any {
    let results = {
      status: "error",
      message: "An error occurred!!!"
    };

    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let rowCount = 0;
      let tableCount = db.tables.length;
      db.tables.forEach(t => {
        rowCount += t.rows.length;
        t.rows = [];
      });
      results = {
        status: "success",
        message: `${rowCount} rows from ${tableCount} tables have been deleted successfully...`
      };
    }
    return results;
  }

  // For Demostration To Be Removed
  deleteAllFromTable(query: string, input: any): any {
    let results = {
      status: "error",
      message: "An error occurred!!!"
    };

    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.find(t => t.name == input.table_name);
      if(table) {
        let count = table.rows.length;
        table.rows = [];
        results = {
          status: "success",
          message: `${count} rows have been deleted successfully...`
        }
      }
    }
    return results;
  }

  // For Demostration To Be Removed
  deleteRowFromTable(query: string, input: any): any {
    let results = {
      status: "error",
      message: "An error occurred!!!"
    }

    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.find(t => t.name == input.table_name);
      let key = Object.keys(input.data)[0];
      
      if(table) {
        let rowIndex = table.rows.findIndex(r => r[key] == input.data[key]);
        if(rowIndex > -1) {
          table.rows.splice(rowIndex, 1);
          results = {
            status: "success",
            message: "Row has been deleted successfully..."
          }
        }
      }
    }
    return results;
  }

  // For Demostration To Be Removed
  joinTables(query: string, input: any): any {
    let results: any = [];
    let db = this.databases.find(d => d.name == input.database_name);
    if(db) {
      let table = db.tables.find(t => t.name == input.table_name);
      if(table) {
        table.rows.forEach(row => results.push(row));
      }
    }

    return results;
  }

  execute(query: string, input: any): any {
    let results: any;
    // To Be Replaced With API Call
    switch(query) {
      case "create_database":
        results = this.createDatabase(query, input);
        break;
      case "create_table":
        results = this.createTable(query, input);
        break;
      case "insert_into_table":
        results = this.insertIntoTable(query, input);
        break;
      case "delete_database":
        results = this.deleteDatabase(query, input);
        break;
      case "delete_all_from_table":
        results = this.deleteAllFromTable(query, input);
        break;
      case "delete_row_from_table":
        results = this.deleteRowFromTable(query, input);
        break;
      case "delete_all_from_database":
        results = this.deleteAllFromDatabase(query, input);
        break;
      case "update_table":
        results = this.updateTable(query, input);
        break;
      case "get_value":
        results = this.getValue(query, input);
        break;
      case "get_all_from_table":
        results = this.getAllFromTable(query, input);
        break;
      case "get_all_from_database":
        results = this.getAllFromDatabase(query, input);
        break;
      case "join_tables":
        results = this.joinTables(query, input);
        break;
    }
    return results;
  }
}
