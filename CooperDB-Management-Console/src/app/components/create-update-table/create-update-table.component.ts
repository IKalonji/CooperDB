import { Component, Input, OnInit } from '@angular/core';
import { Column, Database, Table } from 'src/app/models/Database';
import { CooperDbService } from 'src/app/services/cooper-db.service';

@Component({
  selector: 'app-create-update-table',
  templateUrl: './create-update-table.component.html',
  styleUrls: ['./create-update-table.component.css']
})
export class CreateUpdateTableComponent implements OnInit {

  @Input() heading: string = "Create New Table"
  @Input() database!: Database;
  @Input() table!: Table;
  @Input() tableNames!: string[];

  isNew: boolean = false;

  types: string[] = [
    "String", "Integer", "Boolean"
  ];

  constructor(private dbService: CooperDbService) { }

  ngOnInit(): void {
    if(!this.table) {
      this.isNew = true;
      this.createEmptyTable();
    }
  }

  getColumnNames(tableName: string): string[] {
    let tbl = this.database.tables.find((t:Table) => t.name == tableName);
    if(tableName && tbl)
      return tbl.columns.map((c:Column) => c.name);
    return [];
  }

  createEmptyColumn(): void {
    this.table.columns.push({
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
    let index = this.table.columns.findIndex(c => c.name == name);
    this.table.columns.splice(index, 1);
  }

  createEmptyTable() : void {
    this.table = {
      name: "",
      rows: [],
      columns: []
    }
    this.createEmptyColumn();
  }

  createUpdateTable() : void {
    this.dbService.createUpdateTable(this.database.name, this.table);
  }

  removeTable(tableName:string): void {
    this.dbService.removeTable(this.database.name, tableName);
  }

}
