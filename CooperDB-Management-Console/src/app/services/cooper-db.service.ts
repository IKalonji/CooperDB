import { Injectable } from '@angular/core';
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

  addDatabase(name:string){
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

  createUpdateTable(db_name: string, table: Table): void {
    let db = this.databases.find(d => d.name == db_name);
    if(db){
      let index = db.tables.findIndex(t => t.name == table.name);
      if(index > -1) {
        db.tables[index] = table;
      } else {
        db.tables.push(table);
      }
    }
  }

  removeTable(db_name:string, tbl_name: string): void {
    let db = this.databases.find(d => d.name == db_name);
    if(db) {
      let index = db.tables.findIndex(t => t.name == tbl_name);
      if(index > -1) {
        db.tables.splice(index, 1);
      }
    }
  }
}
